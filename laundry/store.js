import { configureStore } from "@reduxjs/toolkit";
import CartReduce from "./CartReducer";

export default configureStore({
    reducer: {
        cart:CartReduce,
    }
});