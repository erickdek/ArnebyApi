import dbConnect from './db.js';'./src/database/mongodb-connect.js'
import app from './app.js'
import cors from "cors";

const PORT = process.env.PORT ?? 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URL,
    })
);
dbConnect();
app.listen(PORT, (err, res) => {
    console.log(`Server listening on port ${PORT}`)
});