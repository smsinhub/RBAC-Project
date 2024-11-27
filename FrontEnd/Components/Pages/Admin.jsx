import React, { useState, useEffect } from "react";
import "./Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [userfilter, setUserfilter] = useState([]);
    const [isopen, setIsopen] = useState(false);
    const [userdata, setuserdata] = useState({ name: "", dob: "", dept: "", marks: "" });
    const navigate=useNavigate()
    const back=()=>{
     navigate('')
    }
    const getUsers = async () => {
        try {
            
            const res = await axios.get("http://localhost:8000/student");
            
            setUsers(res.data);
            setUserfilter(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const search = (e) => {
        const text = e.target.value.toLowerCase();
        const filteredUsers = users.filter(
            (user) =>
                user.name.toLowerCase().includes(text) || user.dept.toLowerCase().includes(text)
        );
        setUserfilter(filteredUsers);
    };

    const deletefn = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
            if (confirmDelete) {
                await axios.delete(`http://localhost:8000/student/${id}`);
                getUsers(); 
            }
        } catch (error) {
            console.error("Error deleting the student:", error);
        }
    };

    const addstudent = () => {
        setuserdata({ name: "", dob: "", dept: "", marks: "" });
        setIsopen(true);
    };

    const updatefn = (user) => {
        setuserdata(user);
        setIsopen(true);
    };

    const handledata = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    };

    const submitdata = async (e) => {
        e.preventDefault();
        try {
            if (userdata.id) {
                await axios.patch(`http://localhost:8000/student/${userdata.id}`, userdata);
            } else {
                await axios.post(`http://localhost:8000/student/`, userdata);
            }
            getUsers(); 
            setIsopen(false); 
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="containers">
            <div className="search">
                <input type="search" placeholder="Search student" onChange={search} />
                <button className="btn" onClick={back}>
                    BACK
                </button>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Dept</th>
                            <th>Marks</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userfilter.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.dept}</td>
                                <td>{user.marks}</td>
                                <td>
                                    <button className="editbtn" onClick={() => updatefn(user)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="deletebtn" onClick={() => deletefn(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isopen && (
                    <div className="record">
                        <div className="recordcontent">
                            <h1>Student Record</h1>
                            <input
                                type="text"
                                name="name"
                                value={userdata.name}
                                placeholder="Student Name"
                                onChange={handledata}
                            />
                            <input
                                type="text"
                                name="dob"
                                value={userdata.dob}
                                placeholder="Date of Birth"
                                onChange={handledata}
                            />
                            <input
                                type="text"
                                name="dept"
                                value={userdata.dept}
                                placeholder="Department"
                                onChange={handledata}
                            />
                            <input
                                type="number"
                                name="marks"
                                value={userdata.marks}
                                placeholder="Marks"
                                onChange={handledata}
                            />
                            <button onClick={submitdata}>
                                {userdata.id ? "Update" : "Add"}
                            </button>
                            <span className="close" onClick={() => setIsopen(false)}>&times;</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Admin