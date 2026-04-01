import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Table, Button, Typography, Space, List } from 'antd'
import { MessageOutlined, GiftOutlined } from '@ant-design/icons'
import { parents, orders } from '../../mock/data'

const { Title, Text } = Typography

const statusColorMap = {
  '服务中': 'green',
  '待支付': 'orange',
  '退款中': 'red',
  '已完成': 'default',
}

export default function ParentDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const parent = parents.find(p => p.id === Number(id))

  if (!parent) return <div>家长不存在</div>

  const parentOrders = orders.filter(o => o.parentId === parent.id)

  const orderColumns = [
    { title: '订单号', dataIndex: 'id', key: 'id' },
    { title: '产品', dataIndex: 'product', key: 'product' },
    { title: '金额', dataIndex: 'paid', key: 'paid', render: v => `¥${v}` },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: s => <Tag color={statusColorMap[s]}>{s}</Tag>,
    },
    {
      title: '操作', key: 'action',
      render: (_, record) => <a onClick={() => nav(`/orders/${record.id}`)}>详情</a>,
    },
  ]

  return (
    <div>
      <Title level={4}>家长详情 · {parent.name}</Title>

      <Card title="基本信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="姓名">{parent.name}</Descriptions.Item>
          <Descriptions.Item label="电话">{parent.phone}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="孩子档案" style={{ marginBottom: 16 }}>
        <Card size="small" type="inner">
          <Text>👶 {parent.child}</Text>
        </Card>
      </Card>

      <Card
        title="关联订单"
        style={{ marginBottom: 16 }}
        extra={<a onClick={() => nav('/orders')}>查看全部订单</a>}
      >
        <Table
          columns={orderColumns}
          dataSource={parentOrders}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </Card>

      <Card title="抵扣券" style={{ marginBottom: 16 }}>
        {parent.coupons.length > 0 ? (
          <List
            dataSource={parent.coupons}
            renderItem={item => (
              <List.Item>
                <Space>
                  <Text>{item.name}</Text>
                  <Text>¥{item.amount}</Text>
                  <Tag color={item.status === '已使用' ? 'default' : 'green'}>{item.status}</Tag>
                </Space>
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">暂无抵扣券</Text>
        )}
        <Button icon={<GiftOutlined />} style={{ marginTop: 8 }}>发放抵扣券</Button>
      </Card>

      <Card>
        <Button type="primary" icon={<MessageOutlined />} onClick={() => nav('/messages')}>
          进入IM聊天
        </Button>
      </Card>
    </div>
  )
}
