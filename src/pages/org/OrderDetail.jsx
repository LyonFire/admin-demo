import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Table, Button, Typography, Space, Modal, Select, Alert, message } from 'antd'
import { SwapOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { orders, teachers } from '../../mock/data'

const { Title, Text } = Typography

const statusColorMap = {
  '服务中': 'green',
  '待支付': 'orange',
  '退款中': 'red',
  '已完成': 'default',
  '已支付': 'blue',
}

const scheduleStatusMap = {
  '已完成': 'green',
  '服务中': 'blue',
  '待开始': 'default',
}

export default function OrderDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const order = orders.find(o => o.id === id)
  const [changeTeacherOpen, setChangeTeacherOpen] = useState(false)

  if (!order) return <div>订单不存在</div>

  const scheduleColumns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '老师', dataIndex: 'teacher', key: 'teacher' },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: s => <Tag color={scheduleStatusMap[s]}>{s}</Tag>,
    },
    {
      title: '操作', key: 'action',
      render: (_, record) => record.status === '待开始' ? (
        <Space>
          <Button type="link" size="small" icon={<SwapOutlined />}>换</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删</Button>
        </Space>
      ) : null,
    },
  ]

  return (
    <div>
      <Title level={4}>订单详情 · {order.id}</Title>

      <Card style={{ marginBottom: 16 }}>
        <Tag color={statusColorMap[order.status]} style={{ fontSize: 14, padding: '4px 12px' }}>
          {order.status}
        </Tag>
      </Card>

      <Card title="基本信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="家长">{order.parent}</Descriptions.Item>
          <Descriptions.Item label="孩子">{order.child}</Descriptions.Item>
          <Descriptions.Item label="产品">{order.product}</Descriptions.Item>
          <Descriptions.Item label="老师">
            <Space>
              {order.teacher}
              {(order.status === '服务中' || order.status === '待服务') && (
                <Button type="link" size="small" onClick={() => setChangeTeacherOpen(true)}>
                  更换老师
                </Button>
              )}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="费用信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="原价">¥{order.amount}</Descriptions.Item>
          <Descriptions.Item label="优惠">¥{order.discount}</Descriptions.Item>
          <Descriptions.Item label="应付">¥{order.paid}</Descriptions.Item>
          <Descriptions.Item label="支付方式">{order.payMethod || '-'}</Descriptions.Item>
          <Descriptions.Item label="支付时间">{order.payTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="平台抽成">¥{order.commission || 0}</Descriptions.Item>
          <Descriptions.Item label="机构实收">¥{order.paid - (order.commission || 0)}</Descriptions.Item>
        </Descriptions>
      </Card>

      {order.schedules && order.schedules.length > 0 && (
        <Card
          title="服务日程"
          style={{ marginBottom: 16 }}
          extra={<Button type="dashed" size="small" icon={<PlusOutlined />}>添加日程</Button>}
        >
          <Table
            columns={scheduleColumns}
            dataSource={order.schedules.map((s, i) => ({ ...s, key: i }))}
            pagination={false}
            size="small"
          />
        </Card>
      )}

      {order.status === '退款中' && order.refund && (
        <Card style={{ marginBottom: 16 }}>
          <Alert
            type="warning"
            showIcon
            message="家长申请退款"
            description={
              <div>
                <p>原因：{order.refund.reason}</p>
                <p>说明：{order.refund.desc}</p>
                <p>退款金额：¥{order.refund.amount}</p>
                <Space style={{ marginTop: 8 }}>
                  <Button type="primary" onClick={() => Modal.confirm({ title: '同意退款', content: `确认退款 ¥${order.refund.amount} 给家长？`, onOk: () => { message.success('已同意退款，已发送退款结果卡片'); nav('/orders') } })}>同意退款</Button>
                  <Button danger onClick={() => Modal.confirm({ title: '拒绝退款', content: '确认拒绝此退款申请？', onOk: () => { message.success('已拒绝退款，已发送退款结果卡片'); nav('/orders') } })}>拒绝退款</Button>
                </Space>
              </div>
            }
          />
        </Card>
      )}

      {order.status === '待支付' && (
        <Card>
          <Space>
            <Button danger onClick={() => Modal.confirm({ title: '取消订单', content: '确认取消此订单？', onOk: () => { message.success('已取消'); nav('/orders') } })}>取消订单</Button>
            <Button danger type="primary" onClick={() => Modal.confirm({ title: '取消订单并退款', content: '确认取消订单并退款给家长？', onOk: () => { message.success('已取消并退款'); nav('/orders') } })}>取消订单并退款</Button>
          </Space>
        </Card>
      )}

      <Modal
        title="更换老师"
        open={changeTeacherOpen}
        onCancel={() => setChangeTeacherOpen(false)}
        onOk={() => setChangeTeacherOpen(false)}
        okText="确认更换"
        cancelText="取消"
      >
        <Select
          showSearch
          placeholder="选择新老师"
          optionFilterProp="label"
          style={{ width: '100%' }}
          options={teachers.map(t => ({ value: t.id, label: `${t.name} - ${t.skill}` }))}
        />
      </Modal>
    </div>
  )
}
