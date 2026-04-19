import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import { reminderStore } from '@/stores'

import './reminders.scss'

function RemindersPage() {
  const { reminders } = reminderStore

  return (
    <View className='reminders-page'>
      <Text className='section-title'>提醒列表</Text>
      {reminders.length === 0 ? (
        <View className='empty-tip'>
          <Text>暂无提醒</Text>
        </View>
      ) : (
        reminders.map(r => (
          <View className='reminder-item' key={r._id}>
            <View className='reminder-info'>
              <Text className='reminder-title'>{r.title}</Text>
              <Text className='reminder-type'>{r.type === 'recurring' ? '重复' : '单次'}</Text>
            </View>
            <View
              className={`toggle ${r.enabled ? 'on' : ''}`}
              onClick={() => reminderStore.toggleReminder(r._id)}
            >
              <View className='toggle-dot' />
            </View>
          </View>
        ))
      )}
    </View>
  )
}

export default observer(RemindersPage)
