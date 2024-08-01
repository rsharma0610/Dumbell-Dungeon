import express from "express";
import pg from "pg";
import cors from "cors";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "liftLog",
    password: "36Postgres172!",
    port: 5432,
  });
db.connect();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/get-lifts", async(req, res) => {
    console.log("Get lifts route hit");
    try{
        const result = await db.query("SELECT * FROM lifts;");
        res.status(200).send(result.rows);
    }catch(error){
        console.log("Error communicating with the database", error);
    }
})

app.get('/get-lift/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Get lift route hit for id: ${id}`);
    try{
        const result = await db.query("SELECT * FROM lifts WHERE id=$1;", [id])
        //console.log(result.rows[0]);
        res.status(200).send(result.rows[0])
    }catch(error){
        console.log("Error communicating with the database", error);
    }
})

app.post("/submit-lift", async(req, res) => {
    console.log("submit lift route hit");
    const {title, lift, protein, notes} = req.body;
    try{
        await db.query("INSERT INTO lifts (title, lift, protein, note) VALUES ($1, $2, $3, $4);", [title, lift, protein, notes]);
        res.status(200).send("Lift submitted successfully");
    }catch(error){
        console.log("Database error", error);
    }
})

app.put("/update-lift", async(req, res) => {
    const {title, lift, protein, notes, id} = req.body;
    console.log("update lift route hit");
    try{
        await db.query("UPDATE lifts SET title=$1, lift=$2, protein=$3, note=$4 WHERE id=$5;", [title, lift, protein, notes, id]);
        res.status(200).send("Lift updated successfully");
    }catch(error){
        console.log("Database error", error);
    }
})

app.delete("/delete-lift", async(req, res) => {
    const {id} = req.query;
    try{
        await db.query("DELETE FROM lifts where id=$1;", [id]);
        res.status(200).send("Lift deleted successfully");
    }catch(error){
        console.log("Database error", error);
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
