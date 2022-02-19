import React, {useEffect,useRef, useState } from 'react'
import { Wrapper,Table,Tbody} from './App.styled.js'
import GetData from './GetData';


function Form() {
    let { data, fetchAPI, updateAPI } = GetData([]);
    const [newdata, setNewData] = useState(data);
    const [formData, setFormData] = useState("");
   
    const [pageNumber, setPageNumber] = useState(1);
  
    const fileRef = useRef();

    const onChangeHandler = (e) => {
        const { name, value, type, checked } = e.currentTarget;
        
        let formValue = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
            [name]: formValue
        });

    }

    const btn = () => {
      updateAPI(
      fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })  
      )
    }
    
    useEffect(() => {
        fetchAPI(fetch(`http://localhost:3000/user?_page=${pageNumber}&_limit=5`)
            .then((r) => r.json())
            .then((d)=> setNewData(d))
        )
    }, [pageNumber]);

    const fillter = () => {
        fetch("http://localhost:3000/user?Department=D-1")
            .then((r) => r.json())
            .then((d)=> setNewData(d))
    }
    
    const pageManage = (value) => {
        setPageNumber(pageNumber+value)
    }
    

    const onDeleteItem = (a) => {
        console.log(a);
        fetch(`http://localhost:3000/user/${a}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err))
            .finally(() =>console.log("final delete"));
    }
          
    return (
        <>
        <Wrapper>
        <div>
            <label>Name</label>
            <input
                type="text"
                name = "Name"  
                value={formData.Name}
                onChange ={onChangeHandler}
            />
        </div>
        <div>
            <label>Age</label>
              <input
                  type="number"
                  name= 'age'
                  value={formData.age}
                  onChange = {onChangeHandler}
              />
        </div>
        <div>
            <label>Address</label>
              <input
                  type="text"
                  name='Address'
                  value={formData.Address}
                  onChange = {onChangeHandler}
              />
        </div>  
        <div>
        Department      
            <select name='Department' value={formData.Department} onChange={onChangeHandler}>
            <option>Select</option>        
            <option>D-1</option>
            <option>D-2</option>
        </select>
        </div>  
        <div>
            <label>Salary</label>
              <input
                  type="number"
                  name='Salary'
                  value={formData.Salary}
                  onChange = {onChangeHandler}
              />
        </div> 
          
        <div>
            <label>Marital State</label>
              <input
                  type="checkbox"
                  name='marital'
                  checked = {formData.marital}
                  onChange = {onChangeHandler}
              />
        </div>  
        <div>
              <input
                  name='files'
                  ref={fileRef}
                  type="file"
                  onChange={onChangeHandler}
              />
        </div>
        <button onClick={btn}>Submit</button>
        
        <button disabled={pageNumber === 1 ? true : false} onClick={()=>pageManage(-1)}>Prev</button> 
        <button onClick={()=>pageManage(1)}>Next</button> 
        <button onClick={fillter}>Fillter</button>      
        </Wrapper>
            <Table>
            <table border = "1">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Marital</th>
                    <th>Image</th>
                    <th>Delete</th>
                    </tr>
                </thead> 
                {newdata.map((el) => {
                    let x = "No"
                    if (el.marital === true) {
                        x = "Yes"
                    }
                    return (
                        <Tbody key={el.id}>
                            <tr>
                                <th>{el.id}</th>
                                <th>{el.Name}</th>
                                <th>{el.age}</th>
                                <th>{el.Address}</th>
                                <th>{el.Department}</th>
                                <th>{el.Salary}</th>
                                <th>{x}</th>
                                <th>{el.files}</th>
                                <button onClick={() => onDeleteItem(el.id)} >Delete</button>    
                            </tr>
                        </Tbody>
                    )
                })}   
            </table>
          </Table>
        </>    
    )
}
export default Form
