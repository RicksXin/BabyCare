/** 格式化时间戳为 HH:mm */
export function formatTime(timestamp: number): string {
  const d = new Date(timestamp)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** 格式化时间戳为 MM-DD HH:mm */
export function formatDateTime(timestamp: number): string {
  const d = new Date(timestamp)
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** 格式化时间戳为 YYYY-MM-DD */
export function formatDate(timestamp: number): string {
  const d = new Date(timestamp)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** 计算距今多久（如 "2小时前"） */
export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}

/** 计算月龄 */
export function getMonthAge(birthday: string): string {
  const birth = new Date(birthday)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  const days = now.getDate() - birth.getDate()
  if (months < 1) {
    const diffDays = Math.floor((now.getTime() - birth.getTime()) / 86400000)
    return `${diffDays}天`
  }
  if (days < 0) {
    return `${months - 1}个月${days + 30}天`
  }
  return `${months}个月${days}天`
}

/** 格式化分钟为 Xh Xm */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}分钟`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}
