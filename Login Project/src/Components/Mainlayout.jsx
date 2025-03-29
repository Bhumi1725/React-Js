import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./Navbar";
import Form from "./Form";
import Studentsdetails from "./Studentsdetails";

export default function Mainlayout(){

    return <>
<BrowserRouter>
<Navbar/>
<Routes>
    <Route path="/" element={<Form/>} ></Route>
    <Route path="/Studentsdetails" element={<Studentsdetails/>} ></Route>
</Routes>
</BrowserRouter>
    </>
}
