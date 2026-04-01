import { Card, Button, Space, Typography } from 'antd'
import { ShopOutlined, CrownOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Login({ onLogin, onGoRegister }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4f7f4 100%)' }}>
      <Card style={{ width: 400, textAlign: 'center' }}>
        <Title level={3} style={{ color: '#36B5A0', marginBottom: 8 }}>米途 MeToo</Title>
        <Text type="secondary">后台管理系统</Text>
        <div style={{ marginTop: 32 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button type="primary" size="large" block icon={<ShopOutlined />} onClick={() => onLogin({ role: 'org', name: '大米和小米（朝阳店）' })}>
              机构管理员登录
            </Button>
            <Button size="large" block icon={<CrownOutlined />} onClick={() => onLogin({ role: 'platform', name: '平台管理员' })}>
              平台管理员登录
            </Button>
          </Space>
        </div>
        <div style={{ marginTop: 16 }}>
          <Button type="link" onClick={onGoRegister}>还没有账号？申请入驻</Button>
        </div>
      </Card>
    </div>
  )
}
