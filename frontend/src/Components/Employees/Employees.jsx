import './Employees.css';
import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Employees extends Component {
    
  state = {
    emp: [],
    loading: true,
  }
    
  async componentDidMount() {
    const response = await axios.get('http://localhost:8080/api/employees');
    //  console.log(response);
    if (response.data.status === 200) {
      this.setState({
        emp: response.data.employees,
        loading: false,
      });
     }

  }
  
  
  render() {
    var emp_table= "";
    if (this.state.loading) {
        emp_table = <tr><td colSpan="6"><h2>Loading ...</h2></td></tr>
    } else {
      emp_table = this.state.emp.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.status}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
         </tr>
        );
      });
      }
      
    return <div>

      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr></thead>
        <tbody>
        {emp_table}
        </tbody>
      </table>
     <Link to="/add-employee">Add</Link>

    </div>;
  }
};

export default Employees;
