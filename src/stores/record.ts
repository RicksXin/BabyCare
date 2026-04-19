import { makeAutoObservable } from 'mobx'
import type { CareRecord, RecordType } from '@/types/models'

class RecordStore {
  records: CareRecord[] = []
  loading = false

  /** 正在进行中的计时（喂奶/睡眠） */
  activeTimer: { type: RecordType; startTime: number } | null = null

  constructor() {
    makeAutoObservable(this)
  }

  /** 今日记录 */
  get todayRecords(): CareRecord[] {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    return this.records.filter(r => r.startTime >= todayStart.getTime())
  }

  /** 今日喂奶次数 */
  get todayFeedingCount(): number {
    return this.todayRecords.filter(r => r.type === 'feeding').length
  }

  /** 今日换尿布次数 */
  get todayDiaperCount(): number {
    return this.todayRecords.filter(r => r.type === 'diaper').length
  }

  /** 今日睡眠总时长（分钟） */
  get todaySleepMinutes(): number {
    return this.todayRecords
      .filter(r => r.type === 'sleep')
      .reduce((sum, r) => sum + ((r.data as any).duration || 0), 0)
  }

  /** 上次喂奶时间 */
  get lastFeedingTime(): number | null {
    const feedings = this.records.filter(r => r.type === 'feeding')
    if (feedings.length === 0) return null
    return Math.max(...feedings.map(r => r.startTime))
  }

  setRecords(records: CareRecord[]) {
    this.records = records.sort((a, b) => b.startTime - a.startTime)
  }

  addRecord(record: CareRecord) {
    this.records.unshift(record)
  }

  startTimer(type: RecordType) {
    this.activeTimer = { type, startTime: Date.now() }
  }

  stopTimer() {
    this.activeTimer = null
  }
}

export const recordStore = new RecordStore()
