import { View, Text, Input, Picker } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { familyStore } from '@/stores'
import type { Baby } from '@/types/models'

import './baby-profile.scss'

export default function BabyProfilePage() {
  const baby = familyStore.currentBaby
  const [name, setName] = useState(baby?.name || '')
  const [gender, setGender] = useState<'male' | 'female'>(baby?.gender || 'male')
  const [birthday, setBirthday] = useState(baby?.birthday || '')
  const [birthWeight, setBirthWeight] = useState(baby?.birthWeight ? String(baby.birthWeight / 1000) : '')
  const [birthHeight, setBirthHeight] = useState(baby?.birthHeight ? String(baby.birthHeight) : '')

  const handleSave = async () => {
    if (!name.trim()) {
      Taro.showToast({ title: '请输入宝宝名字', icon: 'none' })
      return
    }
    if (!birthday) {
      Taro.showToast({ title: '请选择出生日期', icon: 'none' })
      return
    }

    const babyData: Baby = {
      _id: baby?._id || Date.now().toString(),
      familyId: familyStore.family?._id || '',
      name: name.trim(),
      gender,
      birthday,
      birthWeight: birthWeight ? parseFloat(birthWeight) * 1000 : undefined,
      birthHeight: birthHeight ? parseFloat(birthHeight) : undefined,
      createdAt: baby?.createdAt || Date.now(),
    }

    if (baby) {
      // TODO: 更新云端
    } else {
      familyStore.addBaby(babyData)
      // TODO: 同步到云端
    }

    Taro.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => Taro.navigateBack(), 1000)
  }

  return (
    <View className='profile-page'>
      <View className='form-section'>
        <Text className='form-label'>宝宝名字</Text>
        <Input className='form-input' placeholder='请输入' value={name} onInput={e => setName(e.detail.value)} />
      </View>

      <View className='form-section'>
        <Text className='form-label'>性别</Text>
        <View className='option-group'>
          <View className={`option-item ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>
            <Text>👦 男宝</Text>
          </View>
          <View className={`option-item ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>
            <Text>👧 女宝</Text>
          </View>
        </View>
      </View>

      <View className='form-section'>
        <Text className='form-label'>出生日期</Text>
        <Picker mode='date' value={birthday} onChange={e => setBirthday(e.detail.value)}>
          <View className='form-input picker-input'>
            <Text>{birthday || '请选择'}</Text>
          </View>
        </Picker>
      </View>

      <View className='form-section'>
        <Text className='form-label'>出生体重 (kg)</Text>
        <Input className='form-input' type='digit' placeholder='例如 3.2' value={birthWeight} onInput={e => setBirthWeight(e.detail.value)} />
      </View>

      <View className='form-section'>
        <Text className='form-label'>出生身高 (cm)</Text>
        <Input className='form-input' type='digit' placeholder='例如 50' value={birthHeight} onInput={e => setBirthHeight(e.detail.value)} />
      </View>

      <View className='save-btn' onClick={handleSave}>
        <Text className='save-btn-text'>保存</Text>
      </View>
    </View>
  )
}
