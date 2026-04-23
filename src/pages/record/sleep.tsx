import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import SleepForm from '@/components/RecordForms/SleepForm'

import './sleep.scss'

export default function SleepPage() {
  return (
    <View className='sleep-page'>
      <SleepForm onSuccess={() => Taro.navigateBack()} />
    </View>
  )
}
