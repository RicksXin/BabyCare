import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { familyStore, userStore } from '@/stores'
import { ROLE_LABELS } from '@/types/enums'

import './family.scss'

function FamilyPage() {
  const { family, members } = familyStore

  const handleCreateFamily = () => {
    const userId = userStore.userInfo?._id || ''
    const newFamily = {
      _id: Date.now().toString(),
      name: (userStore.userInfo?.nickname || '我') + '的家庭',
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      creatorId: userId,
      createdAt: Date.now(),
    }
    familyStore.setFamily(newFamily)

    const creator = {
      _id: Date.now().toString() + '_m',
      familyId: newFamily._id,
      openId: userStore.userInfo?.openId || '',
      nickname: userStore.userInfo?.nickname || '我',
      avatar: userStore.userInfo?.avatar || '',
      role: 'mom' as const,
      isAdmin: true,
      joinedAt: Date.now(),
    }
    familyStore.setMembers([creator])

    Taro.showToast({ title: '创建成功', icon: 'success' })
  }

  return (
    <View className='family-page'>
      {family ? (
        <View>
          <View className='family-card'>
            <Text className='family-name'>{family.name}</Text>
            <View className='invite-section'>
              <Text className='invite-label'>邀请码</Text>
              <Text className='invite-code'>{family.inviteCode}</Text>
            </View>
          </View>

          <View className='member-section'>
            <Text className='section-title'>家庭成员 ({members.length})</Text>
            {members.map(m => (
              <View className='member-item' key={m._id}>
                <Text className='member-avatar'>😊</Text>
                <View className='member-info'>
                  <Text className='member-name'>{m.nickname}</Text>
                  <Text className='member-role'>{ROLE_LABELS[m.role] || m.role}</Text>
                </View>
                {m.isAdmin && <Text className='admin-badge'>管理员</Text>}
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View className='no-family'>
          <Text className='no-family-text'>还没有加入家庭</Text>
          <View className='create-btn' onClick={handleCreateFamily}>
            <Text className='create-btn-text'>创建家庭</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default observer(FamilyPage)
