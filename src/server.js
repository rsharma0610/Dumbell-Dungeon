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
    //console.log("Post route hit");
    const {title, lift, protein, notes} = req.body;
    try{
        await db.query("INSERT INTO lifts (title, lift, protein, note) VALUES ($1, $2, $3, $4);", [title, lift, protein, notes]);
        res.status(200).send("Lift submitted successfully");
    }catch(error){
        console.log("Database error", error);
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
