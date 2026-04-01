import { useState } from 'react'
import { Table, Select, Tag, Button, DatePicker, Space, Modal, Descriptions, Typography } from 'antd'
import { settlements, orgs } from '../../mock/data'

const { Title } = Typography
const statusColor = { '待确认': 'orange', '已确认': 'blue', '已打款': 'green' }

export default function PlatSettlementLog() {
  const [orgFilter, setOrgFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [detail, setDetail] = useState(null)

  let filtered = [...settlements]
  if (orgFilter) filtered = filtered.filter(s => s.orgId === orgFilter)
  if (statusFilter) filtered = filtered.filter(s => s.status === statusFilter)

  const columns = [
    { title: '月份', dataIndex: 'month' },
    { title: '机构', dataIndex: 'org' },
    { title: '订单金额', dataIndex: 'orderAmount', render: v => `¥${v.toLocaleString()}` },
    { title: '平台抽成', dataIndex: 'commission', render: v => `¥${v.toLocaleString()}` },
    { title: '机构实收', dataIndex: 'orgIncome', render: v => `¥${v.toLocaleString()}` },
    { title: '状态', dataIndex: 'status', render: s => <Tag color={statusColor[s]}>{s}</Tag> },
    { title: '打款时间', dataIndex: 'payTime', render: v => v || '-' },
    { title: '操作', render: (_, r) => r.status === '已打款' && (
      <Button type="link" onClick={() => setDetail(r)}>查看凭证</Button>
    )},
  ]

  return (
    <div>
      <Title level={4}>结算记录</Title>
      <Space style={{ marginBottom: 16 }} wrap>
        <Select allowClear placeholder="全部机构" style={{ width: 180 }} onChange={setOrgFilter}
          options={orgs.filter(o => o.status === '正常').map(o => ({ value: o.id, label: o.name }))} />
        <Select allowClear placeholder="全部状态" style={{ width: 120 }} onChange={setStatusFilter}
          options={['待确认','已确认','已打款'].map(s => ({ value: s, label: s }))} />
        <DatePicker.RangePicker picker="month" />
      </Space>
      <Table dataSource={filtered} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: t => `共${t}条` }} />

      <Modal title="打款凭证" open={!!detail} onCancel={() => setDetail(null)} footer={null}>
        {detail && (
          <Descriptions column={1}>
            <Descriptions.Item label="机构">{detail.org}</Descriptions.Item>
            <Descriptions.Item label="结算月份">{detail.month}</Descriptions.Item>
            <Descriptions.Item label="打款金额">¥{detail.payAmount?.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="打款时间">{detail.payTime}</Descriptions.Item>
            <Descriptions.Item label="打款凭证">
              <div style={{ width: 200, height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9' }}>凭证图片（示例）</div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}
