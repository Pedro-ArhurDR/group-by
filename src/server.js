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



const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));

