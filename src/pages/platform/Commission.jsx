import { useState } from 'react'
import { Card, Table, InputNumber, Button, Space, Modal, message, Typography } from 'antd'
import { orgs } from '../../mock/data'

const { Paragraph, Title } = Typography

export default function PlatCommission() {
  const [defaultRate, setDefaultRate] = useState(10)
  const [editOrg, setEditOrg] = useState(null)
  const [editRate, setEditRate] = useState(0)

  const columns = [
    { title: '机构名称', dataIndex: 'name' },
    { title: '当前比例', dataIndex: 'commission', render: v => `${v}%` },
    { title: '操作', render: (_, r) => r.status === '正常' && (
      <Button type="link" onClick={() => { setEditOrg(r); setEditRate(r.commission) }}>修改</Button>
    )},
  ]

  return (
    <div>
      <Title level={4}>抽成规则配置</Title>
      <Card title="默认抽成比例" style={{ marginBottom: 16 }}>
        <Space>
          <span>新入驻机构默认抽成：</span>
          <InputNumber min={0} max={100} value={defaultRate} onChange={setDefaultRate} addonAfter="%" />
          <Button type="primary" onClick={() => message.success('已保存')}>保存</Button>
        </Space>
      </Card>

      <Card title="各机构抽成配置" style={{ marginBottom: 16 }}>
        <Table dataSource={orgs.filter(o => o.status === '正常')} columns={columns} rowKey="id" pagination={false} />
      </Card>

      <Card>
        <Paragraph type="secondary">说明：</Paragraph>
        <Paragraph type="secondary">· 抽成按订单在线支付金额的百分比计算</Paragraph>
        <Paragraph type="secondary">· 抵扣券部分同样按百分比计算，金额为0则抽成为0</Paragraph>
        <Paragraph type="secondary">· 混合支付按各部分分别计算</Paragraph>
        <Paragraph type="secondary">· 退款订单从结算池扣除</Paragraph>
      </Card>

      <Modal title={`修改抽成 · ${editOrg?.name}`} open={!!editOrg} onCancel={() => setEditOrg(null)}
        onOk={() => { message.success('已保存'); setEditOrg(null) }}>
        <Space>
          <span>抽成比例：</span>
          <InputNumber min={0} max={100} value={editRate} onChange={setEditRate} addonAfter="%" />
        </Space>
      </Modal>
    </div>
  )
}
