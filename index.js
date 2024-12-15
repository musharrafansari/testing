const express = require("express")
const bodyParser = require("body-parser")
const app = express()
let port = 4000
const mysql = require("./connection")

mysql.con.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        return;
    }
    console.log("Connected to MySQL!"); 
});
app.use(bodyParser.json({limit :"50mb"}))
app.use(express.urlencoded({extended : true}))

app.get("/test",(req,res)=>{
    res.send({msg : "Testing success......"})
})

app.put("/update/:id",(req,res)=>{
    const studentId = req.params.id
    const {name, email ,mobile} = req.body
    
    let sql = 
    `update students
    set name = ?, email = ?, mobile = ?
    where id = ?`
    mysql.con.query(sql, [name, email, mobile, studentId], (err, result) => {
        if (err) {
            console.error("Error updating the student:", err.message);
            return res.status(500).json({ error: "Failed to update student" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully" });
    });
    
})
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})