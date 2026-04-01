import { useState } from 'react'
import { Card, Form, Input, Select, Upload, Button, Typography, Checkbox, message, Result } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

const serviceOptions = [
  { label: '入校支持', value: '入校支持' },
  { label: '入户支持', value: '入户支持' },
  { label: '远程支持', value: '远程支持' },
  { label: '密集干预', value: '密集干预' },
  { label: '线上督导', value: '线上督导' },
  { label: '家庭社区干预', value: '家庭社区干预' },
]

const areaOptions = [
  { value: '朝阳区', label: '朝阳区' },
  { value: '海淀区', label: '海淀区' },
  { value: '西城区', label: '西城区' },
  { value: '东城区', label: '东城区' },
  { value: '昌平区', label: '昌平区' },
  { value: '丰台区', label: '丰台区' },
]

export default function Register({ onGoLogin }) {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    form.validateFields().then(() => {
      setSubmitted(true)
      message.success('申请已提交')
    })
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4f7f4 100%)' }}>
        <Card style={{ width: 500, textAlign: 'center' }}>
          <Result
            status="success"
            title="申请已提交"
            subTitle="平台将在1-3个工作日内完成审核，审核通过后将通过短信通知您登录后台。"
            extra={<Button type="primary" onClick={onGoLogin}>返回登录</Button>}
          />
        </Card>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4f7f4 100%)', padding: '40px 0' }}>
      <Card style={{ width: 560 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: '#36B5A0', marginBottom: 4 }}>米途 MeToo</Title>
          <Text type="secondary">机构入驻申请</Text>
        </div>

        <Form form={form} layout="vertical">
          <Form.Item name="name" label="机构名称" rules={[{ required: true, message: '请输入机构名称' }, { min: 2, max: 50, message: '2-50字' }]}>
            <Input placeholder="请输入机构名称" />
          </Form.Item>

          <Form.Item name="contact" label="联系人" rules={[{ required: true, message: '请输入联系人' }, { min: 2, max: 20, message: '2-20字' }]}>
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>

          <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }, { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item name="intro" label="机构介绍" rules={[{ required: true, message: '请输入机构介绍' }, { min: 10, max: 500, message: '10-500字' }]}>
            <TextArea rows={4} placeholder="请介绍机构的服务特色、团队背景等" showCount maxLength={500} />
          </Form.Item>

          <Form.Item name="services" label="服务范围" rules={[{ required: true, message: '请至少选择一项服务' }]}>
            <Checkbox.Group options={serviceOptions} />
          </Form.Item>

          <Form.Item name="area" label="服务区域" rules={[{ required: true, message: '请选择服务区域' }]}>
            <Select mode="multiple" placeholder="请选择服务区域" options={areaOptions} />
          </Form.Item>

          <Form.Item name="license" label="营业执照（选填）" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}>
            <Upload maxCount={1} beforeUpload={() => false} accept=".jpg,.jpeg,.png,.pdf">
              <Button icon={<UploadOutlined />}>上传文件</Button>
              <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>支持JPG/PNG/PDF，≤10MB，个人从业者可不上传</Text>
            </Upload>
          </Form.Item>

          <Form.Item name="cert" label="资质证明（选填）" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}>
            <Upload maxCount={1} beforeUpload={() => false} accept=".jpg,.jpeg,.png,.pdf">
              <Button icon={<UploadOutlined />}>上传文件</Button>
              <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>支持JPG/PNG/PDF，≤10MB</Text>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" block onClick={handleSubmit}>提交申请</Button>
          </Form.Item>
        </Form>

        <Paragraph type="secondary" style={{ textAlign: 'center', fontSize: 12, marginBottom: 0 }}>
          提交后等待平台审核（1-3个工作日），审核通过后将通过短信通知您登录后台。
        </Paragraph>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Button type="link" onClick={onGoLogin}>已有账号？返回登录</Button>
        </div>
      </Card>
    </div>
  )
}
