import { configureStore } from "@reduxjs/toolkit";
import CartReduce from "./CartReducer";
import ProductReduce from "./ProductReducer";

export default configureStore({
    reducer: {
        cart:CartReduce,
        product:ProductReduce,
    }
});