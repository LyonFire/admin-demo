import { useState } from 'react'
import { Card, Table, Tag, Button, Space, Modal, InputNumber, DatePicker, Input, Upload, Statistic, Row, Col, message } from 'antd'
import { UploadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { settlements } from '../../mock/data'

const statusColor = { '待确认': 'orange', '已确认': 'blue', '已打款': 'green' }

export default function PlatSettlement() {
  const [month, setMonth] = useState('2026-03')
  const [payOpen, setPayOpen] = useState(null)
  const filtered = settlements.filter(s => s.month === month)

  const totalOrder = filtered.reduce((s, r) => s + r.orderAmount, 0)
  const totalRefund = filtered.reduce((s, r) => s + r.refund, 0)
  const totalCommission = filtered.reduce((s, r) => s + r.commission, 0)
  const totalIncome = filtered.reduce((s, r) => s + r.orgIncome, 0)

  const handleConfirm = (r) => {
    Modal.confirm({ title: '确认结算', content: `确认「${r.org}」${r.month}结算数据无误？`, onOk: () => message.success('已确认') })
  }

  const columns = [
    { title: '机构', dataIndex: 'org' },
    { title: '订单金额', dataIndex: 'orderAmount', render: v => `¥${v.toLocaleString()}` },
    { title: '退款扣减', dataIndex: 'refund', render: v => `¥${v.toLocaleString()}` },
    { title: '平台抽成', dataIndex: 'commission', render: v => `¥${v.toLocaleString()}` },
    { title: '机构实收', dataIndex: 'orgIncome', render: v => `¥${v.toLocaleString()}` },
    { title: '已完成服务', dataIndex: 'services', render: v => `${v}次` },
    { title: '状态', dataIndex: 'status', render: s => <Tag color={statusColor[s]}>{s}</Tag> },
    { title: '操作', render: (_, r) => (
      <Space>
        {r.status === '待确认' && <Button type="link" onClick={() => handleConfirm(r)}>确认</Button>}
        {r.status === '已确认' && <Button type="link" onClick={() => setPayOpen(r)}>打款</Button>}
        <Button type="link">明细</Button>
      </Space>
    )},
  ]

  const switchMonth = (dir) => {
    const [y, m] = month.split('-').map(Number)
    const d = new Date(y, m - 1 + dir)
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Button icon={<LeftOutlined />} onClick={() => switchMonth(-1)} />
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>机构结算 · {month.replace('-', '年')}月</span>
          <Button icon={<RightOutlined />} onClick={() => switchMonth(1)} />
        </Space>
        <Table dataSource={filtered} columns={columns} rowKey="id" pagination={false} />
      </Card>

      <Card title="本月合计">
        <Row gutter={16}>
          <Col span={6}><Statistic title="订单总额" value={totalOrder} prefix="¥" /></Col>
          <Col span={6}><Statistic title="退款扣减" value={totalRefund} prefix="¥" /></Col>
          <Col span={6}><Statistic title="平台抽成" value={totalCommission} prefix="¥" /></Col>
          <Col span={6}><Statistic title="机构实收" value={totalIncome} prefix="¥" /></Col>
        </Row>
      </Card>

      <Modal title={`确认打款 · ${payOpen?.org}`} open={!!payOpen} onCancel={() => setPayOpen(null)}
        onOk={() => { message.success('已标记为已打款'); setPayOpen(null) }} okText="确认已打款" width={480}>
        {payOpen && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>结算月份：{payOpen.month}</div>
            <div>机构实收：¥{payOpen.orgIncome.toLocaleString()}</div>
            <div>打款金额 *<InputNumber style={{ width: '100%', marginTop: 4 }} defaultValue={payOpen.orgIncome} prefix="¥" /></div>
            <div>打款时间 *<DatePicker style={{ width: '100%', marginTop: 4 }} /></div>
            <div>打款凭证<Upload><Button icon={<UploadOutlined />} style={{ marginTop: 4 }}>上传图片</Button></Upload></div>
            <div>备注<Input.TextArea rows={2} style={{ marginTop: 4 }} /></div>
          </Space>
        )}
      </Modal>
    </div>
  )
}
