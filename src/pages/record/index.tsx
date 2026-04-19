import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { recordStore } from '@/stores'
import { RECORD_TYPE_ICONS, RECORD_TYPE_LABELS } from '@/types/enums'
import { timeAgo } from '@/utils/date'

import './index.scss'

const RECORD_TYPES = [
  { type: 'feeding', icon: '🍼', label: '喂奶', url: '/pages/record/feeding' },
  { type: 'diaper', icon: '🧷', label: '换尿布', url: '/pages/record/diaper' },
  { type: 'sleep', icon: '😴', label: '睡眠', url: '/pages/record/sleep' },
  { type: 'health', icon: '🌡️', label: '身体状况', url: '/pages/record/health' },
]

function RecordIndex() {
  const { records } = recordStore

  return (
    <View className='record-page'>
      {/* 记录类型入口 */}
      <View className='type-grid'>
        {RECORD_TYPES.map(item => (
          <View
            className='type-item'
            key={item.type}
            onClick={() => Taro.navigateTo({ url: item.url })}
          >
            <Text className='type-icon'>{item.icon}</Text>
            <Text className='type-label'>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* 近期记录列表 */}
      <View className='record-list'>
        <Text className='section-title'>近期记录</Text>
        {records.length === 0 ? (
          <View className='empty-tip'>
            <Text>暂无记录</Text>
          </View>
        ) : (
          records.slice(0, 20).map(record => (
            <View className='record-item' key={record._id}>
              <Text className='record-icon'>{RECORD_TYPE_ICONS[record.type]}</Text>
              <View className='record-info'>
                <Text className='record-type'>{RECORD_TYPE_LABELS[record.type]}</Text>
                {record.recorderName && (
                  <Text className='record-by'>{record.recorderName}</Text>
                )}
              </View>
              <Text className='record-time'>{timeAgo(record.startTime)}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  )
}

export default observer(RecordIndex)
