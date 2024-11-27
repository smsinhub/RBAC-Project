import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [action, setAction] = useState("Login");
    const [users, setUsers] = useState([]);
    const [userdata, setUserdata] = useState({
        name: "",
        dob: "",
        dept: "",
        marks: "",
    });
    const navigate=useNavigate()

   
    const handledata = (e) => {
        setUserdata({ ...userdata, [e.target.name]: e.target.value });
    };

   
    const submitdata = async (e) => {
        e.preventDefault();
        if (!userdata.name || (action === "Sign Up" && (!userdata.dept || !userdata.dob))) {
            alert("Please fill all required fields!");
            return;
        }

        try {if(action==="Admin"){
            if(userdata.name && userdata.dob==="admin"){
                navigate('/Admin');
                
            }}
            else if (action === "Sign Up") {
                await axios.post(`http://localhost:8000/student/`, userdata);
                setUserdata({ name: "", dob: "", dept: "", marks: "" });
                alert(`${action} successful!`);
            } else if (action === "Login") {
                const response = await axios.get(`http://localhost:8000/student/${userdata.name}`);
                if (response.data.dob === userdata.dob) {
                    if(response.data.marks <= 40){alert(`${response.data.marks} Fail!Do well Next time`);}
                    else{alert(`${response.data.marks} Pass.Great Job`);}
                    
                } else {
                   
                    alert("Invalid Date of Birth!");
                }
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data!");
        }
    };
   return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="line"></div>
            </div>

            <div className="inputs">
                
                <div className="input">
                    {action !=="Admin"&&(
                    <input
                        type="text"
                        name="name"
                        value={userdata.name}
                        placeholder="Student Name"
                        onChange={handledata}
                    />)}
                </div>

                {action === "Sign Up" && (
                    <>
                        <div className="input">
                            <input
                                type="text"
                                name="dept"
                                value={userdata.dept}
                                placeholder="Department Name"
                                onChange={handledata}
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                name="dob"
                                value={userdata.dob}
                                placeholder="Date of Birth"
                                onChange={handledata}
                            />
                        </div>
                    </>
                )}

{action === "Admin" && (
                    <>
                        
                        <div className="input">
                            <input
                                type="text"
                                name="name"
                                value={userdata.name}
                                placeholder="Admin Name"
                                onChange={handledata}
                            />
                        </div>
                    </>
                )}
               

                {action !== "Sign Up" && (
                    <div className="input">
                        <input
                            type="password"
                            value={userdata.dob}
                            name="dob"
                            placeholder="Your DOB is password"
                            onChange={handledata}
                        />
                    </div>
                )}
            </div>

            <div className="submit-container">
                <div>
                    <span
                        className={action === "Login" ? "submit gray" : "submit"}
                        onClick={() => setAction("Sign Up")}
                    >
                        Sign Up
                    </span>
                </div>
                <div>
                    <span
                        className={action === "Sign Up" ? "submit gray" : "submit"}
                        onClick={() => setAction("Login")}
                    >
                        Login
                    </span>
                </div>
                <div>
                    <span
                        className={action === "Admin" ? "submit gray" : "submit"}
                        onClick={() => setAction("Admin")}
                    >
                        Admin
                    </span>
                </div>
            </div>

            <button className="final-submit" onClick={submitdata}>
                {action}
            </button>

           
            {users.length > 0 && (
                <div className="results">
                    {users.map((student) => (
                        <div className="box" key={student.id}>
                            <h1>Reg No: {student.id}</h1>
                            <h2>Student Name: {student.name}</h2>
                            <h2>Date of Birth: {student.dob}</h2>
                            <h2>Department: {student.dept}</h2>
                            <h2>Marks: {student.marks}</h2>
                            <h2>
                                Result:{" "}
                                {student.marks <= 40 ? (
                                    <p>Fail. Do well next time.</p>
                                ) : (
                                    <p>Pass! Great Job</p>
                                )}
                            </h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Login;
