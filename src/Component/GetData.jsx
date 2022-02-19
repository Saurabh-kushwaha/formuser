import {  useState } from 'react';


function GetData(initialValue) {
     
    const [data, setData] = useState(initialValue);
    
    const fetchAPI = (api) => {
        return api
        .then((r) => r.json())
        .then((d) => {
            setData(d)
            console.log(d);
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(() => {
            console.log("Getting data");
        })
    }

    const updateAPI = (api) => {
        return api
            .then((r) => r.json())
            
            .then((d) => {
                console.log(d);
                setData([...data, d])
            })
            
            .catch((err)=>{
                console.log("err in post:", err);
            })
            .finally(() => {
                console.log("POSTDATA");
            })
    };

    
    return {fetchAPI,data , updateAPI}
}


export default GetData;
