const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "perfumes",
});

// Get all perfumes
app.get("/perfumes", (req, res) => {
    const q = "SELECT * FROM perfume";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Failed to fetch perfumes" });
      }
      return res.json(data);
    });
  });

  // Get a specific perfume
app.get("/perfumes/:id", (req, res) => {
    const perfumeId = req.params.id;
    const q = "SELECT * FROM perfume WHERE idperfume = ?";
  
    db.query(q, [perfumeId], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Failed to fetch perfume" });
      }
      return res.json(data[0]);
    });
  });

  // Create a new perfume
app.post("/perfumes", (req, res) => {
    const q = "INSERT INTO perfume(`name`, `brand`, `image`, `description`, `price`) VALUES (?)";
  
    const values = [
      req.body.name,
      req.body.brand,
      req.body.image,
      req.body.description,
      req.body.price,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Failed to create perfume" });
      }
      return res.json({ message: "Perfume created successfully" })
    });
});

// Update a specific perfume
app.put("/perfumes/:id", (req, res) => {
    const perfumeId = req.params.id;
    const q = "UPDATE perfume SET `name`= ?, `brand`= ?, `image`= ?, `description`= ?, `price`= ? WHERE idperfume = ?";
  
    const values = [
      req.body.name,
      req.body.brand,
      req.body.image,
      req.body.description,
      req.body.price,
    ];
    db.query(q, [...values, perfumeId], (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ error: "Failed to update perfume" });
        }
        return res.json({ message: "Perfume updated successfully" });
      });
    });
    
    // Delete a specific perfume
app.delete("/perfumes/:id", (req, res) => {
    const perfumeId = req.params.id;
    const q = "DELETE FROM perfume WHERE idperfume = ?";
  
    db.query(q, [perfumeId], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Failed to delete perfume" });
      }
      return res.json({ message: "Perfume deleted successfully" });
    });
  });
  // Start the server
app.listen(8800, () => {
    console.log("Server is running on port 8800");
  });