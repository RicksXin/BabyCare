import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { userStore, familyStore } from '@/stores'

import './index.scss'

function MineIndex() {
  const { userInfo, isLoggedIn } = userStore
  const { family, currentBaby } = familyStore

  const menuItems = [
    { icon: '👶', label: '宝宝档案', url: '/pages/mine/baby-profile' },
    { icon: '👨‍👩‍👧', label: '家庭管理', url: '/pages/mine/family' },
    { icon: '⏰', label: '提醒管理', url: '/pages/mine/reminders' },
    { icon: '⚙️', label: '设置', url: '/pages/mine/settings' },
  ]

  return (
    <View className='mine-page'>
      {/* 用户信息 */}
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

      {/* 宝宝卡片 */}
      {currentBaby && (
        <View className='baby-card'>
          <Text className='baby-emoji'>👶</Text>
          <View className='baby-detail'>
            <Text className='baby-name'>{currentBaby.name}</Text>
            <Text className='baby-birthday'>{currentBaby.birthday}</Text>
          </View>
        </View>
      )}

      {/* 菜单列表 */}
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
    </View>
  )
}

export default observer(MineIndex)
