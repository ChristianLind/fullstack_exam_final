import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProblemEntity } from './problemEntity'
import { ProblemsAPI } from './problemsAPI'

// First, create the thunk
export const fetchAllProblems = createAsyncThunk(
  'problems/fetchAllProblems', // This is a name for the thunk (must be unique) not the endpoint
  async (thunkAPI) => {
    //Response fra backend
    const response = ProblemsAPI.fetchAllProblems()
    
    return response
  }
)
export const createProblem = createAsyncThunk(
  'problems/create', // This is a name for the thunk (must be unique) not the endpoint
  async (problem: ProblemEntity, thunkAPI) => {
    //Response fra backend
    const response = ProblemsAPI.create(problem);
    
    return response
  }
)

//Setup af useselector states til senere brug (minder om usestates)
interface ProblemsState {
  problems: ProblemEntity[]
}

//Start værdier for overstående useselector
const initialState = {
  problems: [],
} as ProblemsState

// Then, handle actions in your reducers:
const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllProblems.fulfilled, (state, action) => {
      // Add user to the state array
      
      state.problems = action.payload;
    })
    builder.addCase(createProblem.fulfilled, (state, action) => {
        // Add user to the state array
        state.problems.push(action.payload)
    })
  },
})

// Action creators are generated for each case reducer function
export default problemsSlice.reducer