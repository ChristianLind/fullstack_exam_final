import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsersAPI } from './usersAPI'
import { UsersSignup } from './usersSignup'
import { UsersLogin } from './usersLogin'
import * as SecureStore from 'expo-secure-store';


// First, create the thunk
export const login = createAsyncThunk(
  'auth/login', // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersLogin, thunkAPI) => {
    //Response fra backend
    const response = await UsersAPI.login(user)

    //Save to secure store
    //Finder token i user body objektet (user.data.access_token)
    SecureStore.setItemAsync('token', response.access_token);

    return response
  }
)

export const signup = createAsyncThunk(
  'auth/signup', // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersSignup, thunkAPI) => {
    //Response fra backend
    const response = await UsersAPI.signup(user);
    
    return response
  }
)

//Setup af useselector states til senere brug (minder om usestates)
interface UsersState {
  token: string | undefined | null
  error: string | undefined
}

//Start værdier for overstående useselector
const initialState = {
  token: undefined,
  error: undefined
} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      if (action.payload.id != undefined) {
        state.error = "Signup success";
      }
    })
    builder.addCase(login.fulfilled, (state, action) => {
        console.log("running login fulfilled");
        state.error = undefined;
        state.token = action.payload?.access_token
    })
    builder.addCase(login.rejected, (state, action) => {
        if (action.error.message === 'Request failed with status code 401') {
            state.error = 'Invalid login'
            state.token = undefined
        }
        
        console.log("error in slice", action.error);
    })
  },
})

// Action creators are generated for each case reducer function
export const { updateToken } = usersSlice.actions

export default usersSlice.reducer