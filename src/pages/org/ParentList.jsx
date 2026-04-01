import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Input, Typography } from 'antd'
import { parents } from '../../mock/data'

const { Title } = Typography
const { Search } = Input

export default function ParentList() {
  const nav = useNavigate()
  const [keyword, setKeyword] = useState('')

  const filteredParents = parents.filter(p =>
    p.name.includes(keyword) || p.phone.includes(keyword)
  )

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '孩子', dataIndex: 'child', key: 'child' },
    { title: '订单数', dataIndex: 'orders', key: 'orders' },
    {
      title: '操作', key: 'action',
      render: (_, record) => <a onClick={() => nav(`/parents/${record.id}`)}>详情</a>,
    },
  ]

  return (
    <div>
      <Title level={4}>家长管理</Title>
      <Search
        placeholder="搜索家长姓名/电话..."
        allowClear
        onChange={e => setKeyword(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredParents}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}
