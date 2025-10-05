import React from 'react';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { user } = route.params;
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.phone}</Text>
      <Text>{user.website}</Text>
    </View>
  );
};

export default DetailsScreen;
