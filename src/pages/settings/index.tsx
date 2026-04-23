import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { userStore, familyStore } from '@/stores'

import './index.scss'

const menuItems = [
  { icon: '👶', label: '宝宝档案', url: '/pages/mine/baby-profile' },
  { icon: '👨‍👩‍👧', label: '家庭管理', url: '/pages/mine/family' },
  { icon: '⏰', label: '提醒管理', url: '/pages/mine/reminders' },
]

function SettingsPage() {
  const { userInfo, isLoggedIn } = userStore
  const { family, currentBaby } = familyStore

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
      <View className='user-header'>
        <View className='user-avatar'>
          <Text className='avatar-emoji'>{isLoggedIn ? '😊' : '👤'}</Text>
        </View>
        <View className='user-info'>
          <Text className='user-name'>{userInfo?.nickname || '未登录'}</Text>
          {family && <Text className='family-name'>{family.name}</Text>}
        </View>
        {!isLoggedIn && (
          <View className='login-btn' onClick={() => Taro.navigateTo({ url: '/pages/auth/login' })}>
            <Text className='login-btn-text'>登录</Text>
          </View>
        )}
      </View>

      {currentBaby && (
        <View className='baby-card'>
          <Text className='baby-emoji'>👶</Text>
          <View className='baby-detail'>
            <Text className='baby-name'>{currentBaby.name}</Text>
            <Text className='baby-birthday'>{currentBaby.birthday}</Text>
          </View>
        </View>
      )}

      <View className='menu-list'>
        {menuItems.map(item => (
          <View
            className='menu-item'
            key={item.label}
            onClick={() => Taro.navigateTo({ url: item.url })}
          >
            <Text className='menu-icon'>{item.icon}</Text>
            <Text className='menu-label'>{item.label}</Text>
            <Text className='menu-arrow'>›</Text>
          </View>
        ))}
      </View>

      <View className='menu-list'>
        <View className='menu-item'>
          <Text className='menu-icon'>ℹ️</Text>
          <Text className='menu-label'>关于我们</Text>
          <Text className='menu-arrow'>›</Text>
        </View>
        <View className='menu-item'>
          <Text className='menu-icon'>🔒</Text>
          <Text className='menu-label'>隐私政策</Text>
          <Text className='menu-arrow'>›</Text>
        </View>
        <View className='menu-item'>
          <Text className='menu-icon'>📄</Text>
          <Text className='menu-label'>用户协议</Text>
          <Text className='menu-arrow'>›</Text>
        </View>
      </View>

      {isLoggedIn && (
        <View className='logout-btn' onClick={handleLogout}>
          <Text className='logout-text'>退出登录</Text>
        </View>
      )}

      <Text className='version'>v1.0.0</Text>
    </View>
  )
}

export default observer(SettingsPage)