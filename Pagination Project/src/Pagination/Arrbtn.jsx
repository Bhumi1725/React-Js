import { useEffect, useState } from "react"
import { data, num } from "./data";

export default function Arrbtn() {

    let [array, setArray] = useState(data)

    let [singleobj, setSingleobj] = useState([]);

    let [btn, setBtn] = useState([]);


    useEffect(() => {
        let btnarray = []
        setSingleobj(() => array.filter((data, i) => (i >= 0 && i < num) ? data : null))
        for (let i = 1; i <= Math.ceil(array.length / num); i++) {
            btnarray.push(i);
        }
        setBtn(btnarray)
    }, [])


    let btnclick = (e) => {
        setSingleobj(() => array.filter((data, i) => (i >= (e * num) - num && i < (e * num)) ? data : null));
    }

    return <>
        {
            singleobj.map((data, i) => <p key={data.id}><b>{data.id}</b> ,  {data.email}</p>)

        }
        {
            btn.map((data, i) => <button onClick={() => btnclick(data)} key={i}>{data}</button>)
        }
    </>
}