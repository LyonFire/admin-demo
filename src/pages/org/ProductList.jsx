import { useNavigate } from 'react-router-dom'
import { Table, Tabs, Tag, Button, Typography, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { products, coupons } from '../../mock/data'

const { Title } = Typography

const couponRecords = [
  { key: 1, parent: '小明家长', coupon: '10次课包抵扣', date: '3月20日', expire: '永久', status: '已使用' },
  { key: 2, parent: '小红家长', coupon: '5次课包抵扣', date: '3月22日', expire: '9月18日', status: '未使用' },
]

function ProductTab() {
  const nav = useNavigate()

  const columns = [
    { title: '产品名称', dataIndex: 'name', key: 'name' },
    { title: '服务类型', dataIndex: 'type', key: 'type' },
    { title: '价格', dataIndex: 'price', key: 'price', render: v => `¥${v}` },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: s => <Tag color={s === '启用' ? 'green' : 'default'}>{s}</Tag>,
    },
    {
      title: '操作', key: 'action',
      render: (_, record) => (
        <Space>
          <a onClick={() => nav(`/products/edit/${record.id}`)}>编辑</a>
          {record.status === '停用' && <a style={{ color: '#52c41a' }}>启用</a>}
          {record.status === '启用' && <a style={{ color: '#ff4d4f' }}>停用</a>}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => nav('/products/edit')}
      >
        新建产品
      </Button>
      <Table columns={columns} dataSource={products} rowKey="id" pagination={false} />
    </div>
  )
}

function CouponTab() {
  const couponColumns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: v => `¥${v}` },
    { title: '有效期', dataIndex: 'validity', key: 'validity' },
    { title: '已发放', dataIndex: 'issued', key: 'issued', render: v => `${v}张` },
    { title: '已使用', dataIndex: 'used', key: 'used', render: v => `${v}张` },
    { title: '操作', key: 'action', render: () => <a>编辑</a> },
  ]

  const recordColumns = [
    { title: '家长', dataIndex: 'parent', key: 'parent' },
    { title: '抵扣券', dataIndex: 'coupon', key: 'coupon' },
    { title: '发放日期', dataIndex: 'date', key: 'date' },
    { title: '到期日', dataIndex: 'expire', key: 'expire' },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: s => <Tag color={s === '已使用' ? 'default' : 'green'}>{s}</Tag>,
    },
  ]

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
        新建抵扣券
      </Button>
      <Title level={5}>抵扣券配置</Title>
      <Table columns={couponColumns} dataSource={coupons} rowKey="id" pagination={false} style={{ marginBottom: 24 }} />
      <Title level={5}>发放记录</Title>
      <Table columns={recordColumns} dataSource={couponRecords} rowKey="key" pagination={false} style={{ marginBottom: 16 }} />
      <Button>发放抵扣券给家长</Button>
    </div>
  )
}

export default function ProductList() {
  const tabItems = [
    { key: 'products', label: '产品列表', children: <ProductTab /> },
    { key: 'coupons', label: '抵扣券管理', children: <CouponTab /> },
  ]

  return (
    <div>
      <Title level={4}>产品管理</Title>
      <Tabs items={tabItems} />
    </div>
  )
}
