import axios from "axios"
import { useQuery, useMutation } from '@tanstack/react-query';
import { TodoEntity } from "./todoEntity";
import { Platform } from "react-native";

const baseUrl: string = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const useGetTodos = () => {
  const fetchTodos = async () => {
    return await axios.get("http://" + baseUrl + ':3000/todos');
  }

  //custom hook til at fetche
  //querykey skal være et array
  //queryFn = query function
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });
  
  return {isLoading, isError, data: data?.data, error}
}

export const usePostTodo = () => {
  return useMutation({
    //mutation brugt til create, update, delete data eller udføre serverside effect
    mutationFn: (newTodo: TodoEntity) => {
      return axios.post("http://" + baseUrl + ':3000/todos', newTodo)
    },
  })
}