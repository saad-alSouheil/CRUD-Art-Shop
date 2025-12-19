import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, res ,cb) => {
    cb(null, 'pictures/')
  },
    filename:(req, file, cb)=>{
    cb(null,file.originalname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer(
  {
    storage:storage
  }
)

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "painting",
});

app.get("/paintings", (req, res) => {
  const q = "SELECT * FROM paintings";
  db.query(q, (err, data) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    for (const d of data) {
      try {
        if (d.picture && fs.existsSync(path.join("pictures", d.picture))) {
          d.picture = fs.readFileSync(path.join("pictures", d.picture)).toString("base64");
        } else {
          d.picture = null; // no image available
        }
      } catch (fileErr) {
        console.error("Image read error:", fileErr);
        d.picture = null;
      }
    }

    return res.json(data);
  });
});

app.post("/create", upload.single('image'), (req, res) => {
  
  const name = req.body.name;
  const price = req.body.price;
  const image = req.file.filename;

  const q = "INSERT INTO paintings(`name`, `price`, `picture`) VALUES (?,?,?)";

  db.query(q, [name,price,image], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
 
  const q1 = "SELECT picture from paintings where pId = ?" ;
  db.query(q1,[id], (err1,data1) => {

    const filePath = `./pictures/${data1[0].picture}`;
    console.log(filePath);
     fs.unlink(filePath, (err2) => {
      if (err1 || err2) {
        console.error('Error deleting file:', err1);
        return;
      }})
  });

  const q = " DELETE FROM paintings WHERE pId = ? ";
  
  db.query(q, [id], (err, data) => {
    
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/modify/:id", upload.single('image'),(req, res) => {
   const id = req.params.id;
   const name =  req.body.name;
   const price=  req.body.price;
   const image = req.file.filename;
//console.log(major);
//console.log(image);
const q = "UPDATE paintings SET `name`= ?, `price`= ?, `picture`= ? WHERE pId = ?";  
db.query(q, [name,price,image,id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/search/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM paintings WHERE pId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// SIMPLE login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Login successful
        const user = results[0];
        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.UserID,
                username: user.Username,
                email: user.Email
            }
        });
    });
});

// SIMPLE registration
app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body;

    // Check if user exists
    const checkQuery = "SELECT * FROM users WHERE Username = ? OR Email = ?";
    db.query(checkQuery, [username, email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: "User already exists" });
        }

        const insertQuery = "INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, email, password], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: "Registration failed" });
            }

            res.json({
                success: true,
                message: "Registration successful",
                userId: result.insertId
            });
        });
    });
});

app.listen(5000, () => {
  console.log("Connected to backend.");
});
