import { View, Text, Input } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'

import './join.scss'

export default function JoinFamilyPage() {
  const [inviteCode, setInviteCode] = useState('')

  const handleJoin = async () => {
    if (!inviteCode.trim()) {
      Taro.showToast({ title: '请输入邀请码', icon: 'none' })
      return
    }
    // TODO: 调用云函数加入家庭
    Taro.showToast({ title: '加入成功', icon: 'success' })
  }

  return (
    <View className='join-page'>
      <View className='join-card'>
        <Text className='join-title'>输入邀请码加入家庭</Text>
        <Input
          className='code-input'
          placeholder='请输入 6 位邀请码'
          maxlength={6}
          value={inviteCode}
          onInput={e => setInviteCode(e.detail.value)}
        />
        <View className='join-btn' onClick={handleJoin}>
          <Text className='join-btn-text'>加入家庭</Text>
        </View>
      </View>
    </View>
  )
}
