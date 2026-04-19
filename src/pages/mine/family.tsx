import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import { familyStore } from '@/stores'
import { ROLE_LABELS } from '@/types/enums'

import './family.scss'

function FamilyPage() {
  const { family, members } = familyStore

  return (
    <View className='family-page'>
      {family ? (
        <>
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
        </>
      ) : (
        <View className='no-family'>
          <Text className='no-family-text'>还没有加入家庭</Text>
          <View className='create-btn'>
            <Text className='create-btn-text'>创建家庭</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default observer(FamilyPage)
