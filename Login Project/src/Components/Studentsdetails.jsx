import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent, getStudents } from '../Slice/studentSlice';

export default function Studentsdetails() {

    let dispatch = useDispatch();
    let students = useSelector((state) => state.stdSlice.studentsList);


    let sdelete = (data) => {
        dispatch(deleteStudent(data));
        dispatch(getStudents());
    }

    useEffect(() => {
        dispatch(getStudents());
    }, [dispatch]);

    return (
        <>
            <h1>Students Details</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Class</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {
                    students.map(data =><tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.class}</td>
                        <td><button onClick={() => sdelete(data.id)}>delete</button> </td>
                        </tr>)
                }
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    )
}