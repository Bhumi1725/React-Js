import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { createStudent, deleteStudent, getStudents, updateStudent } from '../Slice/studentSlice';
import { useState } from 'react';
export default function Student(){
let dispatch = useDispatch();
let students = useSelector((state)=>state.stdSlice.studentsList);

let [data,setData] = useState({id:'',name:'',class:''});


let sedit = (data) =>{
    console.log(data);
    
    setData({
        id:data.id,
        name:data.name,
        class:data.class
    })
}

let sdelete = (data) =>{
dispatch(deleteStudent(data));
dispatch(getStudents());
}

let handlechange = (e) =>{
const {name,value} = e.target;
setData({
    ...data,
    [name]:value
})
}

let addStudent = (e) =>{
    console.log(data);
    
    e.preventDefault();
    if(data.id){
        dispatch(updateStudent(data));
    }
    else{
        dispatch(createStudent({...data,id:Date.now().toString()}));
    }
    setData({
        name:'',
        class:'',
        id:''
    })
    
}

useEffect(()=>{
    dispatch(getStudents());
    },[dispatch]);


    return(<>
    <form onSubmit={addStudent}>
        name: <input type="text" name="name" value={data.name} onChange={handlechange} /> <br />
        class: <input type="text" name="class" value={data.class} onChange={handlechange} /> <br />
        <input type="submit" value="add" />
    </form>
    <ul>
        {
            students.map(data => <li key={data.id}>{data.name} <button onClick={()=>sedit(data)}>edit</button><button onClick={()=>sdelete(data.id)}>delete</button></li>)
        }
    </ul>
    </>)
}