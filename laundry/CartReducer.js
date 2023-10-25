import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action)=>{
            const itemPresent = state.cart.find((item)=> item.id === action.payload.id);
            if (itemPresent){
                itemPresent.quantity++;
            }else{
                state.cart.push(action.payload, quantity);
            }
        },
        removeFromCart: (state, action)=>{
            const removeItems = state.cart.filter((item)=> item.id !== action.payload.id);
            state.cart = removeItems;
        },
        incrementQuantity: (state, action)=>{
            const itemPresent = state.cart.find((item)=> item.id === action.payload.id);
            itemPresent.quantity++;
        },
        decrementQuantity: (state, action)=>{
            const itemPresent = state.cart.find((item)=> item.id === action.payload.id);
            if(itemPresent.quantity === 1){
                itemPresent.quantity = 0;
                const remoteItems = state.cart.filter((item)=> item.id !== action.payload.id);
                state.cart = remoteItems;
            }
        },
    }
});

export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} = CartSlice.actions;
export default CartSlice.reducer;