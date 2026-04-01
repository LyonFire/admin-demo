// 订单数据
export const orders = [
  { id: 'ORD001', parent: '小明家长', parentId: 1, child: '小明（6岁，自闭症）', product: '影子老师入校陪读5天', teacher: '张老师', teacherId: 1, amount: 3800, discount: 200, paid: 3600, status: '服务中', org: '大米和小米（朝阳店）', orgId: 1, date: '2026-03-24', payMethod: '在线支付', payTime: '2026-03-24 10:20', commission: 0, schedules: [
    { date: '3/25', time: '09:00-17:00', teacher: '张老师', status: '已完成' },
    { date: '3/26', time: '09:00-17:00', teacher: '张老师', status: '服务中' },
    { date: '3/27', time: '09:00-17:00', teacher: '张老师', status: '待开始' },
  ]},
  { id: 'ORD002', parent: '小红家长', parentId: 2, child: '小红（5岁，发育迟缓）', product: '入户干预10次套餐', teacher: '待安排', amount: 8000, discount: 0, paid: 8000, status: '待支付', org: '大米和小米（朝阳店）', orgId: 1, date: '2026-03-24', schedules: [] },
  { id: 'ORD003', parent: '小李家长', parentId: 3, child: '小李（7岁，注意力缺陷）', product: '密集干预5次', teacher: '王老师', teacherId: 3, amount: 5000, discount: 0, paid: 5000, status: '退款中', org: '大米和小米（朝阳店）', orgId: 1, date: '2026-03-23', refund: { reason: '服务质量', desc: '老师迟到两次', amount: 2000 }, schedules: [] },
  { id: 'ORD004', parent: '小王家长', parentId: 4, child: '小王（4岁，自闭症）', product: '远程督导单次', teacher: '赵老师', teacherId: 4, amount: 600, discount: 0, paid: 600, status: '已完成', org: '向日葵康复中心', orgId: 2, date: '2026-03-20', schedules: [] },
]

// 线索数据
export const leads = [
  { id: 1, name: '王女士', phone: '138****1234', source: '平台', status: '新线索', childAge: 6, need: '需要入校影子老师', lastFollow: '-', created: '2026-03-24 10:00', records: [{ time: '2026-03-24 10:00', content: '家长通过平台发起咨询（系统自动）' }] },
  { id: 2, name: '李先生', phone: '139****5678', source: '手动', status: '跟进中', childAge: 5, need: '入户干预', lastFollow: '3/23', created: '2026-03-20', records: [{ time: '2026-03-23 14:00', content: '已电话沟通，家长对入户服务感兴趣' }, { time: '2026-03-20 09:00', content: '线下活动获取联系方式' }] },
  { id: 3, name: '张女士', phone: '136****9012', source: '平台', status: '已成交', childAge: 7, need: '密集干预', lastFollow: '3/20', created: '2026-03-15', records: [] },
  { id: 4, name: '赵先生', phone: '137****3456', source: '手动', status: '已流失', childAge: 4, need: '远程督导', lastFollow: '3/15', created: '2026-03-10', records: [] },
]

// 老师数据
export const teachers = [
  { id: 1, name: '张老师', phone: '138****1234', skill: '入校支持', score: 4.9, status: '在职', exp: 3, hours: { month: 80, total: 520 } },
  { id: 2, name: '李老师', phone: '139****5678', skill: '入户干预', score: 4.7, status: '在职', exp: 2, hours: { month: 45, total: 320 } },
  { id: 3, name: '王老师', phone: '136****9012', skill: '密集干预', score: 4.8, status: '在职', exp: 4, hours: { month: 60, total: 480 } },
  { id: 4, name: '赵老师', phone: '137****3456', skill: '远程督导', score: 4.6, status: '在职', exp: 1, hours: { month: 20, total: 80 } },
]

// 家长数据
export const parents = [
  { id: 1, name: '小明家长', phone: '138****1234', child: '小明（6岁）', orders: 3, coupons: [{ name: '10次课包抵扣', amount: 8000, status: '已使用' }] },
  { id: 2, name: '小红家长', phone: '139****5678', child: '小红（5岁）', orders: 1, coupons: [{ name: '5次课包抵扣', amount: 4000, status: '未使用' }] },
  { id: 3, name: '小李家长', phone: '136****9012', child: '小李（7岁）', orders: 2, coupons: [] },
]

