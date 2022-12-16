import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
import  express  from "express";
import cors from "cors"
dotenv.config();

export const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(cors())
app.use(express.json());


app.get(("/teste"),(req,res)=>
res.sendStatus(200)
);

app.get(("/questao1"),async (req,res)=>{

    try {
      const { rows } = await connectionDB.query('SELECT count(experiences."endDate") FROM experiences;')
      console.table(rows)
      res.sendStatus(rows)
    }
     catch (err) {
      res.status(500).send(err.message);
    }
}
);
app.get(("/questao2"),async (req,res)=>{

    try {
      const { rows } = await connectionDB.query(`SELECT "userId" AS id, 
      count("userId") as experiences FROM educations GROUP BY "userId" 
      ORDER BY experiences DESC
      `)
      console.table(rows)
      res.sendStatus(rows)
    }
     catch (err) {
      res.status(500).send(err.message);
    }
}
);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));

