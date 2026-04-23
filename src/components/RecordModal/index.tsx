import { View, Text, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import FeedingForm from '@/components/RecordForms/FeedingForm'
import DiaperForm from '@/components/RecordForms/DiaperForm'
import SleepForm from '@/components/RecordForms/SleepForm'
import HealthForm from '@/components/RecordForms/HealthForm'

import './index.scss'

interface RecordModalProps {
  visible: boolean
  onClose: () => void
}

const TABS = [
  { key: 'feeding', label: '喂奶', icon: '🍼' },
  { key: 'diaper', label: '尿布', icon: '🧷' },
  { key: 'sleep', label: '睡眠', icon: '😴' },
  { key: 'health', label: '体征', icon: '🌡️' },
] as const

type TabKey = typeof TABS[number]['key']

export default function RecordModal({ visible, onClose }: RecordModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('feeding')

  if (!visible) return null

  return (
    <View className='record-modal'>
      <View className='record-modal-mask' onClick={onClose} catchMove />
      <View className='record-modal-sheet'>
        <View className='sheet-handle' />
        <View className='sheet-tabs'>
          {TABS.map(tab => (
            <View
              key={tab.key}
              className={`sheet-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <Text className='tab-icon'>{tab.icon}</Text>
              <Text className='tab-label'>{tab.label}</Text>
            </View>
          ))}
        </View>
        <ScrollView className='sheet-body' scrollY>
          {activeTab === 'feeding' && <FeedingForm onSuccess={onClose} />}
          {activeTab === 'diaper' && <DiaperForm onSuccess={onClose} />}
          {activeTab === 'sleep' && <SleepForm onSuccess={onClose} />}
          {activeTab === 'health' && <HealthForm onSuccess={onClose} />}
        </ScrollView>
      </View>
    </View>
  )
}
