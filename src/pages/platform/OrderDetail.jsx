import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Table, Button, InputNumber, Input, Space, Modal, message, Alert } from 'antd'
import { orders } from '../../mock/data'

export default function PlatOrderDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const order = orders.find(o => o.id === id)
  const [refundAmount, setRefundAmount] = useState(order?.refund?.amount || 0)
  const [ruling, setRuling] = useState('')
  const [chatOpen, setChatOpen] = useState(false)

  if (!order) return <div>订单不存在</div>

  const isRefund = order.status === '退款中'

  const handleApproveRefund = () => {
    Modal.confirm({ title: '同意退款', content: `确认退款 ¥${refundAmount} 给家长？`, onOk: () => { message.success('已退款，已发送平台裁决卡片'); nav('/global-orders') } })
  }
  const handleReject = () => {
    Modal.confirm({ title: '驳回退款', content: '确认驳回此退款申请？', onOk: () => { message.success('已驳回，已发送平台裁决卡片'); nav('/global-orders') } })
  }

  const scheduleColumns = [
    { title: '日期', dataIndex: 'date' },
    { title: '时间', dataIndex: 'time' },
    { title: '老师', dataIndex: 'teacher' },
    { title: '状态', dataIndex: 'status', render: s => <Tag color={s === '已完成' ? 'green' : s === '服务中' ? 'blue' : 'default'}>{s}</Tag> },
  ]

  return (
    <div>
      <Button type="link" onClick={() => nav('/global-orders')} style={{ padding: 0, marginBottom: 16 }}>← 返回订单列表</Button>
      <Card title={`订单详情 · ${order.id}`} style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="机构">{order.org}</Descriptions.Item>
          <Descriptions.Item label="家长">{order.parent}</Descriptions.Item>
          <Descriptions.Item label="孩子">{order.child}</Descriptions.Item>
          <Descriptions.Item label="产品">{order.product}</Descriptions.Item>
          <Descriptions.Item label="老师">{order.teacher}</Descriptions.Item>
          <Descriptions.Item label="状态"><Tag color={isRefund ? 'red' : 'blue'}>{order.status}</Tag></Descriptions.Item>
          <Descriptions.Item label="订单金额">¥{order.amount}</Descriptions.Item>
          <Descriptions.Item label="平台抽成">¥{order.commission || 0}</Descriptions.Item>
        </Descriptions>
      </Card>

      {order.schedules?.length > 0 && (
        <Card title="服务日程" style={{ marginBottom: 16 }}>
          <Table dataSource={order.schedules} columns={scheduleColumns} rowKey="date" pagination={false} size="small" />
        </Card>
      )}

      {isRefund && order.refund && (
        <>
          <Card title="退款信息" style={{ marginBottom: 16 }}>
            <Alert type="warning" showIcon style={{ marginBottom: 16 }}
              message={`家长请求平台介入`}
              description={`退款原因：${order.refund.reason} — ${order.refund.desc}`} />
            <Button onClick={() => setChatOpen(true)}>查看IM聊天记录</Button>
          </Card>

          <Card title="平台裁决">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Space>
                <span>退款金额：</span>
                <InputNumber min={0} max={order.amount} value={refundAmount} onChange={setRefundAmount} prefix="¥" style={{ width: 200 }} />
                <span style={{ color: '#999' }}>（建议按未完成比例）</span>
              </Space>
              <div>
                <div style={{ marginBottom: 8 }}>裁决说明：</div>
                <Input.TextArea rows={3} value={ruling} onChange={e => setRuling(e.target.value)} placeholder="请输入裁决说明" />
              </div>
              <Space>
                <Button type="primary" onClick={handleApproveRefund}>同意退款</Button>
                <Button danger onClick={handleReject}>驳回</Button>
              </Space>
            </Space>
          </Card>
        </>
      )}

      <Modal title="IM聊天记录（只读）" open={chatOpen} onCancel={() => setChatOpen(false)} footer={null} width={500}>
        <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8, minHeight: 200 }}>
          <div style={{ marginBottom: 12 }}><Tag color="blue">家长</Tag> 老师迟到了两次，我想退款</div>
          <div style={{ marginBottom: 12, textAlign: 'right' }}><Tag color="green">机构</Tag> 已完成3次服务，不符合退款条件</div>
          <div style={{ marginBottom: 12 }}><Tag color="blue">家长</Tag> 服务质量有问题，我要请平台介入</div>
        </div>
      </Modal>
    </div>
  )
}
