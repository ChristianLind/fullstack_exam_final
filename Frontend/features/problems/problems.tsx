import React, { useState } from 'react'
import { ProblemEntity } from './problemEntity'
import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native'
import { Picture } from './picture'
import { useQueryClient } from '@tanstack/react-query'
import { usePostProblem } from './problem-hooks'


export function Problems() {
  const [camera, setCamera] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [photoToDisplay, setPhotoToDisplay] = useState('')

  //The useQueryClient hook returns the instance of the current QueryClient of our application.
  const queryClient = useQueryClient()

  //write server-side data
  //mutate er en placeholder
  const { mutate: createProblem } = usePostProblem()

  const handleAddProblem = () => {
    const problemEntity: ProblemEntity = new ProblemEntity(subject, description, photoToDisplay)
    createProblem(problemEntity, { 
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['problems'] }) 
    })
  }

  return ( 
    <View style={{flex:1}}>
      {camera ? <Picture setCamera={setCamera} setPhotoToDisplay={setPhotoToDisplay}></Picture> : <>
      <Text>When creating a problem, please insert a subject, description, then take a picture and create the problem ticket</Text>
        <TextInput
            style={styles.input}
            onChangeText={setSubject}
            value={subject}
            placeholder='Insert subject'
        />
        <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder='Insert description'
        />
          
        <Button title="Open camera" onPress={() => setCamera(true)}/>
        <Button title="Add problem" onPress={handleAddProblem}/>
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
});