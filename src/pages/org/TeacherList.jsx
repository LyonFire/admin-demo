import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tag, Button, Modal, Form, Input, InputNumber, Select, Typography, Space } from 'antd'
import { PlusOutlined, CalendarOutlined } from '@ant-design/icons'
import { teachers } from '../../mock/data'

const { Title } = Typography

const skillOptions = [
  { value: '入校支持', label: '入校支持' },
  { value: '入户干预', label: '入户干预' },
  { value: '密集干预', label: '密集干预' },
  { value: '督导', label: '督导' },
  { value: '远程', label: '远程' },
]

export default function TeacherList() {
  const nav = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '擅长', dataIndex: 'skill', key: 'skill' },
    { title: '评分', dataIndex: 'score', key: 'score', render: v => `⭐ ${v}` },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: s => <Tag color={s === '在职' ? 'green' : 'default'}>{s}</Tag>,
    },
    {
      title: '操作', key: 'action',
      render: (_, record) => <a onClick={() => nav(`/teachers/${record.id}`)}>详情</a>,
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
        <Title level={4} style={{ margin: 0 }}>老师管理</Title>
        <Space>
          <Button icon={<CalendarOutlined />} onClick={() => nav('/teachers/calendar')}>
            排班日历
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
            添加老师
          </Button>
        </Space>
      </Space>

      <Table columns={columns} dataSource={teachers} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal
        title="添加老师"
        open={modalOpen}
        onOk={handleAdd}
        onCancel={() => { setModalOpen(false); form.resetFields() }}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="skill" label="擅长领域" rules={[{ required: true, message: '请选择擅长领域' }]}>
            <Select mode="multiple" placeholder="请选择擅长领域" options={skillOptions} />
          </Form.Item>
          <Form.Item name="exp" label="从业年限">
            <InputNumber min={0} placeholder="请输入从业年限" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="intro" label="简介">
            <Input.TextArea rows={3} placeholder="请输入简介" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
