import React from 'react'
import type { RootState } from './../../store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import { Button, View, Text } from 'react-native';

export function Counter() {
  //UseSelector allows components to extract and subscribe to a specific piece of state from the Redux store
  //In this case if an error occurs while utulizing userSlice - state: RootState) => state.users.error
  //and error will be returned from - UsersSlice / interface.error - line 31-34
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <View>
        <Button onPress={() => dispatch(increment())} title="Increment"/>
        <Button onPress={() => dispatch(decrement())} title="Decrement"/>
        <Text>Value is currently {count}</Text>
    </View>
  )
}