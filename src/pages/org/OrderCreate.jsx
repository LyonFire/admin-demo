import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Select, InputNumber, Input, Button, Typography, Space, Table } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { parents, products, teachers } from '../../mock/data'

const { Title } = Typography
const { TextArea } = Input

export default function OrderCreate() {
  const nav = useNavigate()
  const [form] = Form.useForm()
  const [schedules, setSchedules] = useState([
    { key: 1, date: '3月25日', time: '09:00 - 17:00' },
    { key: 2, date: '3月26日', time: '09:00 - 17:00' },
  ])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [discount, setDiscount] = useState(0)

  const price = selectedProduct ? products.find(p => p.id === selectedProduct)?.price || 0 : 0

  const scheduleColumns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '时间段', dataIndex: 'time', key: 'time' },
    {
      title: '操作', key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => setSchedules(schedules.filter(s => s.key !== record.key))}
        />
      ),
    },
  ]

  const handleAddSchedule = () => {
    setSchedules([...schedules, {
      key: Date.now(),
      date: `3月${27 + schedules.length}日`,
      time: '09:00 - 17:00',
    }])
  }

  const handleSubmit = () => {
    form.validateFields().then(() => {
      nav('/orders')
    })
  }

  return (
    <div>
      <Title level={4}>创建订单</Title>
      <Card>
        <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
          <Form.Item name="parent" label="选择家长" rules={[{ required: true, message: '请选择家长' }]}>
            <Select
              showSearch
              placeholder="搜索家长..."
              optionFilterProp="label"
              options={parents.map(p => ({ value: p.id, label: p.name }))}
            />
          </Form.Item>

          <Form.Item name="child" label="选择孩子" rules={[{ required: true, message: '请选择孩子' }]}>
            <Select
              placeholder="选择孩子"
              options={parents.map(p => ({ value: p.id, label: p.child }))}
            />
          </Form.Item>

          <Form.Item name="product" label="选择产品" rules={[{ required: true, message: '请选择产品' }]}>
            <Select
              showSearch
              placeholder="搜索产品..."
              optionFilterProp="label"
              options={products.filter(p => p.status === '启用').map(p => ({ value: p.id, label: `${p.name} ¥${p.price}` }))}
              onChange={v => setSelectedProduct(v)}
            />
          </Form.Item>

          <Form.Item name="teacher" label="选择老师（可选）">
            <Select
              showSearch
              allowClear
              placeholder="搜索老师..."
              optionFilterProp="label"
              options={teachers.map(t => ({ value: t.id, label: t.name }))}
            />
          </Form.Item>

          <Form.Item name="address" label="服务地址" rules={[{ required: true, message: '请输入服务地址' }]}>
            <Input placeholder="请输入服务地址" />
          </Form.Item>

          <Form.Item label="服务日程" required>
            <Table
              columns={scheduleColumns}
              dataSource={schedules}
              rowKey="key"
              pagination={false}
              size="small"
            />
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddSchedule}
              style={{ width: '100%', marginTop: 8 }}
            >
              添加日程
            </Button>
          </Form.Item>

          <Card size="small" title="价格配置" style={{ marginBottom: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>原价：¥{price}</div>
              <div>
                优惠：¥
                <InputNumber
                  min={0}
                  max={price}
                  value={discount}
                  onChange={v => setDiscount(v || 0)}
                  style={{ width: 120 }}
                />
              </div>
              <div><strong>应付：¥{price - discount}</strong></div>
            </Space>
          </Card>

          <Form.Item name="remark" label="备注">
            <TextArea rows={2} placeholder="请输入备注" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => nav('/orders')}>取消</Button>
              <Button type="primary" onClick={handleSubmit}>创建并发送</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
