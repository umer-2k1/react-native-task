import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error?.issues[0]!.message);
      return;
    }

    setError(null);
    dispatch(login({ email }));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
