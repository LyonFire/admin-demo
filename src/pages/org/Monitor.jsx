import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tabs, Tag, Button, Typography, Space, Select, Card, Modal } from 'antd'
import { monitorServices, teachers } from '../../mock/data'

const { Title, Text } = Typography

const statusColorMap = {
  '已签到': 'green',
  '待签到': 'default',
  '异常': 'red',
  '已完成': 'green',
}

const monitorStatuses = ['全部', '已签到', '待签到', '异常', '已完成']

const mockReports = [
  { id: 1, date: '3/24', teacher: '张老师', parent: '小明', type: '影子老师入校' },
  { id: 2, date: '3/23', teacher: '张老师', parent: '小明', type: '影子老师入校' },
  { id: 3, date: '3/23', teacher: '李老师', parent: '小红', type: '入户干预' },
]

function TodayMonitorTab() {
  const nav = useNavigate()
  const [activeStatus, setActiveStatus] = useState('全部')

  const filtered = activeStatus === '全部'
    ? monitorServices
    : monitorServices.filter(s => s.status === activeStatus)

  const tabItems = monitorStatuses.map(s => ({
    key: s,
    label: s === '全部'
      ? `全部(${monitorServices.length})`
      : `${s}(${monitorServices.filter(m => m.status === s).length})`,
  }))

  const columns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '老师', dataIndex: 'teacher', key: 'teacher' },
    { title: '家长', dataIndex: 'parent', key: 'parent' },
    { title: '服务类型', dataIndex: 'type', key: 'type' },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: s => <Tag color={statusColorMap[s]}>{s}</Tag>,
    },
    { title: '详情', dataIndex: 'detail', key: 'detail', render: v => v || '-' },
    {
      title: '操作', key: 'action',
      render: (_, record) => record.status === '异常' ? (
        <Space>
          <Button type="link" size="small" onClick={() => nav('/messages')}>联系老师</Button>
          <Button type="link" size="small" onClick={() => nav('/messages')}>联系家长</Button>
        </Space>
      ) : null,
    },
  ]

  return (
    <div>
      <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>2026-03-24</Text>
      <Tabs activeKey={activeStatus} onChange={setActiveStatus} items={tabItems} />
      <Table columns={columns} dataSource={filtered} rowKey="id" pagination={false} />
    </div>
  )
}

function ReportManageTab() {
  const [reportModalOpen, setReportModalOpen] = useState(false)

  const columns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '老师', dataIndex: 'teacher', key: 'teacher' },
    { title: '家长', dataIndex: 'parent', key: 'parent' },
    { title: '服务类型', dataIndex: 'type', key: 'type' },
    {
      title: '操作', key: 'action',
      render: () => <a onClick={() => setReportModalOpen(true)}>查看</a>,
    },
  ]

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Tabs
          defaultActiveKey="report"
          size="small"
          items={[
            { key: 'report', label: '报告' },
            { key: 'plan', label: '预案' },
          ]}
        />
      </Space>
      <Space style={{ marginBottom: 16 }}>
        <Select
          defaultValue="all"
          style={{ width: 140 }}
          options={[{ value: 'all', label: '全部老师' }, ...teachers.map(t => ({ value: t.id, label: t.name }))]}
        />
        <Select
          defaultValue="all"
          style={{ width: 140 }}
          options={[{ value: 'all', label: '全部家长' }]}
        />
      </Space>
      <Table columns={columns} dataSource={mockReports} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal
        title="报告详情"
        open={reportModalOpen}
        onCancel={() => setReportModalOpen(false)}
        footer={null}
      >
        <p><strong>日期：</strong>3/24</p>
        <p><strong>老师：</strong>张老师</p>
        <p><strong>服务类型：</strong>影子老师入校</p>
        <p><strong>报告内容：</strong></p>
        <p>今日小明在课堂上表现良好，能够在提示下完成课堂任务。社交方面，课间主动与同学打招呼1次。建议继续加强社交引导训练。</p>
      </Modal>
    </div>
  )
}

export default function Monitor() {
  const tabItems = [
    { key: 'today', label: '今日监管', children: <TodayMonitorTab /> },
    { key: 'reports', label: '报告管理', children: <ReportManageTab /> },
  ]

  return (
    <div>
      <Title level={4}>服务监管</Title>
      <Card>
        <Tabs items={tabItems} />
      </Card>
    </div>
  )
}
