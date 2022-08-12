import React from 'react'
import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class AddEmployee extends Component {

    state = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        system_role_id: "",
        picture: "",
    }

    handleInput = (e) => {
        this.setState({
      [e.target.name]: e.target.value
        });
    }

    saveEmployee = async (e) => {
        e.preventDefault();
        
        const res = await axios.post('http://localhost:8080/api/add-employee', this.state);
        if (res.data.status === 200) {
            console.log(res.data.message);
            this.setState({
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                system_role_id: "",
                picture: "",
            });
        }
    }

    render() {
        return (
            <div>
                <Link to="/employees">Back</Link>
                <form onSubmit={this.saveEmployee}>
                <label>First Name </label>
                    <input type="text" name="first_name" onChange={this.handleInput} value={this.state.first_name} placeholder='Type your first name'></input><br/>
                    <label>Last Name </label>
                    <input type="text" name="last_name" onChange={this.handleInput} value={this.state.last_name} placeholder='Type your Last name'></input><br/>
                    <label>Email Address </label>
                    <input type="email" name="email" onChange={this.handleInput} value={this.state.email} placeholder='Type your email'></input><br/>
                    <label>Phone Number </label>
                    <input type="text" name="phone_number" onChange={this.handleInput} value={this.state.phone_number} placeholder='Type your Phone Number'></input><br/>
                    <label>System Role </label>
                    <input type="number" name="system_role_id" onChange={this.handleInput} value={this.state.system_role_id} placeholder='Type your Role'></input><br />
                    <label>Upload your Image </label>
                    <input type="file" name="picture" onChange={this.handleInput} value={this.state.picture} placeholder='Upload your Image'></input><br/>
                    <button type='submit'>Save Employee</button>
                </form>
            </div>
        )
    }
}

export default AddEmployee;
