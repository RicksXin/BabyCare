/** 家庭 */
export interface Family {
  _id: string
  name: string
  inviteCode: string
  creatorId: string
  createdAt: number
}

/** 家庭成员角色 */
export type MemberRole = 'dad' | 'mom' | 'nanny' | 'grandpa' | 'grandma' | 'maternal_grandpa' | 'maternal_grandma' | 'other'

/** 家庭成员 */
export interface FamilyMember {
  _id: string
  familyId: string
  openId: string
  nickname: string
  avatar: string
  role: MemberRole
  isAdmin: boolean
  joinedAt: number
}

/** 宝宝档案 */
export interface Baby {
  _id: string
  familyId: string
  name: string
  gender: 'male' | 'female'
  birthday: string // YYYY-MM-DD
  birthWeight?: number // 克
  birthHeight?: number // 厘米
  avatar?: string
  createdAt: number
}

/** 记录类型 */
export type RecordType = 'feeding' | 'diaper' | 'sleep' | 'health' | 'medicine' | 'other'

/** 喂奶数据 */
export interface FeedingData {
  method: 'breast' | 'formula' | 'mixed'
  amount?: number // ml
  duration?: number // 分钟
  side?: 'left' | 'right' | 'both'
}

/** 换尿布数据 */
export interface DiaperData {
  content: 'pee' | 'poop' | 'both'
  poopColor?: string
  poopTexture?: string
  hasRash: boolean
}

/** 睡眠数据 */
export interface SleepData {
  duration: number // 分钟
  quality?: 'good' | 'normal' | 'poor'
}

/** 身体状况数据 */
export interface HealthData {
  temperature?: number
  weight?: number // 克
  height?: number // 厘米
  headCircumference?: number
  jaundice?: number
}

/** 用药数据 */
export interface MedicineData {
  name: string
  dosage: string
}

/** 其他记录数据 */
export interface OtherData {
  category: 'bath' | 'massage' | 'tummytime' | 'outdoor' | 'custom'
  label?: string
}

/** 照护记录 */
export interface CareRecord {
  _id: string
  babyId: string
  familyId: string
  recorderId: string
  recorderName?: string
  type: RecordType
  startTime: number
  endTime?: number
  data: FeedingData | DiaperData | SleepData | HealthData | MedicineData | OtherData
  note?: string
  createdAt: number
}

/** 提醒 */
export interface Reminder {
  _id: string
  babyId: string
  familyId: string
  creatorId: string
  type: 'once' | 'recurring'
  title: string
  triggerTime: number
  interval?: number // 分钟
  targetMembers: string[]
  enabled: boolean
  relatedRecordType?: RecordType
}

/** AI 识图记录 */
export interface AIAnalysis {
  _id: string
  babyId: string
  imageUrl: string
  category: 'poop' | 'skin' | 'food'
  result: string
  createdAt: number
}

/** 用户信息 */
export interface UserInfo {
  _id: string
  openId: string
  nickname: string
  avatar: string
  familyId?: string
  createdAt: number
}
