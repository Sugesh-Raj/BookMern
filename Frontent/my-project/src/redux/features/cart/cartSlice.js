import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems:[]
}

const cartSlice = createSlice({
    name : 'cart',
    initialState : initialState,
    reducers:{
        addToCart:(state,action)=>{

            const existingItem = state.cartItems.find(item=>item._id === action.payload._id);

            if(!existingItem){
                state.cartItems.push(action.payload)
                alert("item added successfully")
            }else{
                alert("item already exists in cart")
            }

        },

        removeFromCart:(state,action)=>{

            state.cartItems = state.cartItems.filter((item)=>(
                item._id !== action.payload._id
            ))
        },

        clearcart :(state)=>{

            state.cartItems=[]
        }
    }
})
//export the actions

export const {addToCart,removeFromCart,clearcart} = cartSlice.actions;
export default cartSlice.reducer;