import { useState } from 'react'
import { Typography, List, Avatar, Badge, Input, Card, Button, Space } from 'antd'
import { SendOutlined, ShoppingOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons'
import { conversations } from '../../mock/data'

const { Title, Text } = Typography
const { Search } = Input

const mockMessages = [
  { id: 1, from: 'parent', text: '您好，我想咨询入校支持服务', time: '10:00' },
  { id: 2, from: 'org', text: '好的，推荐这个产品给您', time: '10:05', card: { type: 'product', name: '影子老师入校陪读', price: '¥800/天' } },
  { id: 3, from: 'parent', text: '好的，我考虑一下', time: '10:24' },
]

export default function Messages() {
  const [activeChat, setActiveChat] = useState(conversations[0])
  const [inputVal, setInputVal] = useState('')

  return (
    <div>
      <Title level={4}>消息中心</Title>
      <div style={{ display: 'flex', gap: 16, height: 'calc(100vh - 200px)' }}>
        {/* 左侧会话列表 */}
        <Card style={{ width: 320, overflow: 'auto' }} styles={{ body: { padding: 0 } }}>
          <div style={{ padding: 12 }}>
            <Search placeholder="搜索家长/老师..." />
          </div>
          <List
            dataSource={conversations}
            renderItem={item => (
              <List.Item
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  background: activeChat?.id === item.id ? '#e6f7ff' : 'transparent',
                }}
                onClick={() => setActiveChat(item)}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={item.unread} size="small">
                      <Avatar style={{ backgroundColor: item.type === 'parent' ? '#87d068' : item.type === 'teacher' ? '#108ee9' : '#faad14' }}>
                        {item.avatar}
                      </Avatar>
                    </Badge>
                  }
                  title={item.name}
                  description={
                    <div>
                      <Text type="secondary" ellipsis style={{ fontSize: 12 }}>{item.last}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        {/* 右侧聊天窗口 */}
        <Card
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          title={activeChat?.name}
          styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: 0 } }}
        >
          {/* 消息区域 */}
          <div style={{ flex: 1, padding: 16, overflow: 'auto' }}>
            {mockMessages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'org' ? 'flex-end' : 'flex-start',
                  marginBottom: 16,
                }}
              >
                <div style={{ maxWidth: '60%' }}>
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: msg.from === 'org' ? '#36B5A0' : '#f0f0f0',
                      color: msg.from === 'org' ? '#fff' : '#333',
                    }}
                  >
                    {msg.text}
                  </div>
                  {msg.card && (
                    <Card size="small" style={{ marginTop: 8 }}>
                      <Text strong>{msg.card.name}</Text>
                      <br />
                      <Text type="secondary">{msg.card.price}</Text>
                    </Card>
                  )}
                  <Text type="secondary" style={{ fontSize: 11 }}>{msg.time}</Text>
                </div>
              </div>
            ))}
          </div>

          {/* 底部操作栏 */}
          <div style={{ borderTop: '1px solid #f0f0f0', padding: 12 }}>
            <Space style={{ marginBottom: 8 }}>
              <Button size="small" icon={<ShoppingOutlined />}>产品</Button>
              <Button size="small" icon={<TeamOutlined />}>老师</Button>
              <Button size="small" icon={<FileTextOutlined />}>订单</Button>
            </Space>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input
                placeholder="输入消息..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onPressEnter={() => setInputVal('')}
              />
              <Button type="primary" icon={<SendOutlined />} onClick={() => setInputVal('')}>
                发送
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
