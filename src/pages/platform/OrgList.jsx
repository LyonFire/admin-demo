import { useState } from 'react'
import { Table, Tabs, Button, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { orgs } from '../../mock/data'

const { Title } = Typography
const statusColor = { '正常': 'green', '审核中': 'orange', '已禁用': 'red' }

export default function PlatOrgList() {
  const nav = useNavigate()
  const [tab, setTab] = useState('全部')
  const filtered = tab === '全部' ? orgs : orgs.filter(o => o.status === tab)

  const columns = [
    { title: '机构名称', dataIndex: 'name' },
    { title: '状态', dataIndex: 'status', render: s => <Tag color={statusColor[s]}>{s}</Tag> },
    { title: '抽成', dataIndex: 'commission', render: v => v ? `${v}%` : '-' },
    { title: '本月订单', dataIndex: 'monthOrders', render: v => v || '-' },
    { title: '操作', render: (_, r) => r.status === '审核中'
      ? <Button type="link" onClick={() => nav(`/orgs/audit/${r.id}`)}>审核</Button>
      : <Button type="link" onClick={() => nav(`/orgs/${r.id}`)}>详情</Button>
    },
  ]

  return (
    <div>
      <Title level={4}>机构管理</Title>
      <Tabs activeKey={tab} onChange={setTab} items={['全部','正常','审核中','已禁用'].map(t => ({ key: t, label: t }))} />
      <Table dataSource={filtered} columns={columns} rowKey="id" pagination={false} />
    </div>
  )
}
