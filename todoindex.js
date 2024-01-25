import express from "express";
import todorouter from "./todorouter.js";
const app = express();
app.use(express.json());
app.use("/todo", todorouter);

app.listen(3001, () => {
    console.log("Server started at port 3001");
})