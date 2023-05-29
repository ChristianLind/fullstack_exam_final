import React, { useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { signup } from './usersSlice'
import { UsersSignup } from './usersSignup'

export function Signup({navigation}: {navigation: any}) {
  //UseSelector allows components to extract and subscribe to a specific piece of state from the Redux store
  //In this case if an error occurs while utulizing userSlice - state: RootState) => state.users.error
  //and error will be returned from - UsersSlice / interface.error - line 31-34
  //error is posted at line 57
  const error: string | undefined = useSelector((state: RootState) => state.users.error)
  
  //It allows the component to interact with the store and trigger state changes based on user interactions
  //or other application events.
  //aka start store op.
  const dispatch = useDispatch<AppDispatch>()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = (event: any) => {
    event.preventDefault();

    dispatch(signup(new UsersSignup(username, password, email)));
    navigation.navigate('login');
  }

  return (
    <View>
      <Text>Please insert your username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder='Insert your username'
      />
      <Text>Please insert your password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder='Insert your password'
      />
      <Text>Please insert your email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder='Insert your email'
      />
      <Button title="Signup" onPress={handleSignup}/>

      <Text>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  },
});