// 产品数据
export const products = [
  { id: 1, name: '影子老师入校陪读5天', type: '影子老师服务', price: 3800, status: '启用' },
  { id: 2, name: '入户干预10次套餐', type: '陪伴式干预', price: 5000, status: '启用' },
  { id: 3, name: '远程督导单次', type: '线上督导', price: 300, status: '停用' },
  { id: 4, name: '密集干预5次', type: '家庭社区密集干预', price: 5000, status: '启用' },
]

// 抵扣券数据
export const coupons = [
  { id: 1, name: '10次课包抵扣', amount: 8000, validity: '永久有效', issued: 15, used: 12 },
  { id: 2, name: '5次课包抵扣', amount: 4000, validity: '180天', issued: 8, used: 5 },
]

// 机构数据
export const orgs = [
  { id: 1, name: '大米和小米（朝阳店）', status: '正常', commission: 0, monthOrders: 85, contact: '张经理', phone: '138****1234', joinDate: '2026-01-15', area: '朝阳区/海淀区/西城区', services: '影子老师、入户干预、密集干预', teachers: 15, parents: 42, gmv: 120000 },
  { id: 2, name: '向日葵康复中心', status: '正常', commission: 12, monthOrders: 43, contact: '李经理', phone: '139****5678', joinDate: '2026-02-01', area: '海淀区/昌平区', services: '影子老师、入户干预', teachers: 8, parents: 25, gmv: 76000 },
  { id: 3, name: '星星之家', status: '审核中', commission: 0, monthOrders: 0, contact: '李女士', phone: '139****5678', area: '海淀区/昌平区', services: '入校支持、入户支持', applyTime: '2026-03-23 14:00' },
]

// 结算数据
export const settlements = [
  { id: 1, month: '2026-03', org: '大米和小米（朝阳店）', orgId: 1, orderAmount: 180000, refund: 2400, commission: 0, orgIncome: 177600, services: 156, status: '待确认' },
  { id: 2, month: '2026-03', org: '向日葵康复中心', orgId: 2, orderAmount: 76000, refund: 0, commission: 9120, orgIncome: 66880, services: 89, status: '已确认' },
  { id: 3, month: '2026-02', org: '大米和小米（朝阳店）', orgId: 1, orderAmount: 165000, refund: 0, commission: 0, orgIncome: 165000, services: 142, status: '已打款', payTime: '2026-03-05', payAmount: 165000 },
  { id: 4, month: '2026-02', org: '向日葵康复中心', orgId: 2, orderAmount: 72000, refund: 0, commission: 8640, orgIncome: 63360, services: 78, status: '已打款', payTime: '2026-03-05', payAmount: 63360 },
]

// 服务监管数据
export const monitorServices = [
  { id: 1, time: '09:00', teacher: '张老师', parent: '小明', type: '影子老师入校', status: '已签到', detail: '签到09:05 家长已确认' },
  { id: 2, time: '09:00', teacher: '李老师', parent: '小红', type: '入户干预', status: '待签到', detail: '' },
  { id: 3, time: '14:00', teacher: '王老师', parent: '小李', type: '密集干预', status: '异常', detail: '超时30分钟未签到' },
  { id: 4, time: '09:00', teacher: '赵老师', parent: '小王', type: '入户干预', status: '已完成', detail: '签到09:00 签退12:05 家长已确认' },
]

// 消息数据
export const conversations = [
  { id: 1, name: '小明家长', avatar: 'M', type: 'parent', last: '好的，我考虑一下', time: '10:24', unread: 2 },
  { id: 2, name: '小红家长', avatar: 'H', type: 'parent', last: '谢谢，已经支付了', time: '昨天', unread: 0 },
  { id: 3, name: '张老师', avatar: 'Z', type: 'teacher', last: '收到，明天准时到', time: '昨天', unread: 0 },
  { id: 4, name: '系统消息', avatar: 'S', type: 'system', last: '家长已支付订单 ¥3800', time: '昨天', unread: 1 },
]
