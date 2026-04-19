import { makeAutoObservable, runInAction } from 'mobx'
import Taro from '@tarojs/taro'
import type { UserInfo } from '@/types/models'
import { setStorage, getStorage, removeStorage, KEYS } from '@/utils/storage'

class UserStore {
  userInfo: UserInfo | null = null
  isLoggedIn = false
  loading = false

  constructor() {
    makeAutoObservable(this)
    this.loadFromStorage()
  }

  private loadFromStorage() {
    const cached = getStorage<UserInfo>(KEYS.USER_INFO)
    if (cached) {
      this.userInfo = cached
      this.isLoggedIn = true
    }
  }

  /** 微信登录 */
  async login() {
    this.loading = true
    try {
      const { code } = await Taro.login()
      // TODO: 调用云函数完成登录
      console.log('login code:', code)
      runInAction(() => {
        this.isLoggedIn = true
        this.loading = false
      })
    } catch (err) {
      runInAction(() => {
        this.loading = false
      })
      throw err
    }
  }

  setUserInfo(info: UserInfo) {
    this.userInfo = info
    this.isLoggedIn = true
    setStorage(KEYS.USER_INFO, info)
  }

  logout() {
    this.userInfo = null
    this.isLoggedIn = false
    removeStorage(KEYS.USER_INFO)
    removeStorage(KEYS.FAMILY_ID)
    removeStorage(KEYS.CURRENT_BABY)
  }
}

export const userStore = new UserStore()
