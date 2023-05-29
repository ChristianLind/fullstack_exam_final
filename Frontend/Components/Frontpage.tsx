import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../features/users/login';
import { Signup } from '../features/users/signup';
import { Problems } from '../features/problems/problems';
import { Todos } from '../features/todos/todos';
import { Counter } from '../features/counter/counter';

const Stack = createStackNavigator();

export function MyStack () {
    return (
        <NavigationContainer>
            {/* Array af sider der bliver sat op og referere til komponenter som er hvad siden viser */}
            <Stack.Navigator initialRouteName='login'>
                <Stack.Screen name="login" options={{ title: 'Welcome to Boligfy' }} component={Login}/>
                <Stack.Screen name="signup" component={Signup}/>
                <Stack.Screen name="problems" component={Problems}/>
                <Stack.Screen name="todos" component={Todos}/>
                <Stack.Screen name="counter" component={Counter}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}