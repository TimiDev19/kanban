import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./BoardsSlice";


const store = configureStore({
    reducer: {
        boards: boardsSlice.reducer,
    }
})


export default store