import { View, Text } from '@tarojs/components'
import { observer } from 'mobx-react-lite'
import { recordStore } from '@/stores'
import { formatDuration } from '@/utils/date'

import './index.scss'

function StatsIndex() {
  const { todayFeedingCount, todayDiaperCount, todaySleepMinutes, records } = recordStore

  // 近 7 天统计
  const last7Days = (() => {
    const days: { date: string; feeding: number; diaper: number; sleepMin: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      d.setHours(0, 0, 0, 0)
      const nextD = new Date(d)
      nextD.setDate(nextD.getDate() + 1)
      const dayRecords = records.filter(r => r.startTime >= d.getTime() && r.startTime < nextD.getTime())
      days.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        feeding: dayRecords.filter(r => r.type === 'feeding').length,
        diaper: dayRecords.filter(r => r.type === 'diaper').length,
        sleepMin: dayRecords.filter(r => r.type === 'sleep').reduce((s, r) => s + ((r.data as any).duration || 0), 0),
      })
    }
    return days
  })()

  const maxFeeding = Math.max(...last7Days.map(d => d.feeding), 1)
  const maxSleep = Math.max(...last7Days.map(d => d.sleepMin), 1)

  return (
    <View className='stats-page'>
      {/* 今日汇总 */}
      <View className='today-summary'>
        <Text className='section-title'>今日汇总</Text>
        <View className='summary-row'>
          <View className='summary-item'>
            <Text className='item-value'>{todayFeedingCount}</Text>
            <Text className='item-label'>🍼 喂奶</Text>
          </View>
          <View className='summary-item'>
            <Text className='item-value'>{todayDiaperCount}</Text>
            <Text className='item-label'>🧷 换尿布</Text>
          </View>
          <View className='summary-item'>
            <Text className='item-value'>{formatDuration(todaySleepMinutes)}</Text>
            <Text className='item-label'>😴 睡眠</Text>
          </View>
        </View>
      </View>

      {/* 近 7 天喂奶趋势 */}
      <View className='chart-section'>
        <Text className='section-title'>近 7 天喂奶次数</Text>
        <View className='bar-chart'>
          {last7Days.map(day => (
            <View className='bar-col' key={day.date}>
              <View className='bar-wrapper'>
                <View
                  className='bar'
                  style={{ height: `${(day.feeding / maxFeeding) * 100}%` }}
                />
              </View>
              <Text className='bar-value'>{day.feeding}</Text>
              <Text className='bar-label'>{day.date}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 近 7 天睡眠时长 */}
      <View className='chart-section'>
        <Text className='section-title'>近 7 天睡眠时长</Text>
        <View className='bar-chart'>
          {last7Days.map(day => (
            <View className='bar-col' key={day.date}>
              <View className='bar-wrapper'>
                <View
                  className='bar sleep-bar'
                  style={{ height: `${(day.sleepMin / maxSleep) * 100}%` }}
                />
              </View>
              <Text className='bar-value'>{day.sleepMin > 0 ? formatDuration(day.sleepMin) : '-'}</Text>
              <Text className='bar-label'>{day.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default observer(StatsIndex)
