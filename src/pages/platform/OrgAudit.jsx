import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Button, InputNumber, Space, Modal, Input, message } from 'antd'
import { orgs } from '../../mock/data'

export default function PlatOrgAudit() {
  const { id } = useParams()
  const nav = useNavigate()
  const org = orgs.find(o => o.id === Number(id))
  const [commission, setCommission] = useState(10)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectOpen, setRejectOpen] = useState(false)

  if (!org) return <div>机构不存在</div>

  const handleApprove = () => {
    Modal.confirm({ title: '审核通过', content: `确认通过「${org.name}」的入驻申请？抽成比例：${commission}%`, onOk: () => { message.success('已通过，已短信通知机构'); nav('/orgs') } })
  }

  return (
    <div>
      <Button type="link" onClick={() => nav('/orgs')} style={{ padding: 0, marginBottom: 16 }}>← 返回机构列表</Button>
      <Card title={`入驻审核 · ${org.name}`} style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="机构名称">{org.name}</Descriptions.Item>
          <Descriptions.Item label="联系人">{org.contact}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{org.phone}</Descriptions.Item>
          <Descriptions.Item label="服务范围">{org.services}</Descriptions.Item>
          <Descriptions.Item label="服务区域">{org.area}</Descriptions.Item>
          <Descriptions.Item label="申请时间">{org.applyTime}</Descriptions.Item>
          <Descriptions.Item label="机构介绍" span={2}>专注自闭症儿童康复，拥有多年行业经验</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="资质材料" style={{ marginBottom: 16 }}>
        <Space size="large">
          <div style={{ width: 200, height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9' }}>营业执照（示例）</div>
          <div style={{ width: 200, height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9' }}>资质证明（示例）</div>
        </Space>
      </Card>

      <Card title="审核操作">
        <Space direction="vertical" size="middle">
          <Space>
            <span>抽成比例（审核通过时配置）：</span>
            <InputNumber min={0} max={100} value={commission} onChange={setCommission} addonAfter="%" />
          </Space>
          <Space>
            <Button type="primary" onClick={handleApprove}>审核通过</Button>
            <Button danger onClick={() => setRejectOpen(true)}>审核拒绝</Button>
          </Space>
        </Space>
      </Card>

      <Modal title="拒绝原因" open={rejectOpen} onCancel={() => setRejectOpen(false)} onOk={() => { message.success('已拒绝，已短信通知机构'); nav('/orgs') }}>
        <Input.TextArea rows={4} value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="请输入拒绝原因" />
      </Modal>
    </div>
  )
}
