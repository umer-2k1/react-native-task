export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Details: {
    user: { name: string; email: string; phone: string; website: string };
  };
};
