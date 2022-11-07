import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name: 'modalSlice',
    initialState: {
        isModal: false,
        isAdd: false,
        isUpdate: false
    },
    reducers: {
        setIsModalAdd: (state) => {
            state.isModal = true;
            state.isAdd = true;
        },
        setIsModalUpdate: (state) => {
            state.isModal = true;
            state.isUpdate = true;
            console.log(state.isUpdate);
            
        },
        setIsModalClose: (state) => {
            state.isAdd = false;
            state.isModal = false;
            state.isUpdate = false;
        }
    }
})

export default ModalSlice.reducer;
export const {setIsModalAdd, setIsModalClose, setIsModalUpdate} = ModalSlice.actions;