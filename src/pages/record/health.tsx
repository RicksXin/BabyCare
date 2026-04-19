import { View, Text, Input } from '@tarojs/components'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { recordStore, familyStore, userStore } from '@/stores'
import type { HealthData, CareRecord } from '@/types/models'

import './health.scss'

function HealthPage() {
  const [temperature, setTemperature] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [note, setNote] = useState('')

  const handleSave = async () => {
    const data: HealthData = {
      temperature: temperature ? parseFloat(temperature) : undefined,
      weight: weight ? parseFloat(weight) * 1000 : undefined, // kg → g
      height: height ? parseFloat(height) : undefined,
    }

    if (!data.temperature && !data.weight && !data.height) {
      Taro.showToast({ title: '请至少填写一项', icon: 'none' })
      return
    }

    const record: CareRecord = {
      _id: Date.now().toString(),
      babyId: familyStore.currentBaby?._id || '',
      familyId: familyStore.family?._id || '',
      recorderId: userStore.userInfo?._id || '',
      recorderName: userStore.userInfo?.nickname,
      type: 'health',
      startTime: Date.now(),
      data,
      note: note || undefined,
      createdAt: Date.now(),
    }

    recordStore.addRecord(record)
    Taro.showToast({ title: '记录成功', icon: 'success' })
    setTimeout(() => Taro.navigateBack(), 1000)
  }

  return (
    <View className='health-page'>
      <View className='form-section'>
        <Text className='form-label'>🌡️ 体温 (℃)</Text>
        <Input
          className='form-input'
          type='digit'
          placeholder='例如 36.5'
          value={temperature}
          onInput={e => setTemperature(e.detail.value)}
        />
      </View>

      <View className='form-section'>
        <Text className='form-label'>⚖️ 体重 (kg)</Text>
        <Input
          className='form-input'
          type='digit'
          placeholder='例如 3.5'
          value={weight}
          onInput={e => setWeight(e.detail.value)}
        />
      </View>

      <View className='form-section'>
        <Text className='form-label'>📏 身高 (cm)</Text>
        <Input
          className='form-input'
          type='digit'
          placeholder='例如 50'
          value={height}
          onInput={e => setHeight(e.detail.value)}
        />
      </View>

      <View className='form-section'>
        <Text className='form-label'>📝 备注</Text>
        <Input
          className='form-input'
          placeholder='可选'
          value={note}
          onInput={e => setNote(e.detail.value)}
        />
      </View>

      <View className='save-btn' onClick={handleSave}>
        <Text className='save-btn-text'>保存记录</Text>
      </View>
    </View>
  )
}

export default observer(HealthPage)
