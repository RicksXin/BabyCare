import { View, Text } from '@tarojs/components'
import { useState, useRef, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Taro from '@tarojs/taro'
import { recordStore, familyStore, userStore } from '@/stores'
import type { FeedingData, CareRecord } from '@/types/models'
import { FEEDING_METHOD_LABELS } from '@/types/enums'

import './forms.scss'

interface FeedingFormProps {
  onSuccess?: () => void
}

function FeedingForm({ onSuccess }: FeedingFormProps) {
  const [method, setMethod] = useState<FeedingData['method']>('breast')
  const [side, setSide] = useState<FeedingData['side']>('left')
  const [amount, setAmount] = useState(0)
  const [timing, setTiming] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startTimer = useCallback(() => {
    setTiming(true)
    setSeconds(0)
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
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`
  }

  const handleSave = async () => {
    const data: FeedingData = {
      method,
      amount: method !== 'breast' ? amount : undefined,
      duration: Math.ceil(seconds / 60),
      side: method === 'breast' ? side : undefined,
    }

    const record: CareRecord = {
      _id: Date.now().toString(),
      babyId: familyStore.currentBaby?._id || '',
      familyId: familyStore.family?._id || '',
      recorderId: userStore.userInfo?._id || '',
      recorderName: userStore.userInfo?.nickname,
      type: 'feeding',
      startTime: Date.now() - seconds * 1000,
      endTime: Date.now(),
      data,
      createdAt: Date.now(),
    }

    recordStore.addRecord(record)
    Taro.showToast({ title: '记录成功', icon: 'success' })
    setTimeout(() => onSuccess?.(), 1000)
  }

  return (
    <View className='record-form feeding-form'>
      <View className='timer-section'>
        <Text className='timer-display'>{formatTimer(seconds)}</Text>
        <View className='timer-btn' onClick={timing ? stopTimer : startTimer}>
          <Text className='timer-btn-text'>{timing ? '停止' : '开始计时'}</Text>
        </View>
      </View>

      <View className='form-section'>
        <Text className='form-label'>喂奶方式</Text>
        <View className='option-group'>
          {(['breast', 'formula', 'mixed'] as const).map(m => (
            <View
              key={m}
              className={`option-item ${method === m ? 'active' : ''}`}
              onClick={() => setMethod(m)}
            >
              <Text>{FEEDING_METHOD_LABELS[m]}</Text>
            </View>
          ))}
        </View>
      </View>

      {method === 'breast' && (
        <View className='form-section'>
          <Text className='form-label'>哺乳侧</Text>
          <View className='option-group'>
            {([['left', '左侧'], ['right', '右侧'], ['both', '双侧']] as const).map(([val, label]) => (
              <View
                key={val}
                className={`option-item ${side === val ? 'active' : ''}`}
                onClick={() => setSide(val)}
              >
                <Text>{label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {method !== 'breast' && (
        <View className='form-section'>
          <Text className='form-label'>奶量 (ml)</Text>
          <View className='amount-control'>
            <View className='amount-btn' onClick={() => setAmount(Math.max(0, amount - 10))}>
              <Text>-</Text>
            </View>
            <Text className='amount-value'>{amount}</Text>
            <View className='amount-btn' onClick={() => setAmount(amount + 10)}>
              <Text>+</Text>
            </View>
          </View>
        </View>
      )}

      <View className='save-btn' onClick={handleSave}>
        <Text className='save-btn-text'>保存记录</Text>
      </View>
    </View>
  )
}

export default observer(FeedingForm)
