import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tabs, Tag, Button, Typography, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { orders } from '../../mock/data'

const { Title } = Typography

const statusColorMap = {
  '服务中': 'green',
  '待支付': 'orange',
  '退款中': 'red',
  '已完成': 'default',
  '已支付': 'blue',
  '已取消': 'default',
}

const allStatuses = ['全部', '待支付', '已支付', '服务中', '已完成', '退款中', '已取消']

export default function OrderList() {
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState('全部')

  const filteredOrders = activeTab === '全部' ? orders : orders.filter(o => o.status === activeTab)

  const tabItems = allStatuses.map(s => ({
    key: s,
    label: s === '全部' ? `全部(${orders.length})` : `${s}(${orders.filter(o => o.status === s).length})`,
  }))

  const columns = [
    { title: '订单号', dataIndex: 'id', key: 'id' },
    { title: '家长', dataIndex: 'parent', key: 'parent' },
    { title: '产品', dataIndex: 'product', key: 'product' },
    { title: '老师', dataIndex: 'teacher', key: 'teacher' },
    { title: '金额', dataIndex: 'paid', key: 'paid', render: v => `¥${v}` },
    { title: '状态', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColorMap[s]}>{s}</Tag> },
    { title: '创建时间', dataIndex: 'date', key: 'date' },
    {
      title: '操作', key: 'action',
      render: (_, record) => (
        <Space>
          <a onClick={() => nav(`/orders/${record.id}`)}>详情</a>
          {record.status === '待支付' && <a style={{ color: '#ff4d4f' }}>取消</a>}
          {record.status === '退款中' && <a style={{ color: '#faad14' }} onClick={() => nav(`/orders/${record.id}`)}>审核</a>}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>订单管理</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => nav('/orders/create')}>
          创建订单
        </Button>
      </Space>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}
