import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import HealthForm from '@/components/RecordForms/HealthForm'

import './health.scss'

export default function HealthPage() {
  return (
    <View className='health-page'>
      <HealthForm onSuccess={() => Taro.navigateBack()} />
    </View>
  )
}
