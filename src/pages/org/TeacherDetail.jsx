import { useParams } from 'react-router-dom'
import { Card, Descriptions, Tag, Calendar, List, Typography, Space, Rate } from 'antd'
import { teachers } from '../../mock/data'

const { Title, Text } = Typography

const mockReviews = [
  { id: 1, parent: '小明家长', date: '3/20', rating: 5, content: '非常专业' },
  { id: 2, parent: '小红家长', date: '3/18', rating: 4, content: '整体不错' },
]

const mockSchedules = [
  { date: '3月24日', items: [
    { time: '09:00-17:00', type: '影子老师入校', parent: '小明家长' },
    { time: '14:00-16:00', type: '入户干预', parent: '小红家长' },
  ]},
]

export default function TeacherDetail() {
  const { id } = useParams()
  const teacher = teachers.find(t => t.id === Number(id))

  if (!teacher) return <div>老师不存在</div>

  return (
    <div>
      <Title level={4}>老师详情 · {teacher.name}</Title>

      <Card title="基本信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="姓名">{teacher.name}</Descriptions.Item>
          <Descriptions.Item label="电话">{teacher.phone}</Descriptions.Item>
          <Descriptions.Item label="擅长">{teacher.skill}</Descriptions.Item>
          <Descriptions.Item label="从业">{teacher.exp}年</Descriptions.Item>
          <Descriptions.Item label="评分">⭐ {teacher.score}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={teacher.status === '在职' ? 'green' : 'default'}>{teacher.status}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="排班管理" style={{ marginBottom: 16 }}>
        <Calendar fullscreen={false} />
        <div style={{ marginTop: 16 }}>
          {mockSchedules.map((day, i) => (
            <div key={i}>
              <Text strong>{day.date} 排班</Text>
              <List
                size="small"
                dataSource={day.items}
                renderItem={item => (
                  <List.Item>
                    <Text>{item.time} {item.type} {item.parent}</Text>
                  </List.Item>
                )}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card title="最近评价" style={{ marginBottom: 16 }}>
        <List
          dataSource={mockReviews}
          renderItem={item => (
            <List.Item>
              <div>
                <Space>
                  <Rate disabled defaultValue={item.rating} style={{ fontSize: 14 }} />
                  <Text>{item.parent}</Text>
                  <Text type="secondary">{item.date}</Text>
                </Space>
                <br />
                <Text>"{item.content}"</Text>
              </div>
            </List.Item>
          )}
        />
      </Card>

      <Card title="课时统计">
        <Descriptions>
          <Descriptions.Item label="本月课时">{teacher.hours.month}课时</Descriptions.Item>
          <Descriptions.Item label="累计课时">{teacher.hours.total}课时</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}
