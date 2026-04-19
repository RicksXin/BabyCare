import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { userStore, familyStore } from '@/stores'

import './settings.scss'

export default function SettingsPage() {
  const handleLogout = () => {
    Taro.showModal({
      title: '确认退出',
      content: '退出登录后本地数据将被清除',
      success: (res) => {
        if (res.confirm) {
          userStore.logout()
          familyStore.reset()
          Taro.reLaunch({ url: '/pages/index/index' })
        }
      },
    })
  }

  return (
    <View className='settings-page'>
      <View className='menu-list'>
        <View className='menu-item'>
          <Text className='menu-label'>关于我们</Text>
          <Text className='menu-arrow'>›</Text>
        </View>
        <View className='menu-item'>
          <Text className='menu-label'>隐私政策</Text>
          <Text className='menu-arrow'>›</Text>
        </View>
        <View className='menu-item'>
          <Text className='menu-label'>用户协议</Text>
          <Text className='menu-arrow'>›</Text>
        </View>
      </View>

      <View className='logout-btn' onClick={handleLogout}>
        <Text className='logout-text'>退出登录</Text>
      </View>

      <Text className='version'>v1.0.0</Text>
    </View>
  )
}
