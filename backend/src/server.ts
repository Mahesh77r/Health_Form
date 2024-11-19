import express, { Request, Response , Application} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Route from "./routes/route";
import Database from "./config/db";

dotenv.config();

const app: Application = express();


app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api", Route);
app.get("/", (req:Request, res:Response) => res.send(`Server listening on port ${PORT}`));
app.all("*", (req:Request, res:Response) => res.status(404).json({ error: "404 Not Found" }));

Database();


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
