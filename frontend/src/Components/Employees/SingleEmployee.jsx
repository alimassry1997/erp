// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Spinner from "../Layout/Spinner";
// import { HiUserGroup } from "react-icons/hi";
// import { FaEdit } from "react-icons/fa";
// import "./SingleEmployee.css";
// import axios from "axios";




// const SingleEmployee = ({
//   employee,
//   loadingEmployee,
//   getEmployee,
//   showDeleteEmployeePopup,
//   showEditEmployeePopup,
//   token, setReloadEmployees, reloadEmployees
// }) => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   });
//   const [errors, setErrors] = useState({});
//   const { first_name, last_name, phone_number } = formData;
//   let canSubmit = false;
//   const [pic, setPic] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleImage = (e) => {
//     setPic({ image: e.target.files[0] });
//   };

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };



//   const AddNewEmployee = async (userData) => {
//     try {
//       const response = await axios.post("/api/employees/", userData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data) {
//         const { data: message } = response;
//         return message;
//       }
//     } catch (err) {
//       setErrorMessage(err.response.data);
//       throw new Error();
//     }
//   };


//   // On Submit Action
//   const onSubmit = async (a) => {
//     a.preventDefault();
//     setErrors(validate(formData));
//     if (canSubmit) {
//       try {
//         const { image } = pic;
//         const data = new FormData();
//         data.append("image", image);
//         data.append("first_name", first_name);
//         data.append("last_name", last_name);
//         data.append("email", email);
//         data.append("phone_number", phone_number);
//         data.append("system_role_id", "2");
//         const message = await AddNewEmployee(data);
//         setSuccess(message.message);
//         setReloadEmployees(!reloadEmployees);
//         setFormData({
//           first_name: "",
//           last_name: "",
//           email: "",
//           phone_number: "",
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   // Validation for Enroll Form
//   const validate = (values) => {
//     canSubmit = false;
//     const errorMessages = {};
//     if (values.first_name === "") {
//       errorMessages.first_name = "First name is required";
//     } else {
//       errorMessages.first_name = "";
//     }
//     if (values.last_name === "") {
//       errorMessages.last_name = "Last name is required";
//     } else {
//       errorMessages.last_name = "";
//     }
//     if (values.email === "") {
//       errorMessages.email = "Email is required";
//     } else {
//       errorMessages.email = "";
//     }
//     if (values.phone_number === "") {
//       errorMessages.phone_number = "Phone Number is required";
//     } else {
//       errorMessages.phone_number = "";
//     }
//     if (
//       errorMessages.first_name === "" &&
//       errorMessages.last_name === "" &&
//       errorMessages.email === "" &&
//       errorMessages.phone_number === ""
//     ) {
//       canSubmit = true;
//     }
//     return errorMessages;
//   };
//   const { email } = useParams();

//   useEffect(() => {
//     getEmployee(email);
//   }, [email]);

//   if (loadingEmployee) {
//     return <Spinner />;
//   } else {
//     const {
//       first_name,
//       last_name,
//       email,
//       phone_number,
//       picture,
//       system_role_id,
//     } = employee;
//     console.log(employee);
//     return (
//       <div className="single-team-container">
//         <div className="content">
//           <div className="profile">
//             <img src={picture} alt="profile" />
//           </div>
//           <div className="profile-head">
//             <div className="buttons">
//               <button
//                 className="btn edit-btn"
//                 onClick={() =>
//                   showEditEmployeePopup({
//                     first_name,
//                     last_name,
//                     phone_number,
//                     email,
//                     picture,
//                   })
//                 }
//               >
//                 <FaEdit />
//               </button>

//               <button className="btn add-btn">Active</button>
//             </div>
//             <div className="profile-content">
//               <h4><span>Credentials:</span></h4>
//               <h4>Name: Lara lara</h4>
//               <h4>Phone: 456789</h4>
//               <h4>Email: lara@gmail.com</h4>
//               <h4><span>Details:</span></h4>
//               <h4>System role: Lara's role</h4>
//               <h4>Team name: Blaa blaa</h4>
//             </div>
//           </div>
//           {system_role_id != 2 ? (
//             <div className="form-pass">
//               <form onSubmit={onSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="old_password" className="form-label">
//                     Old Password
//                   </label>
//                   <input
//                     type="text"
//                     className={errors.old_password ? "error" : "form-valid"}
//                     name="old_password"
//                     id="old_password"
//                     placeholder="Enter your password"
//                     onChange={onChange}
//                   />
//                   <p>{errors.old_password}</p>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="new_password" className="form-label">
//                     New Password
//                   </label>
//                   <input
//                     type="text"
//                     className={errors.new_password ? "error" : "form-valid"}
//                     name="new_password"
//                     id="new_password"
//                     placeholder="Enter your new password"
//                     onChange={onChange}
//                   />
//                   <p>{errors.new_password}</p>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="retype_password" className="form-label">
//                     Retype Password
//                   </label>
//                   <input
//                     type="text"
//                     className={errors.retype_password ? "error" : "form-valid"}
//                     name="retype_password"
//                     id="retype_password"
//                     placeholder="Retype your password"
//                     onChange={onChange}
//                   />
//                   <p>{errors.retype_password}</p>
//                 </div>


//                 <div className="form-group">
//                   <input
//                     type="submit"
//                     className="btn btn-block"
//                     value="Change Password"
//                   />
//                 </div>
//               </form>
//             </div>

//           ) : (
//             ""
//           )}
//         </div>
//       </div>
//     );
//   }
// };

// export default SingleEmployee;