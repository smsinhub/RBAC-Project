const express = require("express");
const cors = require("cors");
const student = require("./student.json");
const fs = require("fs");
const app = express();
const port = 8000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "PATCH", "POST", "DELETE"],
    })
);
app.use(express.json());
app.get("/student", (req, res) => {
    return res.json(student);
});
app.get("/student/:name", (req, res) => {
    let  Name  = req.params.name; 
    let students= student.filter((item) => item.name === Name);
    let data=students[0]
    return res.json(data)
    
});

app.delete("/student/:id", (req, res) => {
    let id = Number(req.params.id);
    let updatedStudents = student.filter((item) => item.id !== id);

    fs.writeFile("./student.json", JSON.stringify(updatedStudents, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Failed to update student data." });
        }
        return res.json(updatedStudents);
    });
});

app.post("/student", (req, res) => {
    let { name, dept,dob } = req.body;
    let id = Date.now();
    student.push({ id, name,dept,dob });
    fs.writeFile("./student.json", JSON.stringify(student, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Failed to update student data." });
        }
        return res.json({ message: "Student record added" });
    });
});
app.patch("/student/:id", (req, res) => {
    let id = Number(req.params.id);
    let { name, dept, dob ,marks} = req.body;
    let index = student.findIndex((user) => user.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }
    student[index] = { ...student[index], name, dept, dob,marks };
    fs.writeFile("./student.json", JSON.stringify(student, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Failed to update student data." });
        }
        return res.json({ message: "Student record updated successfully", student: student[index] });
    });
});


// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error("Failed to start the server:", err);
    } else {
        console.log(`App is running on port ${port}`);
    }
});
