import express from "express";
import isAdmin from "./middleware.js"; 

const router = express.Router();

async function getUsers(req, res) {
    const user = req.body;
    res.send(user);
}

async function addUser(req, res) {
    const newUser = req.body;
    res.status(200).send(newUser);
}

router.post("/user", isAdmin, addUser);
router.get("/", getUsers);

export default router;