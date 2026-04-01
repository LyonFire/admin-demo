import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Typography, Space, Badge } from 'antd'
import {
  MessageOutlined, AimOutlined, FileTextOutlined,
  WarningOutlined, DollarOutlined
} from '@ant-design/icons'
import { orders } from '../../mock/data'

const { Title } = Typography

const todoItems = [
  { icon: <MessageOutlined />, text: '5条未读消息', path: '/messages', color: '#1890ff' },
  { icon: <AimOutlined />, text: '3个新线索待跟进', path: '/leads', color: '#52c41a' },
  { icon: <FileTextOutlined />, text: '2个订单待支付', path: '/orders', color: '#faad14' },
  { icon: <WarningOutlined />, text: '1个签到异常', path: '/monitor', color: '#ff4d4f' },
  { icon: <DollarOutlined />, text: '1个退款待审核', path: '/orders', color: '#ff4d4f' },
]

const statusColorMap = {
  '服务中': 'green',
  '待支付': 'orange',
  '退款中': 'red',
  '已完成': 'default',
  '异常': 'red',
}

const columns = [
  { title: '订单号', dataIndex: 'id', key: 'id' },
  { title: '家长', dataIndex: 'parent', key: 'parent' },
  { title: '产品', dataIndex: 'product', key: 'product' },
  { title: '老师', dataIndex: 'teacher', key: 'teacher' },
  { title: '金额', dataIndex: 'paid', key: 'paid', render: v => `¥${v}` },
  { title: '状态', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColorMap[s]}>{s}</Tag> },
  { title: '创建时间', dataIndex: 'date', key: 'date' },
]

export default function Dashboard() {
  const nav = useNavigate()

  return (
    <div>
      <Title level={4}>首页</Title>
      <Card title="待办事项" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {todoItems.map((item, i) => (
            <div
              key={i}
              style={{ cursor: 'pointer', padding: '8px 0' }}
              onClick={() => nav(item.path)}
            >
              <Badge color={item.color} text={
                <Space>
                  {item.icon}
                  <span>{item.text}</span>
                </Space>
              } />
            </div>
          ))}
        </Space>
      </Card>
      <Card title="最近订单" extra={<a onClick={() => nav('/orders')}>查看全部</a>}>
        <Table
          columns={columns}
          dataSource={orders.slice(0, 5)}
          rowKey="id"
          pagination={false}
          size="small"
          onRow={record => ({ onClick: () => nav(`/orders/${record.id}`), style: { cursor: 'pointer' } })}
        />
      </Card>
    </div>
  )
}
