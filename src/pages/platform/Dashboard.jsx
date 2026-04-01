import { Card, Row, Col, Statistic, List, Badge, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BankOutlined, DollarOutlined, AuditOutlined } from '@ant-design/icons'
import { orgs, orders, settlements } from '../../mock/data'

const { Title } = Typography

export default function PlatDashboard() {
  const nav = useNavigate()
  const pendingAudit = orgs.filter(o => o.status === '审核中')
  const pendingRefund = orders.filter(o => o.status === '退款中')
  const pendingSettle = settlements.filter(s => s.status === '待确认')

  const todos = [
    ...pendingAudit.map(o => ({ text: `${o.name} 待审核`, icon: <BankOutlined />, onClick: () => nav(`/orgs/audit/${o.id}`) })),
    ...pendingRefund.map(o => ({ text: `订单 ${o.id} 退款待介入`, icon: <DollarOutlined />, onClick: () => nav(`/global-orders/${o.id}`) })),
    ...pendingSettle.map(s => ({ text: `${s.org} ${s.month} 结算待确认`, icon: <AuditOutlined />, onClick: () => nav('/settlement') })),
  ]

  const totalOrgs = orgs.filter(o => o.status === '正常').length
  const monthOrders = orders.length
  const monthGMV = orders.reduce((s, o) => s + o.amount, 0)

  return (
    <div>
      <Title level={4}>待办事项</Title>
      <Card style={{ marginBottom: 24 }}>
        {todos.length === 0 ? <div style={{ color: '#999' }}>暂无待办</div> : (
          <List
            dataSource={todos}
            renderItem={item => (
              <List.Item style={{ cursor: 'pointer' }} onClick={item.onClick}>
                <Badge status="processing" />
                <span style={{ marginLeft: 8 }}>{item.icon}</span>
                <span style={{ marginLeft: 8 }}>{item.text}</span>
              </List.Item>
            )}
          />
        )}
      </Card>
      <Title level={4}>平台概况</Title>
      <Row gutter={16}>
        <Col span={8}><Card><Statistic title="入驻机构" value={totalOrgs} suffix="家" /></Card></Col>
        <Col span={8}><Card><Statistic title="本月订单" value={monthOrders} suffix="单" /></Card></Col>
        <Col span={8}><Card><Statistic title="本月GMV" value={monthGMV} prefix="¥" /></Card></Col>
      </Row>
    </div>
  )
}
