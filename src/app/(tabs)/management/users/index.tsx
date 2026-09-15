import { ManagementUserDetailModal } from '@/components/management/users/ManagementUserDetailModal';
import { ManagementUserFilterSheet } from '@/components/management/users/ManagementUserFilterSheet';
import { ManagementUserFormSheet } from '@/components/management/users/ManagementUserFormSheet';
import { ManagementUser, ManagementUserRow, ManagementUserTableHeader } from '@/components/management/users/ManagementUserRow';
import { ManagementUserSortModal } from '@/components/management/users/ManagementUserSortModal';
import { Button } from '@/components/ui/Button/Button';
import { Grid } from '@/components/ui/Grid/Grid';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { deleteUser, getAllUsers, reactivateUser } from '@/services/userService';
import { employeesStyles } from '@/styles/employees.styles';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ManagementUsersScreen() {
  const [users, setUsers] = useState<ManagementUser[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined);
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<any>(undefined);


  useEffect(() => {
    async function fetchUsers() {
      const result = await getAllUsers({
        pageNumber,
        search: appliedSearch,
        status: 'all',
        sortDirection,
        ...appliedFilters,
      });
      setUsers(result.items);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    }
    fetchUsers();
  }, [pageNumber, appliedSearch, appliedFilters, sortDirection]);

  function handleSearch() {
    setPageNumber(1);
    setAppliedSearch(searchText);
  }

  function handleDelete() {
    if (!selectedUserId) return;

    Alert.alert(
      'Emin misiniz?',
      'Bu kullanıcıyı silmek istediğinize emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(selectedUserId);
              Toast.show({
                type: 'success',
                text1: 'Başarılı',
                text2: 'Kullanıcı silindi.',
              });
              setDetailModalVisible(false);
              setSelectedUserId(null);
              setPageNumber(1);
              setAppliedFilters({ ...appliedFilters });
            } catch (error: any) {
              Toast.show({
                type: 'error',
                text1: 'Hata',
                text2: error.message,
              });
            }
          },
        },
      ]
    );
  }

  async function handleReactivate() {
    if (!selectedUserId) return;

    try {
      await reactivateUser(selectedUserId);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kullanıcı tekrar aktif edildi.',
      });
      setDetailModalVisible(false);
      setSelectedUserId(null);
      setPageNumber(1);
      setAppliedFilters({ ...appliedFilters });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.message,
      });
    }
  }

  function handleEdit() {
    const user = users.find((u) => u.id === selectedUserId);
    if (!user) return;

    setEditingUser({
      id: user.id,
      username: user.username,
      email: user.email,
      roleType: user.roleName,
      employeeId: user.employeeId,
    });
    setDetailModalVisible(false);
    setFormMode('edit');
    setFormVisible(true);
  }


  return (
    <>
      <Stack.Screen
        options={{
          title: 'Yönetim / Kullanıcılar',
          headerLeft: () => (
            <Pressable onPress={() => router.push('/(tabs)/management')}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </Pressable>
          ),
        }}
      />
      <View style={{ marginBottom: 10 }}>
        <Button
          title="+ Kullanıcı Ekle"
          size="small"
          color="#E6F1FB"
          textColor="#185FA5"
          fullWidth
          onPress={() => {
            setFormMode('create');
            setEditingUser(undefined);
            setFormVisible(true);
          }}
        />
      </View>
      <View style={employeesStyles.container}>
        <View style={employeesStyles.searchRow}>
          <View style={employeesStyles.searchInputWrapper}>
            <TextInput
              style={employeesStyles.searchInputFlex}
              placeholder="Kullanıcı adı, email ara..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              autoCapitalize="none"
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={18} color="#999" />
              </Pressable>
            )}
          </View>
          <View style={employeesStyles.iconGroup}>
            <Button icon="options-outline" size="small" iconColor="gray" color="transparent" onPress={() => setFilterModalVisible(true)} />
            <Button icon="swap-vertical-outline" size="small" iconColor="gray" color="transparent" onPress={() => setSortModalVisible(true)} />
          </View>
          <Button title="Ara" color="#B0B0B0" size="small" onPress={handleSearch} />
        </View>

        <Text style={employeesStyles.resultCount}>{totalCount} kayıt bulundu</Text>

        <ScrollView horizontal>
          <View style={employeesStyles.tableWrapper}>
            <ManagementUserTableHeader />
            <Grid
              data={users}
              renderItem={(user) => (
                <ManagementUserRow
                  user={user}
                  isSelected={user.id === selectedUserId}
                  onPress={() => {
                    setSelectedUserId(user.id);
                    setDetailModalVisible(true);
                  }}
                />
              )}
            />
          </View>
        </ScrollView>

        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
      </View>

      <ManagementUserFilterSheet
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(filters) => {
          setPageNumber(1);
          setAppliedFilters(filters);
        }}
      />
      <ManagementUserSortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        currentSortDirection={sortDirection}
        onApply={(option) => {
          setPageNumber(1);
          setSortDirection(option.sortDirection);
        }}
      />
      <ManagementUserDetailModal
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedUserId(null);
        }}
        userId={selectedUserId}
        onEdit={ handleEdit }
        onDelete={handleDelete}
        onReactivate={handleReactivate}
      />

      <ManagementUserFormSheet
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          if (formMode === 'edit') {
            setDetailModalVisible(true);
          }
        }}
        onSuccess={() => {
          setPageNumber(1);
          setAppliedFilters({ ...appliedFilters });
        }}
        mode={formMode}
        initialData={editingUser}
      />

    </>
  );
}