import Taro from '@tarojs/taro'

const KEYS = {
  USER_INFO: 'babycare_user',
  CURRENT_BABY: 'babycare_current_baby',
  FAMILY_ID: 'babycare_family_id',
} as const

/** 存储数据 */
export function setStorage<T>(key: string, data: T) {
  Taro.setStorageSync(key, JSON.stringify(data))
}

/** 读取数据 */
export function getStorage<T>(key: string): T | null {
  const raw = Taro.getStorageSync(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

/** 删除数据 */
export function removeStorage(key: string) {
  Taro.removeStorageSync(key)
}

export { KEYS }
