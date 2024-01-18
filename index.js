import express from "express";
import fs from "fs/promises";

const app = express();
app.use(express.json());
async function getAdmin(req, res, next) {
    try {
        const users = await fs.readFile("express.json", "utf-8");
        const parsedUsers = JSON.parse(users)

        const role = parsedUsers.filter((elem) => elem.userType === "admin");

        console.log(role);
        res.status(200).send(role);
next()
    } catch (error) {
        res.status(404).send("Server Error");
    }
}
async function addUser(req, res) {
    try {
        const newUser = req.body;
        const users = await fs.readFile("express.json", "utf-8");
        const parsedUsers = JSON.parse(users);
        parsedUsers.push(newUser);
        await fs.writeFile("express.json", JSON.stringify(parsedUsers, null, 2));
        res.status(200).send("User successfully added!")
    } catch (error) {
        res.status(404).send("Server error")
    }
}

app.get("/", getAdmin)
app.post("/user", addUser)
app.listen(3000, () => {
    console.log("Server started at port 3000")
})
