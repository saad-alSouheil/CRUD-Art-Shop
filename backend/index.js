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

const PORT = process.env.PORT || 5000;

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

//LOGIN
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

//BUY-REQUEST:
app.post("/buy-request", (req, res) => {
  const { painting_id, buyer_name, buyer_email, message } = req.body;

  if (!painting_id || !buyer_name || !buyer_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const q = `INSERT INTO buy_requests (painting_id, buyer_name, buyer_email, message) VALUES (?,?,?,?)`;

  db.query(
    q,
    [painting_id, buyer_name, buyer_email, message],
    (err, result) => {
      if (err) {
        console.error("Buy request error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      return res.json({
        success: true,
        message: "Buy request sent successfully",
      });
    }
  );
});

app.get("/buy-requests", (req, res) => {
  const q = `
    SELECT 
      br.id,
      br.buyer_name,
      br.buyer_email,
      br.message,
      br.status,
      br.created_at,
      p.name AS painting_name,
      p.price,
      p.picture
    FROM buy_requests br
    JOIN paintings p ON br.painting_id = p.pId
    ORDER BY br.created_at DESC
  `;

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

app.put("/buy-request/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const updateRequest =
    "UPDATE buy_requests SET status = ? WHERE id = ?";

  db.query(updateRequest, [status, id], (err) => {
    if (err) return res.status(500).json(err);

    // If approved => mark painting as sold
    if (status === "approved") {
      const markSold = `
        UPDATE paintings 
        SET sold = 1 
        WHERE pId = (
          SELECT painting_id FROM buy_requests WHERE id = ?
        )
      `;

      db.query(markSold, [id], (err2) => {
        if (err2) return res.status(500).json(err2);
        return res.json({ success: true });
      });
    } else {
      return res.json({ success: true });
    }
  });
});

//Commissions: 
app.post("/commission-request", (req, res) => {
  const { id, client_name, client_email, message, medium } = req.body;

  if (!client_name || !client_email || !medium || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const q = `INSERT INTO commission_requests (id, client_name, client_email, message, medium) VALUES (?,?,?,?,?)`;

  db.query(
    q,
    [id, client_name, client_email, message, medium],
    (err, result) => {
      if (err) {
        console.error("Commission request error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      return res.json({
        success: true,
        message: "Commission request sent successfully",
      });
    }
  );
});

app.get("/commission-requests", (req, res) => {
  const q = `
    SELECT 
      id,
      client_name,
      client_email,
      message,
      medium,
      status,
      created_at
    FROM commission_requests
    ORDER BY created_at DESC
  `;

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

app.put("/commission-request/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const q = "UPDATE commission_requests SET status = ? WHERE id = ?";

  db.query(q, [status, id], (err) => {
    if (err) return res.status(500).json(err);
      return res.json({ success: true });
    });
});

//Reviews
app.get("/reviews", (req, res) => {
  const q = "SELECT * FROM reviews ORDER BY created_at DESC";
  db.query(q, (err, data) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json(data);
  });
});

app.post("/review", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const comment = req.body.comment;

  const q = "INSERT INTO reviews(`id`, `name`, `comment`) VALUES (?,?,?)";

  db.query(q, [id,name,comment], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

