import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { recordStore, familyStore, userStore } from '@/stores'
import type { DiaperData, CareRecord } from '@/types/models'
import { POOP_COLORS } from '@/types/enums'

import './diaper.scss'

function DiaperPage() {
  const [content, setContent] = useState<DiaperData['content']>('pee')
  const [poopColor, setPoopColor] = useState(POOP_COLORS[0].value)
  const [hasRash, setHasRash] = useState(false)

  const handleSave = async () => {
    const data: DiaperData = {
      content,
      poopColor: content !== 'pee' ? poopColor : undefined,
      hasRash,
    }

    const record: CareRecord = {
      _id: Date.now().toString(),
      babyId: familyStore.currentBaby?._id || '',
      familyId: familyStore.family?._id || '',
      recorderId: userStore.userInfo?._id || '',
      recorderName: userStore.userInfo?.nickname,
      type: 'diaper',
      startTime: Date.now(),
      data,
      createdAt: Date.now(),
    }

    recordStore.addRecord(record)
    Taro.showToast({ title: '记录成功', icon: 'success' })
    setTimeout(() => Taro.navigateBack(), 1000)
  }

  return (
    <View className='diaper-page'>
      {/* 尿布类型 */}
      <View className='form-section'>
        <Text className='form-label'>尿布内容</Text>
        <View className='option-group'>
          {([['pee', '尿尿'], ['poop', '便便'], ['both', '都有']] as const).map(([val, label]) => (
            <View
              key={val}
              className={`option-item ${content === val ? 'active' : ''}`}
              onClick={() => setContent(val)}
            >
              <Text>{label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 便便颜色 */}
      {content !== 'pee' && (
        <View className='form-section'>
          <Text className='form-label'>便便颜色</Text>
          <View className='color-grid'>
            {POOP_COLORS.map(c => (
              <View
                key={c.value}
                className={`color-item ${poopColor === c.value ? 'active' : ''}`}
                onClick={() => setPoopColor(c.value)}
              >
                <View className='color-dot' style={{ backgroundColor: c.value }} />
                <Text className='color-label'>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 红屁屁 */}
      <View className='form-section'>
        <View className='switch-row'>
          <Text className='form-label'>有红屁屁</Text>
          <View
            className={`toggle ${hasRash ? 'on' : ''}`}
            onClick={() => setHasRash(!hasRash)}
          >
            <View className='toggle-dot' />
          </View>
        </View>
      </View>

      <View className='save-btn' onClick={handleSave}>
        <Text className='save-btn-text'>保存记录</Text>
      </View>
    </View>
  )
}

export default observer(DiaperPage)
