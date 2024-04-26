import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;