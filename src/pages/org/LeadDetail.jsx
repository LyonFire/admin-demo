import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Select, Typography, Button, Space, Input, List, Divider } from 'antd'
import { MessageOutlined, ShoppingOutlined, FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { leads } from '../../mock/data'

const { Title, Text } = Typography
const { TextArea } = Input

const statusColorMap = {
  '新线索': 'blue',
  '跟进中': 'orange',
  '已成交': 'green',
  '已流失': 'default',
}

export default function LeadDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const lead = leads.find(l => l.id === Number(id))
  const [status, setStatus] = useState(lead?.status)
  const [followContent, setFollowContent] = useState('')
  const [records, setRecords] = useState(lead?.records || [])

  if (!lead) return <div>线索不存在</div>

  const handleAddRecord = () => {
    if (!followContent.trim()) return
    const newRecord = {
      time: new Date().toLocaleString('zh-CN'),
      content: followContent,
    }
    setRecords([newRecord, ...records])
    setFollowContent('')
  }

  return (
    <div>
      <Title level={4}>线索详情 · {lead.name}</Title>

      <Card title="基本信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="姓名">{lead.name}</Descriptions.Item>
          <Descriptions.Item label="电话">{lead.phone}</Descriptions.Item>
          <Descriptions.Item label="来源"><Tag>{lead.source}</Tag></Descriptions.Item>
          <Descriptions.Item label="状态">
            <Select
              value={status}
              onChange={setStatus}
              style={{ width: 120 }}
              options={[
                { value: '新线索', label: '新线索' },
                { value: '跟进中', label: '跟进中' },
                { value: '已成交', label: '已成交' },
                { value: '已流失', label: '已流失' },
              ]}
            />
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{lead.created}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="需求信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="孩子年龄">{lead.childAge}岁</Descriptions.Item>
          <Descriptions.Item label="需求描述">{lead.need}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="跟进记录" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <TextArea
            rows={3}
            placeholder="请输入跟进内容..."
            value={followContent}
            onChange={e => setFollowContent(e.target.value)}
          />
          <Button type="primary" style={{ marginTop: 8 }} onClick={handleAddRecord}>
            保存
          </Button>
        </div>
        <Divider />
        <List
          dataSource={records}
          locale={{ emptyText: '暂无跟进记录' }}
          renderItem={item => (
            <List.Item>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                <br />
                <Text>{item.content}</Text>
              </div>
            </List.Item>
          )}
        />
      </Card>

      <Card title="快捷操作">
        <Space wrap>
          <Button icon={<ShoppingOutlined />} onClick={() => nav('/messages')}>发送产品</Button>
          <Button icon={<FileTextOutlined />} onClick={() => nav('/orders/create')}>发送订单</Button>
          <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => setStatus('已成交')}>
            标记成交
          </Button>
          <Button danger icon={<CloseCircleOutlined />} onClick={() => setStatus('已流失')}>
            标记流失
          </Button>
          <Button icon={<MessageOutlined />} onClick={() => nav('/messages')}>进入IM聊天</Button>
        </Space>
      </Card>
    </div>
  )
}
