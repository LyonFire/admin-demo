import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Button, InputNumber, Space, Tag, Modal, Statistic, Row, Col, message } from 'antd'
import { orgs } from '../../mock/data'

export default function PlatOrgDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const org = orgs.find(o => o.id === Number(id))
  const [commission, setCommission] = useState(org?.commission ?? 10)

  if (!org) return <div>机构不存在</div>

  const handleDisable = () => {
    Modal.confirm({ title: '确认禁用', content: `确定禁用「${org.name}」？禁用后机构无法登录，家长端不展示。`, onOk: () => message.success('已禁用') })
  }

  return (
    <div>
      <Button type="link" onClick={() => nav('/orgs')} style={{ padding: 0, marginBottom: 16 }}>← 返回机构列表</Button>
      <Card title={`机构详情 · ${org.name}`} style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="机构名称">{org.name}</Descriptions.Item>
          <Descriptions.Item label="状态"><Tag color={org.status === '正常' ? 'green' : 'red'}>{org.status}</Tag></Descriptions.Item>
          <Descriptions.Item label="联系人">{org.contact}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{org.phone}</Descriptions.Item>
          <Descriptions.Item label="入驻时间">{org.joinDate}</Descriptions.Item>
          <Descriptions.Item label="服务范围">{org.services}</Descriptions.Item>
          <Descriptions.Item label="服务区域">{org.area}</Descriptions.Item>
        </Descriptions>
        {org.status === '正常' && <Button danger style={{ marginTop: 16 }} onClick={handleDisable}>禁用机构</Button>}
      </Card>

      <Card title="抽成配置" style={{ marginBottom: 16 }}>
        <Space>
          <span>当前抽成比例：</span>
          <InputNumber min={0} max={100} value={commission} onChange={setCommission} addonAfter="%" />
          <Button type="primary" onClick={() => message.success('已保存')}>保存</Button>
        </Space>
      </Card>

      <Card title="运营数据">
        <Row gutter={16}>
          <Col span={6}><Statistic title="老师数" value={org.teachers || 0} /></Col>
          <Col span={6}><Statistic title="家长数" value={org.parents || 0} /></Col>
          <Col span={6}><Statistic title="本月订单" value={org.monthOrders} suffix="单" /></Col>
          <Col span={6}><Statistic title="本月GMV" value={org.gmv || 0} prefix="¥" /></Col>
        </Row>
      </Card>

      <Card title="资质材料" style={{ marginTop: 16 }}>
        <Space size="large">
          <div style={{ width: 200, height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9', cursor: 'pointer' }}>营业执照（点击查看）</div>
          <div style={{ width: 200, height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9', cursor: 'pointer' }}>资质证明（点击查看）</div>
        </Space>
      </Card>
    </div>
  )
}
