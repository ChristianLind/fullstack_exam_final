import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Counter } from './features/counter/counter';
import { Problems } from './features/problems/problems';
import { Login } from './features/users/login';
import { Signup } from './features/users/signup';
import { MyStack } from './Components/Frontpage';
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Todos } from './features/todos/todos';


// Create a client
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <View style={styles.container}>
          <MyStack></MyStack>
          {/* <Login></Login> */}
          {/* <Signup></Signup> */}
          {/* <Counter></Counter> */}
          {/* <Problems></Problems> */}
          {/* <Todos></Todos> */}
        </View>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
});