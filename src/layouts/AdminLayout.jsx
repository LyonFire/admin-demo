import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Button, Badge, Avatar, Typography, Space } from 'antd'
import {
  HomeOutlined, MessageOutlined, AimOutlined, FileTextOutlined,
  ShoppingOutlined, TeamOutlined, UserOutlined, EyeOutlined,
  SettingOutlined, BankOutlined, AuditOutlined, DollarOutlined,
  LogoutOutlined, SwapOutlined
} from '@ant-design/icons'

// 机构端页面
import OrgDashboard from '../pages/org/Dashboard'
import OrgMessages from '../pages/org/Messages'
import OrgLeadList from '../pages/org/LeadList'
import OrgLeadDetail from '../pages/org/LeadDetail'
import OrgOrderList from '../pages/org/OrderList'
import OrgOrderCreate from '../pages/org/OrderCreate'
import OrgOrderDetail from '../pages/org/OrderDetail'
import OrgProductList from '../pages/org/ProductList'
import OrgProductEdit from '../pages/org/ProductEdit'
import OrgTeacherList from '../pages/org/TeacherList'
import OrgTeacherDetail from '../pages/org/TeacherDetail'
import OrgScheduleCalendar from '../pages/org/ScheduleCalendar'
import OrgParentList from '../pages/org/ParentList'
import OrgParentDetail from '../pages/org/ParentDetail'
import OrgMonitor from '../pages/org/Monitor'
import OrgSettings from '../pages/org/Settings'

// 平台端页面
import PlatDashboard from '../pages/platform/Dashboard'
import PlatOrgList from '../pages/platform/OrgList'
import PlatOrgDetail from '../pages/platform/OrgDetail'
import PlatOrgAudit from '../pages/platform/OrgAudit'
import PlatGlobalOrders from '../pages/platform/GlobalOrders'
import PlatOrderDetail from '../pages/platform/OrderDetail'
import PlatCommission from '../pages/platform/Commission'
import PlatSettlement from '../pages/platform/Settlement'
import PlatSettlementLog from '../pages/platform/SettlementLog'

const { Sider, Content, Header } = Layout
const { Text } = Typography

const orgMenuItems = [
  { key: '/', icon: <HomeOutlined />, label: '首页' },
  { key: '/messages', icon: <MessageOutlined />, label: '消息中心' },
  { key: '/leads', icon: <AimOutlined />, label: '线索管理' },
  { key: '/orders', icon: <FileTextOutlined />, label: '订单管理' },
  { key: '/products', icon: <ShoppingOutlined />, label: '产品管理' },
  { key: '/teachers', icon: <TeamOutlined />, label: '老师管理' },
  { key: '/parents', icon: <UserOutlined />, label: '家长管理' },
  { key: '/monitor', icon: <EyeOutlined />, label: '服务监管' },
  { key: '/settings', icon: <SettingOutlined />, label: '机构设置' },
]

const platMenuItems = [
  { key: '/', icon: <HomeOutlined />, label: '首页' },
  { key: '/orgs', icon: <BankOutlined />, label: '机构管理' },
  { key: '/global-orders', icon: <FileTextOutlined />, label: '订单监管' },
  { key: '/commission', icon: <DollarOutlined />, label: '抽成配置' },
  { key: '/settlement', icon: <AuditOutlined />, label: '机构结算' },
  { key: '/settlement-log', icon: <FileTextOutlined />, label: '结算记录' },
]

export default function AdminLayout({ user, onLogout }) {
  const nav = useNavigate()
  const loc = useLocation()
  const isOrg = user.role === 'org'
  const menuItems = isOrg ? orgMenuItems : platMenuItems

  const selectedKey = '/' + (loc.pathname.split('/')[1] || '')

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Text strong style={{ color: '#36B5A0', fontSize: 16 }}>米途 MeToo</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{isOrg ? '机构后台' : '平台后台'}</Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => nav(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Text strong>{user.name}</Text>
          <Space>
            <Button type="text" icon={<SwapOutlined />} onClick={() => onLogout()}>切换角色</Button>
            <Button type="text" icon={<LogoutOutlined />} onClick={() => onLogout()}>退出</Button>
          </Space>
        </Header>
        <Content style={{ padding: 24, background: '#f5f7fa', minHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
          {isOrg ? <OrgRoutes /> : <PlatRoutes />}
        </Content>
      </Layout>
    </Layout>
  )
}

function OrgRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OrgDashboard />} />
      <Route path="/messages" element={<OrgMessages />} />
      <Route path="/leads" element={<OrgLeadList />} />
      <Route path="/leads/:id" element={<OrgLeadDetail />} />
      <Route path="/orders" element={<OrgOrderList />} />
      <Route path="/orders/create" element={<OrgOrderCreate />} />
      <Route path="/orders/:id" element={<OrgOrderDetail />} />
      <Route path="/products" element={<OrgProductList />} />
      <Route path="/products/edit" element={<OrgProductEdit />} />
      <Route path="/products/edit/:id" element={<OrgProductEdit />} />
      <Route path="/teachers" element={<OrgTeacherList />} />
      <Route path="/teachers/:id" element={<OrgTeacherDetail />} />
      <Route path="/teachers/calendar" element={<OrgScheduleCalendar />} />
      <Route path="/parents" element={<OrgParentList />} />
      <Route path="/parents/:id" element={<OrgParentDetail />} />
      <Route path="/monitor" element={<OrgMonitor />} />
      <Route path="/settings" element={<OrgSettings />} />
    </Routes>
  )
}

function PlatRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PlatDashboard />} />
      <Route path="/orgs" element={<PlatOrgList />} />
      <Route path="/orgs/:id" element={<PlatOrgDetail />} />
      <Route path="/orgs/audit/:id" element={<PlatOrgAudit />} />
      <Route path="/global-orders" element={<PlatGlobalOrders />} />
      <Route path="/global-orders/:id" element={<PlatOrderDetail />} />
      <Route path="/commission" element={<PlatCommission />} />
      <Route path="/settlement" element={<PlatSettlement />} />
      <Route path="/settlement-log" element={<PlatSettlementLog />} />
    </Routes>
  )
}
