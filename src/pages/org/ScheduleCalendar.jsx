import { useState } from 'react'
import { Card, Select, Typography, Space, Tag, Segmented, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { teachers } from '../../mock/data'

const { Title, Text } = Typography

const hours = Array.from({ length: 11 }, (_, i) => `${String(8 + i).padStart(2, '0')}:00`)

const mockDaySchedules = {
  '张老师': [{ start: 9, end: 13, type: '影子老师入校', parent: '小明家长', location: 'XX小学' }],
  '李老师': [
    { start: 9, end: 13, type: '入户干预', parent: '小红家长', location: '朝阳区' },
    { start: 14, end: 17, type: '密集干预', parent: '小李家长', location: '海淀区' },
  ],
  '王老师': [{ start: 14, end: 17, type: '入户干预', parent: '小王家长', location: '西城区' }],
}

const weekDays = ['周一', '周二', '周三', '周四', '周五']
const mockWeekData = {
  '张老师': [2, 1, 1, 2, 2],
  '李老师': [1, 2, 1, 1, 1],
  '王老师': [0, 1, 2, 1, 2],
  '赵老师': [1, 0, 1, 0, 1],
}

export default function ScheduleCalendar() {
  const [view, setView] = useState('日视图')
  const [currentDate, setCurrentDate] = useState('2026-03-24')

  const switchDate = (dir) => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + (view === '日视图' ? dir : dir * 7))
    setCurrentDate(d.toISOString().slice(0, 10))
  }

  const teacherNames = teachers.map(t => t.name)

  return (
    <div>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>排班日历</Title>
        <Space>
          <Button icon={<LeftOutlined />} size="small" onClick={() => switchDate(-1)} />
          <Text strong>{currentDate}</Text>
          <Button icon={<RightOutlined />} size="small" onClick={() => switchDate(1)} />
        </Space>
      </Space>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Segmented options={['日视图', '周视图']} value={view} onChange={setView} />
          <Select
            defaultValue="all"
            style={{ width: 140 }}
            options={[{ value: 'all', label: '全部老师' }, ...teachers.map(t => ({ value: t.id, label: t.name }))]}
          />
          <Select
            defaultValue="all"
            style={{ width: 140 }}
            options={[
              { value: 'all', label: '全部服务类型' },
              { value: '影子老师', label: '影子老师' },
              { value: '入户干预', label: '入户干预' },
              { value: '密集干预', label: '密集干预' },
            ]}
          />
        </Space>

        {view === '日视图' ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: 80, padding: 8, borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}>时间</th>
                  {teacherNames.map(name => (
                    <th key={name} style={{ padding: 8, borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: 150 }}>
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map(hour => {
                  const hourNum = parseInt(hour)
                  return (
                    <tr key={hour}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #f5f5f5', fontSize: 12, color: '#999' }}>
                        {hour}
                      </td>
                      {teacherNames.map(name => {
                        const schedules = mockDaySchedules[name] || []
                        const schedule = schedules.find(s => s.start === hourNum)
                        const isOccupied = schedules.some(s => hourNum > s.start && hourNum < s.end)
                        return (
                          <td key={name} style={{ padding: 4, borderBottom: '1px solid #f5f5f5', verticalAlign: 'top' }}>
                            {schedule && (
                              <div style={{
                                background: '#e6f7ff',
                                border: '1px solid #91d5ff',
                                borderRadius: 4,
                                padding: 8,
                                fontSize: 12,
                              }}>
                                <Text strong style={{ fontSize: 12 }}>{schedule.type}</Text>
                                <br />
                                <Text style={{ fontSize: 11 }}>{schedule.parent}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 11 }}>{schedule.location}</Text>
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: 8, borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}>老师</th>
                  {weekDays.map(d => (
                    <th key={d} style={{ padding: 8, borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(mockWeekData).map(([name, counts]) => (
                  <tr key={name}>
                    <td style={{ padding: 8, borderBottom: '1px solid #f5f5f5' }}>{name}</td>
                    {counts.map((count, i) => (
                      <td key={i} style={{ padding: 8, borderBottom: '1px solid #f5f5f5', textAlign: 'center' }}>
                        {Array.from({ length: count }).map((_, j) => (
                          <Tag key={j} color="blue" style={{ margin: 1 }}>●</Tag>
                        ))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
