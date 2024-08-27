import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    clearItems: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

// redux/cartSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItems: (state, action) => {
//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     clearItems: (state) => {
//       state.items = [];
//     },
//     incrementItem: (state, action) => {
//       const item = state.items.find((item) => item.id === action.payload);
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     decrementItem: (state, action) => {
//       const item = state.items.find((item) => item.id === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//     },
//   },
// });

// export const { addItems, clearItems, incrementItem, decrementItem } =
//   cartSlice.actions;

// export default cartSlice.reducer;
