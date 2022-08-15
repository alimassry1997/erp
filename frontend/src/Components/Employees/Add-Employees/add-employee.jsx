import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AddEmployee = () =>{



    const [empInput, setEmpInput] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        system_role_id: "",
        picture: "",
    });

   const handleInput = (e) => {
       e.persist();
       setEmpInput({ ...empInput ,[e.target.name]: e.target.value
        });
    }

  const saveEmployee = (e) => {
        e.preventDefault();

        const data = {
            first_name: empInput.first_name,
            last_name: empInput.last_name,
            email: empInput.email,
            phone_number: empInput.phone_number,
            system_role_id: empInput.system_role_id,
        }
        
        axios.post('http://localhost:8080/api/add-employee', data).then(res => {
            if (res.data.status === 200) {
                setEmpInput(res.data.employee);
            } else if (res.data.status === 400) {
                
            }
        })

        // const res = await axios.post('http://localhost:8080/api/add-employee', this.state);
        // if (res.data.status === 200) {
        //     console.log(res.data.message);
        //     this.setState({
        //         first_name: "",
        //         last_name: "",
        //         email: "",
        //         phone_number: "",
        //         system_role_id: "",
        //         picture: "",
        //     });
        // }
    }
        return (
            <div>
                <Link to="/employees">Back</Link>
                <form onSubmit={saveEmployee}>
                <label>First Name </label>
                    <input type="text" name="first_name" onChange={handleInput} value={empInput.first_name} placeholder='Type your first name'></input><br/>
                    <label>Last Name </label>
                    <input type="text" name="last_name" onChange={handleInput} value={empInput.last_name} placeholder='Type your Last name'></input><br/>
                    <label>Email Address </label>
                    <input type="email" name="email" onChange={handleInput} value={empInput.email} placeholder='Type your email'></input><br/>
                    <label>Phone Number </label>
                    <input type="text" name="phone_number" onChange={handleInput} value={empInput.phone_number} placeholder='Type your Phone Number'></input><br/>
                    <label>System Role </label>
                    <input type="number" name="system_role_id" onChange={handleInput} value={empInput.system_role_id} placeholder='Type your Role'></input><br />
                    <label>Upload your Image </label>
                    <input type="file" name="picture" onChange={handleInput} value={empInput.picture} placeholder='Upload your Image'></input><br/>
                    <button type='submit'>Save Employee</button>
                </form>
            </div>
        )
}

export default AddEmployee;
