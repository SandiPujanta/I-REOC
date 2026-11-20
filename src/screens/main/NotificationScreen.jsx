// NotificationScreen — daftar notifikasi
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      // TODO: panggil API GET /notifications
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.item, !item.isRead && styles.unread]}>
      <Text style={styles.itemTitle}>{item.title || 'Notifikasi'}</Text>
      <Text style={styles.itemBody}>{item.body || '-'}</Text>
      <Text style={styles.itemTime}>{item.createdAt || '-'}</Text>
    </TouchableOpacity>
  );

  if (isLoading && !refreshing) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#1565C0" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada notifikasi</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FF' },
  item: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 10, elevation: 1 },
  unread: { borderLeftWidth: 4, borderLeftColor: '#1565C0' },
  itemTitle: { fontSize: 15, fontWeight: 'bold', color: '#212121' },
  itemBody: { fontSize: 13, color: '#757575', marginTop: 4 },
  itemTime: { fontSize: 11, color: '#9E9E9E', marginTop: 6 },
  empty: { textAlign: 'center', color: '#757575', marginTop: 48, fontSize: 15 },
});

export default NotificationScreen;
