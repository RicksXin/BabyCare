import { View, Text, ScrollView, Input, Image } from '@tarojs/components'
import { useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { aiStore } from '@/stores'

import './index.scss'

function AIPage() {
  const [inputText, setInputText] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const scrollRef = useRef('')

  useDidShow(() => {
    scrollToBottom()
  })

  const scrollToBottom = () => {
    const msgs = aiStore.messages
    if (msgs.length > 0) {
      scrollRef.current = `msg-${msgs[msgs.length - 1].id}`
    }
  }

  const handleSend = async () => {
    const text = inputText.trim()
    if (!text && !previewImage) return

    setInputText('')
    const imgUrl = previewImage
    setPreviewImage('')

    await aiStore.sendMessage(text || '请分析这张图片', imgUrl || undefined)
    scrollToBottom()
  }

  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setPreviewImage(res.tempFilePaths[0])
      },
    })
  }

  const handleVoiceInput = () => {
    Taro.showActionSheet({
      itemList: ['开始录音'],
      success: () => {
        const recorderManager = Taro.getRecorderManager()
        recorderManager.onStop((res) => {
          // TODO: 语音转文字后发送
          Taro.showToast({ title: '语音功能开发中', icon: 'none' })
          console.log('录音文件:', res.tempFilePath)
        })
        recorderManager.start({ duration: 30000, format: 'mp3' })
        Taro.showToast({ title: '录音中...', icon: 'none', duration: 3000 })
        setTimeout(() => recorderManager.stop(), 3000)
      },
    })
  }

  return (
    <View className='ai-page'>
      <ScrollView
        className='message-list'
        scrollY
        scrollIntoView={scrollRef.current}
        scrollWithAnimation
      >
        {aiStore.messages.length === 0 && (
          <View className='welcome'>
            <Text className='welcome-icon'>🤖</Text>
            <Text className='welcome-title'>AI 育儿助手</Text>
            <Text className='welcome-desc'>
              您可以向我咨询育儿问题，也可以发送宝宝的照片让我帮您分析
            </Text>
          </View>
        )}
        {aiStore.messages.map((msg) => (
          <View
            key={msg.id}
            id={`msg-${msg.id}`}
            className={`message ${msg.role}`}
          >
            <View className='message-avatar'>
              <Text>{msg.role === 'user' ? '👤' : '🤖'}</Text>
            </View>
            <View className='message-bubble'>
              {msg.imageUrl && (
                <Image className='message-image' src={msg.imageUrl} mode='widthFix' />
              )}
              <Text className='message-text'>{msg.content}</Text>
            </View>
          </View>
        ))}
        {aiStore.loading && (
          <View className='message assistant'>
            <View className='message-avatar'>
              <Text>🤖</Text>
            </View>
            <View className='message-bubble'>
              <Text className='typing'>思考中...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {previewImage && (
        <View className='preview-bar'>
          <Image className='preview-thumb' src={previewImage} mode='aspectFill' />
          <View className='preview-remove' onClick={() => setPreviewImage('')}>
            <Text>✕</Text>
          </View>
        </View>
      )}

      <View className='input-bar'>
        <View className='input-actions'>
          <View className='action-btn' onClick={handleChooseImage}>
            <Text>📷</Text>
          </View>
          <View className='action-btn' onClick={handleVoiceInput}>
            <Text>🎤</Text>
          </View>
        </View>
        <Input
          className='chat-input'
          placeholder='输入您的问题...'
          value={inputText}
          onInput={(e) => setInputText(e.detail.value)}
          confirmType='send'
          onConfirm={handleSend}
        />
        <View
          className={`send-btn ${inputText.trim() || previewImage ? 'active' : ''}`}
          onClick={handleSend}
        >
          <Text>发送</Text>
        </View>
      </View>
    </View>
  )
}

export default observer(AIPage)
