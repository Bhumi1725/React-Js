import {configureStore} from '@reduxjs/toolkit';
import  studentSlice  from '../Slice/studentSlice';

const store = configureStore({
    reducer:{
        stdSlice:studentSlice
    }
});

export default store;