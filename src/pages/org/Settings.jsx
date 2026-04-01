import { Card, Form, Input, Select, Button, Typography, Upload, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { orgs } from '../../mock/data'

const { Title } = Typography
const { TextArea } = Input

const serviceOptions = [
  { value: '影子老师', label: '影子老师' },
  { value: '入户干预', label: '入户干预' },
  { value: '密集干预', label: '密集干预' },
  { value: '线上督导', label: '线上督导' },
]

const areaOptions = [
  { value: '朝阳区', label: '朝阳区' },
  { value: '海淀区', label: '海淀区' },
  { value: '西城区', label: '西城区' },
  { value: '东城区', label: '东城区' },
  { value: '昌平区', label: '昌平区' },
]

export default function Settings() {
  const [form] = Form.useForm()
  const org = orgs[0]

  const handleSave = () => {
    form.validateFields().then(() => {
      // save
    })
  }

  return (
    <div>
      <Title level={4}>机构设置</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{
            name: org.name,
            phone: org.phone,
            services: org.services?.split('、') || [],
            area: org.area?.split('/') || [],
          }}
        >
          <Form.Item name="name" label="机构名称" rules={[{ required: true, message: '请输入机构名称' }]}>
            <Input placeholder="请输入机构名称" />
          </Form.Item>

          <Form.Item name="intro" label="机构介绍" rules={[{ required: true, message: '请输入机构介绍' }]}>
            <TextArea rows={4} placeholder="请输入机构介绍" />
          </Form.Item>

          <Form.Item name="services" label="服务范围" rules={[{ required: true, message: '请选择服务范围' }]}>
            <Select mode="multiple" placeholder="请选择服务范围" options={serviceOptions} />
          </Form.Item>

          <Form.Item name="area" label="服务区域" rules={[{ required: true, message: '请选择服务区域' }]}>
            <Select mode="multiple" placeholder="请选择服务区域" options={areaOptions} />
          </Form.Item>

          <Form.Item name="logo" label="机构Logo">
            <Upload maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="phone" label="联系电话">
            <Input placeholder="请输入联系电话" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSave}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
