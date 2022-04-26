import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    value: {
      category: "",
      title: "",
      img: "",
      type: [],
      description: "",
      location: "",
      purchase_price: {
        currency: "",
        value: "",
      },
      receipts: [],
      certificate: {
        type: "",
        img: [],
      },
      insurance: {
        name: "",
        value: "",
      },
      inheritance: {
        name: "",
        comments: "",
      },
    },
  },
  reducers: {
    addInput: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { addInput } = inputSlice.actions;

export default inputSlice.reducer;
