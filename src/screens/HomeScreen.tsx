import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: 'center',
          padding: 10,
          color: isOnline ? 'green' : 'red',
        }}
      >
        {isOnline ? 'Online' : 'Offline'}
      </Text>

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { user: item })}
            style={{ padding: 10, borderBottomWidth: 1 }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
};

export default HomeScreen;
