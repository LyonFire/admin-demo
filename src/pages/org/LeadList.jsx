import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tabs, Tag, Button, Modal, Form, Input, InputNumber, Typography, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { leads } from '../../mock/data'

const { Title } = Typography
const { TextArea } = Input

const statusColorMap = {
  '新线索': 'blue',
  '跟进中': 'orange',
  '已成交': 'green',
  '已流失': 'default',
}

const tabItems = [
  { key: '全部', label: `全部(${leads.length})` },
  { key: '新线索', label: `新线索(${leads.filter(l => l.status === '新线索').length})` },
  { key: '跟进中', label: `跟进中(${leads.filter(l => l.status === '跟进中').length})` },
  { key: '已成交', label: `已成交(${leads.filter(l => l.status === '已成交').length})` },
  { key: '已流失', label: `已流失(${leads.filter(l => l.status === '已流失').length})` },
]

export default function LeadList() {
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState('全部')
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  const filteredLeads = activeTab === '全部' ? leads : leads.filter(l => l.status === activeTab)

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '来源', dataIndex: 'source', key: 'source', render: v => <Tag>{v}</Tag> },
    { title: '状态', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColorMap[s]}>{s}</Tag> },
    { title: '最后跟进', dataIndex: 'lastFollow', key: 'lastFollow' },
    {
      title: '操作', key: 'action',
      render: (_, record) => (
        <a onClick={() => nav(`/leads/${record.id}`)}>
          {record.status === '新线索' || record.status === '跟进中' ? '跟进' : '查看'}
        </a>
      ),
    },
  ]

  const handleAdd = () => {
    form.validateFields().then(() => {
      setModalOpen(false)
      form.resetFields()
    })
  }

  return (
    <div>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>线索管理</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          新增线索
        </Button>
      </Space>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />

      <Table
        columns={columns}
        dataSource={filteredLeads}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="新增线索"
        open={modalOpen}
        onOk={handleAdd}
        onCancel={() => { setModalOpen(false); form.resetFields() }}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="家长姓名" rules={[{ required: true, message: '请输入家长姓名' }]}>
            <Input placeholder="请输入家长姓名" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item name="childAge" label="孩子年龄">
            <InputNumber min={0} max={18} placeholder="请输入孩子年龄" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="need" label="需求描述">
            <TextArea rows={3} placeholder="请输入需求描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
