import { ManagementActivityLogDetailModal } from '@/components/management/logs/ManagementActivityLogDetailModal';
import { ManagementActivityLogFilterSheet } from '@/components/management/logs/ManagementActivityLogFilterSheet';
import { ActivityLog, ManagementActivityLogRow, ManagementActivityLogTableHeader } from '@/components/management/logs/ManagementActivityLogRow';
import { ManagementActivityLogSortModal } from '@/components/management/logs/ManagementActivityLogSortModal';
import { ManagementRequestLogDetailModal } from '@/components/management/logs/ManagementRequestLogDetailModal';
import { ManagementRequestLogFilterSheet } from '@/components/management/logs/ManagementRequestLogFilterSheet';
import { ManagementRequestLogRow, ManagementRequestLogTableHeader, RequestLog } from '@/components/management/logs/ManagementRequestLogRow';
import { ManagementRequestLogSortModal } from '@/components/management/logs/ManagementRequestLogSortModal';
import { Button } from '@/components/ui/Button/Button';
import { Grid } from '@/components/ui/Grid/Grid';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { getAllActivityLogs, getAllRequestLogs } from '@/services/logService';
import { employeesStyles } from '@/styles/employees.styles';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

export default function ManagementLogsScreen() {
  const [activeTab, setActiveTab] = useState<'activity' | 'request'>('activity');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [requestLogs, setRequestLogs] = useState<RequestLog[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [selectedActivityLogId, setSelectedActivityLogId] = useState<number | null>(null);
  const [activityDetailModalVisible, setActivityDetailModalVisible] = useState(false);
  const [requestDetailModalVisible, setRequestDetailModalVisible] = useState(false);
  const [selectedRequestLogId, setSelectedRequestLogId] = useState<number | null>(null);


  useEffect(() => {
    async function fetchLogs() {
      if (activeTab === 'activity') {
        const result = await getAllActivityLogs({ pageNumber, sortDirection, ...appliedFilters });
        setActivityLogs(result.items);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
      } else {
        const result = await getAllRequestLogs({ pageNumber, sortDirection, ...appliedFilters });
        setRequestLogs(result.items);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
      }
    }
    fetchLogs();
  }, [activeTab, pageNumber, sortDirection, appliedFilters]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Yönetim / Loglar',
          headerLeft: () => (
            <Pressable onPress={() => router.push('/(tabs)/management')}>
              <Ionicons name="chevron-back" size={24} color={colors.gray800} />
            </Pressable>
          ),
        }}
      />

      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', backgroundColor: colors.gray100, borderRadius: 8, padding: 3, gap: 2 }}>
            <Pressable
              onPress={() => {
                setActiveTab('activity');
                setPageNumber(1);
              }}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 6,
                backgroundColor: activeTab === 'activity' ? colors.white : colors.transparent,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: activeTab === 'activity' ? '600' : '400' }}>Aktivite</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setActiveTab('request');
                setPageNumber(1);
              }}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 6,
                backgroundColor: activeTab === 'request' ? colors.white : colors.transparent,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: activeTab === 'request' ? '600' : '400' }}>İstek</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', gap: -8 }}>
            <Button icon="options-outline" size="small" iconColor={colors.gray500} color={colors.transparent} onPress={() => setFilterModalVisible(true)} />
            <Button icon="swap-vertical-outline" size="small" iconColor={colors.gray500} color={colors.transparent} onPress={() => setSortModalVisible(true)} />
          </View>
        </View>

        <Text style={employeesStyles.resultCount}>{totalCount} kayıt bulundu</Text>

        <ScrollView horizontal>
          <View style={employeesStyles.tableWrapper}>
            {activeTab === 'activity' ? (
              <>
                <ManagementActivityLogTableHeader />
                <Grid
                  data={activityLogs}
                  renderItem={(log) => (
                    <ManagementActivityLogRow
                      log={log}
                      isSelected={log.id === selectedActivityLogId}
                      onPress={() => {
                        setSelectedActivityLogId(log.id);
                        setActivityDetailModalVisible(true);
                      }}
                    />
                  )}
                />
              </>
            ) : (
              <>
                <ManagementRequestLogTableHeader />
                <Grid
                  data={requestLogs}
                  renderItem={(log) => (
                    <ManagementRequestLogRow
                      log={log}
                      isSelected={log.id === selectedRequestLogId}
                      onPress={() => {
                        setSelectedRequestLogId(log.id);
                        setRequestDetailModalVisible(true);
                      }}
      
                    />
                  )}
                />
              </>
            )}
          </View>
        </ScrollView>

        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
      </View>

      {activeTab === 'activity' ? (
        <ManagementActivityLogSortModal
          visible={sortModalVisible}
          onClose={() => setSortModalVisible(false)}
          currentSortDirection={sortDirection}
          onApply={(option) => {
            setPageNumber(1);
            setSortDirection(option.sortDirection);
          }}
        />
      ) : (
        <ManagementRequestLogSortModal
          visible={sortModalVisible}
          onClose={() => setSortModalVisible(false)}
          currentSortDirection={sortDirection}
          onApply={(option) => {
            setPageNumber(1);
            setSortDirection(option.sortDirection);
          }}
        />
      )}

      {activeTab === 'activity' ? (
        <ManagementActivityLogFilterSheet
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={(filters) => {
            setPageNumber(1);
            setAppliedFilters(filters);
          }}
        />
      ) : (
        <ManagementRequestLogFilterSheet
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={(filters) => {
            setPageNumber(1);
            setAppliedFilters(filters);
          }}
        />
      )}

      <ManagementActivityLogDetailModal
        visible={activityDetailModalVisible}
        onClose={() => {
          setActivityDetailModalVisible(false);
          setSelectedActivityLogId(null);
        }}
        selectedActivityLog={activityLogs.find((log) => log.id === selectedActivityLogId) || null}
      />

      <ManagementRequestLogDetailModal
        visible={requestDetailModalVisible}
        onClose={() => {
          setRequestDetailModalVisible(false);
          setSelectedRequestLogId(null);
        }}
        selectedRequestLog={requestLogs.find((log) => log.id === selectedRequestLogId) || null}
      />
    </>
  );
}