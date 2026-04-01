import { useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Input, InputNumber, Select, Radio, Button, Typography, Space } from 'antd'
import { products } from '../../mock/data'

const { Title } = Typography
const { TextArea } = Input

const serviceTypes = [
  { value: '影子老师服务', label: '影子老师服务' },
  { value: '陪伴式干预', label: '陪伴式干预' },
  { value: '家庭社区密集干预', label: '家庭社区密集干预' },
  { value: '线上督导', label: '线上督导' },
]

export default function ProductEdit() {
  const { id } = useParams()
  const nav = useNavigate()
  const [form] = Form.useForm()
  const isEdit = !!id
  const product = isEdit ? products.find(p => p.id === Number(id)) : null

  const handleSubmit = () => {
    form.validateFields().then(() => {
      nav('/products')
    })
  }

  return (
    <div>
      <Title level={4}>{isEdit ? '编辑产品' : '新建产品'}</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={product ? {
            type: product.type,
            name: product.name,
            price: product.price,
            status: product.status,
          } : { status: '启用' }}
        >
          <Form.Item name="type" label="服务类型" rules={[{ required: true, message: '请选择服务类型' }]}>
            <Select placeholder="请选择服务类型" options={serviceTypes} />
          </Form.Item>

          <Form.Item name="name" label="产品名称" rules={[{ required: true, message: '请输入产品名称' }]}>
            <Input placeholder="请输入产品名称" />
          </Form.Item>

          <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }]}>
            <InputNumber min={0} addonAfter="元" placeholder="请输入价格" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="desc" label="产品说明">
            <TextArea rows={4} placeholder="请输入产品说明" />
          </Form.Item>

          <Form.Item name="status" label="状态" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="启用">启用</Radio>
              <Radio value="停用">停用</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => nav('/products')}>取消</Button>
              <Button type="primary" onClick={handleSubmit}>保存</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
