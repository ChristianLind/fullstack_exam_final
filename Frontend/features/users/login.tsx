import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native'
import { login, signup, updateToken } from './usersSlice'
import { UsersLogin } from './usersLogin'
import * as SecureStore from 'expo-secure-store';

export function Login({navigation}: {navigation: any}) {
  //UseSelector allows components to extract and subscribe to a specific piece of state from the Redux store
  //In this case if an error occurs while utulizing userSlice - state: RootState) => state.users.error
  //and error will be returned from - UsersSlice / interface.error - line 31-34
  //error is posted at line 93
  const token: string | undefined | null = useSelector((state: RootState) => state.users.token)
  const error: string | undefined = useSelector((state: RootState) => state.users.error)
  
  //It allows the component to interact with the store and trigger state changes based on user interactions
  //or other application events.
  //aka start store op.
  const dispatch = useDispatch<AppDispatch>()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (event: any) => {
    event.preventDefault();
  
    dispatch(login(new UsersLogin(username, password)))
      .then((response) => {
        //payload from backend
        if (response.payload.access_token) {
          navigation.navigate('problems');
          //navigation.navigate('todos');
          //navigation.navigate('counter');
        }
      })
      .catch((error) => {
        console.log('Error message:', error.message);
      });
  };

  const handleLogout = async (event: any) => {
    event.preventDefault();

    try {
      //console.log("Trying to logout - ", token);
      await SecureStore.deleteItemAsync('token');
      //const isTokenDeleted = await SecureStore.getItemAsync('token');
      //console.log("My Token status - ", isTokenDeleted);
    } catch (error) {
      console.log("Logout failed - ", error)
    }
  };

  const handleShowMyToken = async (event: any) => {
    event.preventDefault();

    const isTokenDeleted = await SecureStore.getItemAsync('token');
    console.log("My Token status - ", isTokenDeleted);
  };
  

  useEffect(() => {
    const asyncFunc = async () => {
      const tName = await SecureStore.getItemAsync("tenant_name")
      const token = await SecureStore.getItemAsync('token');
      dispatch(updateToken(token));
      
      console.log("token is: ", token);
      console.log("Tenant Name is: ", tName);
    }
    asyncFunc();
  }, []);


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
        <Button title="Login" onPress={handleLoginSuccess}/>
        <Text style={styles.space}>If login succsefull - your token - {token}</Text>
        <Text style={styles.space}>{error}</Text>

        <Text style={styles.space}>Don't have an account - go to signup Page</Text>
        <Button title="Go to Signup" onPress={() => navigation.navigate('signup')}/>

        {/* De kunne være buttons, men kan i det tilfælde ikke bruge stylesheetet (linje 107+) */}
        <TouchableOpacity style={[styles.button, styles.space]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        
        <Pressable style={styles.button} onPress={handleShowMyToken}>
          <Text style={styles.buttonText}>Show My Token</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  space: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
});