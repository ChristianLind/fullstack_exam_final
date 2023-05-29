import { FlatList, View, StyleSheet, TextInput, Button } from "react-native";
import { Text } from 'react-native';
import { useGetTodos, usePostTodo } from "./todos-hooks";
import { useQueryClient } from '@tanstack/react-query'
import { useState } from "react";
import { TodoEntity } from "./todoEntity";

export const Todos = () => {
    const [text, setText] = useState('');
    const { data } = useGetTodos();

    //The useQueryClient hook returns the instance of the current QueryClient of our application.
    const queryClient = useQueryClient();

    //write server-side data
    //mutate er en placeholder
    const { mutate: createTodo } = usePostTodo();
    
    const handleAddTodo = () => {
        const todoEntity: TodoEntity = new TodoEntity(text, false)
        createTodo(todoEntity, { 
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }) 
        })
    }

    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                />
                <Button title="Add todo" onPress={handleAddTodo} />
            </View>
            <View>
                {/* Directly defining the rendering logic inside the renderItem function of the FlatList component */}
                {/* Hvilket betyder vi ikke behøver TodoItem mere */}
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Is the job {item.text} done? ---- {item.done ? 'Yes' : 'No'}</Text>
                        </View>
                    )}
                />
            </View>
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
});