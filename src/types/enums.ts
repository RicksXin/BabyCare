/** 成员角色中文映射 */
export const ROLE_LABELS: Record<string, string> = {
  dad: '爸爸',
  mom: '妈妈',
  nanny: '月嫂',
  grandpa: '爷爷',
  grandma: '奶奶',
  maternal_grandpa: '外公',
  maternal_grandma: '外婆',
  other: '其他',
}

/** 记录类型中文映射 */
export const RECORD_TYPE_LABELS: Record<string, string> = {
  feeding: '喂奶',
  diaper: '换尿布',
  sleep: '睡眠',
  health: '身体状况',
  medicine: '用药',
  other: '其他',
}

/** 记录类型图标 */
export const RECORD_TYPE_ICONS: Record<string, string> = {
  feeding: '🍼',
  diaper: '🧷',
  sleep: '😴',
  health: '🌡️',
  medicine: '💊',
  other: '🛁',
}

/** 喂奶方式中文映射 */
export const FEEDING_METHOD_LABELS: Record<string, string> = {
  breast: '母乳',
  formula: '奶粉',
  mixed: '混合',
}

/** 便便颜色选项 */
export const POOP_COLORS = [
  { value: '#8B6914', label: '金黄色（正常）' },
  { value: '#9ACD32', label: '黄绿色' },
  { value: '#228B22', label: '绿色' },
  { value: '#8B4513', label: '棕色' },
  { value: '#2F4F4F', label: '墨绿色（注意）' },
  { value: '#8B0000', label: '红色（就医）' },
  { value: '#F5F5DC', label: '白色（就医）' },
  { value: '#1C1C1C', label: '黑色（注意）' },
]
