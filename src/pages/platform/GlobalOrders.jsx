import { useState } from 'react'
import { Table, Select, Button, Tag, DatePicker, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { orders, orgs } from '../../mock/data'

const { Title } = Typography
const statusColor = { '待支付': 'orange', '服务中': 'blue', '已完成': 'green', '退款中': 'red', '已退款': 'default' }

export default function PlatGlobalOrders() {
  const nav = useNavigate()
  const [orgFilter, setOrgFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [typeFilter, setTypeFilter] = useState(null)

  let filtered = [...orders]
  if (orgFilter) filtered = filtered.filter(o => o.orgId === orgFilter)
  if (statusFilter) filtered = filtered.filter(o => o.status === statusFilter)

  const columns = [
    { title: '订单号', dataIndex: 'id' },
    { title: '机构', dataIndex: 'org' },
    { title: '家长', dataIndex: 'parent' },
    { title: '产品', dataIndex: 'product' },
    { title: '金额', dataIndex: 'amount', render: v => `¥${v}` },
    { title: '老师', dataIndex: 'teacher' },
    { title: '状态', dataIndex: 'status', render: s => <Tag color={statusColor[s]}>{s}</Tag> },
    { title: '创建时间', dataIndex: 'date' },
    { title: '操作', render: (_, r) => (
      <Space>
        <Button type="link" onClick={() => nav(`/global-orders/${r.id}`)}>详情</Button>
        {r.status === '退款中' && <Button type="link" danger onClick={() => nav(`/global-orders/${r.id}`)}>介入</Button>}
      </Space>
    )},
  ]

  return (
    <div>
      <Title level={4}>订单监管</Title>
      <Space style={{ marginBottom: 16 }} wrap>
        <Select allowClear placeholder="全部机构" style={{ width: 180 }} onChange={setOrgFilter}
          options={orgs.filter(o => o.status === '正常').map(o => ({ value: o.id, label: o.name }))} />
        <Select allowClear placeholder="全部状态" style={{ width: 120 }} onChange={setStatusFilter}
          options={['待支付','服务中','已完成','退款中','已退款'].map(s => ({ value: s, label: s }))} />
        <Select allowClear placeholder="全部服务类型" style={{ width: 140 }} onChange={setTypeFilter}
          options={['影子老师','入户干预','密集干预','远程督导'].map(s => ({ value: s, label: s }))} />
        <DatePicker.RangePicker />
      </Space>
      <Table dataSource={filtered} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: t => `共${t}条` }} />
    </div>
  )
}
