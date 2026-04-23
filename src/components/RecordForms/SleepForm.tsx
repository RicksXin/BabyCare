import { View, Text } from '@tarojs/components'
import { useState, useRef, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { recordStore, familyStore, userStore } from '@/stores'
import type { SleepData, CareRecord } from '@/types/models'

import './forms.scss'

interface SleepFormProps {
  onSuccess?: () => void
}

function SleepForm({ onSuccess }: SleepFormProps) {
  const [timing, setTiming] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [quality, setQuality] = useState<SleepData['quality']>('normal')
  const timerRef = useRef<any>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startTimer = useCallback(() => {
    setTiming(true)
    setSeconds(0)
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    setTiming(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const formatTimer = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`
  }

  const handleSave = async () => {
    if (seconds < 60) {
      Taro.showToast({ title: '睡眠时间太短', icon: 'none' })
      return
    }

    const data: SleepData = {
      duration: Math.ceil(seconds / 60),
      quality,
    }

    const record: CareRecord = {
      _id: Date.now().toString(),
      babyId: familyStore.currentBaby?._id || '',
      familyId: familyStore.family?._id || '',
      recorderId: userStore.userInfo?._id || '',
      recorderName: userStore.userInfo?.nickname,
      type: 'sleep',
      startTime: startTimeRef.current || Date.now() - seconds * 1000,
      endTime: Date.now(),
      data,
      createdAt: Date.now(),
    }

    recordStore.addRecord(record)
    Taro.showToast({ title: '记录成功', icon: 'success' })
    setTimeout(() => onSuccess?.(), 1000)
  }

  return (
    <View className='record-form sleep-form'>
      <View className='timer-section sleep-timer'>
        <Text className='timer-emoji'>{timing ? '💤' : '😴'}</Text>
        <Text className='timer-display'>{formatTimer(seconds)}</Text>
        <Text className='timer-hint'>{timing ? '宝宝正在睡觉...' : '点击开始记录睡眠'}</Text>
        <View className='timer-btn sleep-btn' onClick={timing ? stopTimer : startTimer}>
          <Text className='timer-btn-text'>{timing ? '醒了' : '入睡'}</Text>
        </View>
      </View>

      {!timing && seconds > 0 && (
        <View className='form-section'>
          <Text className='form-label'>睡眠质量</Text>
          <View className='option-group'>
            {([['good', '😊 很好'], ['normal', '😐 一般'], ['poor', '😫 不好']] as const).map(([val, label]) => (
              <View
                key={val}
                className={`option-item ${quality === val ? 'active' : ''}`}
                onClick={() => setQuality(val)}
              >
                <Text>{label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {!timing && seconds > 0 && (
        <View className='save-btn' onClick={handleSave}>
          <Text className='save-btn-text'>保存记录</Text>
        </View>
      )}
    </View>
  )
}

export default observer(SleepForm)
