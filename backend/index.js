import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/pictures', express.static('pictures'));
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
  database: "artShop",
});

app.get("/paintings", (req, res) => {
  const q = "SELECT * FROM paintings";
  db.query(q, (err, data) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json(data);
  });
});

app.post("/create", upload.single('image'), (req, res) => {
  
  const name = req.body.name;
  const price = req.body.price;
  const image = req.file.filename;
  const description = req.body.description;

  const q = "INSERT INTO paintings(`name`, `price`, `picture`, `description`) VALUES (?,?,?,?)";

  db.query(q, [name,price,image,description], (err, data) => {
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
   const description = req.body.description;

   const q = "UPDATE paintings SET `name`= ?, `price`= ?, `picture`= ?, `description`= ?  WHERE pId = ?";  
   db.query(q, [name,price,image,description,id], (err, data) => {
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

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM admin WHERE username = ? AND password = ?";
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const user = results[0];
        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.UserID,
                username: user.Username,
            }
        });
    });
});


app.listen(5000, () => {
  console.log("Connected to backend.");
});
