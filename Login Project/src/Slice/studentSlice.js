import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    studentsList: [],
    error: '',
    isLoading: false
};

const url = "http://localhost:3000/students";


export const getStudents = createAsyncThunk("students/getStudents", async (data, { rejectWithValue }) => {
    const response = await fetch(url);

    if (response.ok) {
        let jsonResponse = response.json();
        return jsonResponse;
    }
    else {
        return rejectWithValue({ error: 'Students data not found' })
    }
});


export const createStudent = createAsyncThunk("students/createStudent",async(data,{rejectWithValue})=>{
let options = {
    method:"POST",
    body:JSON.stringify(data),
    headers:{
        "Content-Type":"application/json"
    }
}
const response = await fetch(url,options);

    if (response.ok) {
        let jsonResponse = response.json();
        return jsonResponse;
    }
    else {
        return rejectWithValue({ error: 'Students data not added' })
    }
})


export const updateStudent = createAsyncThunk("students/updateStudent",async(data,{rejectWithValue})=>{
    let options = {
        method:"PUT",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }
    const response = await fetch(`${url}/${data.id}`,options);
    
        if (response.ok) {
            let jsonResponse = response.json();
            return jsonResponse;
        }
        else {
            return rejectWithValue({ error: 'Students data not updated' })
        }
    })

export const deleteStudent = createAsyncThunk("students/deleteStudent",async(data,{rejectWithValue})=>{
    let options = {
        method:"DELETE",
    }
    const response = await fetch(`${url}/${data}`,options);
    
        if (response.ok) {
            let jsonResponse = response.json();
            return jsonResponse;
        }
        else {
            return rejectWithValue({ error: 'Students data not deleted' })
        }
    })


export const studentSlice = createSlice({
    name: 'student info',
    initialState,
    reducers: {
        addStudent: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStudents.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.studentsList = action.payload;
            }).addCase(getStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
                state.studentsList = [];
            })
            .addCase(createStudent.pending, (state, action) => {
                state.isLoading = true;
            })
                .addCase(createStudent.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = '';
                    state.studentsList = [...state.studentsList,action.payload];
                }).addCase(createStudent.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload.error;
                    state.studentsList = [];
                })
                .addCase(updateStudent.pending, (state, action) => {
                    state.isLoading = true;
                })
                    .addCase(updateStudent.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.error = '';
                        state.studentsList = state.studentsList.map(data => data.id === action.payload.id ? action.payload : data);
                    }).addCase(updateStudent.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload.error;
                        state.studentsList = [];
                    })
                    .addCase(deleteStudent.pending, (state, action) => {
                        state.isLoading = true;
                    })
                        .addCase(deleteStudent.fulfilled, (state, action) => {
                            state.isLoading = false;
                            state.error = '';
                            state.studentsList = state.studentsList.filter(data => data.id !== action.payload);
                        }).addCase(deleteStudent.rejected, (state, action) => {
                            state.isLoading = false;
                            state.error = action.payload.error;
                            state.studentsList = [];
                        })
    }
});

export default studentSlice.reducer;