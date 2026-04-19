import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import { useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { familyStore, recordStore } from '@/stores'
import { formatDuration, timeAgo, getMonthAge } from '@/utils/date'
import { RECORD_TYPE_ICONS, RECORD_TYPE_LABELS } from '@/types/enums'

import './index.scss'

function Index() {
  const { currentBaby } = familyStore
  const { todayFeedingCount, todayDiaperCount, todaySleepMinutes, todayRecords, lastFeedingTime } = recordStore

  useDidShow(() => {
    // TODO: 从云端拉取今日记录
  })

  const navigateTo = (url: string) => {
    Taro.navigateTo({ url })
  }

  return (
    <View className='index-page'>
      {/* 宝宝信息头部 */}
      <View className='baby-header'>
        <View className='baby-avatar'>👶</View>
        <View className='baby-info'>
          <Text className='baby-name'>{currentBaby?.name || '添加宝宝'}</Text>
          {currentBaby && (
            <Text className='baby-age'>{getMonthAge(currentBaby.birthday)}</Text>
          )}
        </View>
      </View>

      {/* 今日概览 */}
      <View className='summary-cards'>
        <View className='summary-card'>
          <Text className='card-icon'>🍼</Text>
          <Text className='card-value'>{todayFeedingCount}</Text>
          <Text className='card-label'>喂奶</Text>
        </View>
        <View className='summary-card'>
          <Text className='card-icon'>🧷</Text>
          <Text className='card-value'>{todayDiaperCount}</Text>
          <Text className='card-label'>换尿布</Text>
        </View>
        <View className='summary-card'>
          <Text className='card-icon'>😴</Text>
          <Text className='card-value'>{formatDuration(todaySleepMinutes)}</Text>
          <Text className='card-label'>睡眠</Text>
        </View>
      </View>

      {/* 上次喂奶提示 */}
      {lastFeedingTime && (
        <View className='last-feeding'>
          <Text>🍼 上次喂奶：{timeAgo(lastFeedingTime)}</Text>
        </View>
      )}

      {/* 快捷操作 */}
      <View className='quick-actions'>
        <View className='action-btn feeding' onClick={() => navigateTo('/pages/record/feeding')}>
          <Text className='action-icon'>🍼</Text>
          <Text className='action-text'>喂奶</Text>
        </View>
        <View className='action-btn diaper' onClick={() => navigateTo('/pages/record/diaper')}>
          <Text className='action-icon'>🧷</Text>
          <Text className='action-text'>换尿布</Text>
        </View>
        <View className='action-btn sleep' onClick={() => navigateTo('/pages/record/sleep')}>
          <Text className='action-icon'>😴</Text>
          <Text className='action-text'>睡眠</Text>
        </View>
      </View>

      {/* 今日时间线 */}
      <View className='timeline-section'>
        <Text className='section-title'>今日记录</Text>
        {todayRecords.length === 0 ? (
          <View className='empty-tip'>
            <Text>还没有记录，点击上方按钮开始记录吧~</Text>
          </View>
        ) : (
          todayRecords.map(record => (
            <View className='timeline-item' key={record._id}>
              <Text className='timeline-icon'>{RECORD_TYPE_ICONS[record.type]}</Text>
              <View className='timeline-content'>
                <Text className='timeline-type'>{RECORD_TYPE_LABELS[record.type]}</Text>
                <Text className='timeline-time'>{timeAgo(record.startTime)}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  )
}

export default observer(Index)
