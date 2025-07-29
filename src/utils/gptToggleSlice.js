import { createSlice } from "@reduxjs/toolkit";

const gptToggleSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false
    },
    reducers:{
        toggleGptSearchView:(state,action)=>{
            state.showGptSearch = !state.showGptSearch
        }
    }
})
export const {toggleGptSearchView} = gptToggleSlice.actions;
export default gptToggleSlice.reducer;