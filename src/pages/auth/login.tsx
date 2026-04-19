import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { userStore } from '@/stores'

import './login.scss'

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      await userStore.login()
      Taro.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => Taro.navigateBack(), 1000)
    } catch {
      Taro.showToast({ title: '登录失败', icon: 'none' })
    }
  }

  return (
    <View className='login-page'>
      <View className='logo-section'>
        <Text className='logo-emoji'>👶</Text>
        <Text className='app-name'>宝宝照护</Text>
        <Text className='app-desc'>记录宝宝的每一个瞬间</Text>
      </View>
      <Button className='wx-login-btn' openType='getPhoneNumber' onClick={handleLogin}>
        微信一键登录
      </Button>
    </View>
  )
}
