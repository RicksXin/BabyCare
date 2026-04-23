import { View, Text } from "@tarojs/components";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useDidShow } from "@tarojs/taro";
import { familyStore, recordStore } from "@/stores";
import { formatDuration, timeAgo, getMonthAge } from "@/utils/date";
import { RECORD_TYPE_ICONS, RECORD_TYPE_LABELS } from "@/types/enums";
import FloatingActionButton from "@/components/FloatingActionButton";
import RecordModal from "@/components/RecordModal";

import "./index.scss";

function Index() {
  const { currentBaby } = familyStore;
  const {
    todayFeedingCount,
    todayDiaperCount,
    todaySleepMinutes,
    todayRecords,
    lastFeedingTime,
  } = recordStore;
  const [showRecordModal, setShowRecordModal] = useState(false);

  useDidShow(() => {
    // TODO: 从云端拉取今日记录
  });

  return (
    <View className="index-page">
      <View className="baby-header">
        <View className="baby-avatar">👶</View>
        <View className="baby-info">
          <Text className="baby-name">{currentBaby?.name || "添加宝宝"}</Text>
          {currentBaby && (
            <Text className="baby-age">
              {getMonthAge(currentBaby.birthday)}
            </Text>
          )}
        </View>
      </View>

      <View className="summary-cards">
        <View className="summary-card">
          <Text className="card-icon">🍼</Text>
          <Text className="card-value">{todayFeedingCount}</Text>
          <Text className="card-label">喂奶</Text>
        </View>
        <View className="summary-card">
          <Text className="card-icon">🧷</Text>
          <Text className="card-value">{todayDiaperCount}</Text>
          <Text className="card-label">换尿布</Text>
        </View>
        <View className="summary-card">
          <Text className="card-icon">😴</Text>
          <Text className="card-value">
            {formatDuration(todaySleepMinutes)}
          </Text>
          <Text className="card-label">睡眠</Text>
        </View>
      </View>

      {lastFeedingTime && (
        <View className="last-feeding">
          <Text>🍼 上次喂奶：{timeAgo(lastFeedingTime)}</Text>
        </View>
      )}

      <View className="timeline-section">
        <Text className="section-title">今日记录</Text>
        {todayRecords.length === 0 ? (
          <View className="empty-tip">
            <Text>还没有记录，点击右下角按钮开始记录吧~</Text>
          </View>
        ) : (
          todayRecords.map((record) => (
            <View className="timeline-item" key={record._id}>
              <Text className="timeline-icon">
                {RECORD_TYPE_ICONS[record.type]}
              </Text>
              <View className="timeline-content">
                <Text className="timeline-type">
                  {RECORD_TYPE_LABELS[record.type]}
                </Text>
                <Text className="timeline-time">
                  {timeAgo(record.startTime)}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      <FloatingActionButton onClick={() => setShowRecordModal(true)} />
      <RecordModal
        visible={showRecordModal}
        onClose={() => setShowRecordModal(false)}
      />
    </View>
  );
}

export default observer(Index);
