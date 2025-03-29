import { useDispatch} from 'react-redux'
import { createStudent } from '../Slice/studentSlice';
import { useState } from 'react';



export default function Form() {

    let dispatch = useDispatch();

    let [data, setData] = useState({ id: '', name: '', class: '' });

    let handlechange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    let addStudent = (e) => {
        console.log(data);

        e.preventDefault();

        dispatch(createStudent({ ...data, id: Date.now().toString() }));

        setData({
            name: '',
            class: '',
            id: ''
        })

    }

    return (
        <>
            <h1>Students Form</h1>

            <form onSubmit={addStudent}>
                <p>Name: <input type="text" name="name" value={data.name} onChange={handlechange} /> </p>
                <p>Class: <input type="text" name="class" value={data.class} onChange={handlechange} /> </p>
                <p><input type="submit" value="ADD" /></p>
            </form>
        </>
    )
}