import express from "express";
import { getTodo, getTodos, createTodos, updateTodo, deleteTodo } from "./mongotodo.js";
const router = express.Router();
router.get("/:title?", async (req, res) => {
    try {
        const { title } = req.params;
        const todos = title ? await getTodo({ title }) : await getTodos()
        res.status(201).send({ data: todos })
    } catch (e) {
        res.status(404).send({ data: 'Something went wrong' })

    }

})


router.put('/', async (req, res) => {
    try {
        const { title, completed } = req.body;
        await updateTodo({ title }, { completed });
        res.status(204).send({ data: "Todo successfully updated" })
    }
    catch (e) {
        res.status(404).send({ data: "Todo is not updated" })
    }
})
router.delete('/', async (req, res) => {

    try {
        const { title } = req.body;
        console.log(req.body)
        const deletedTodo = await deleteTodo({ title });

        res.status(200).send({ data: deletedTodo })
    } catch (e) {
        res.status(404).send(e.message)
    }

})

router.post('/registration', async (req, res) => {
    try {
        const { title, completed, description } = req.body;
        console.log(req.body)
        const response = await createTodos({ title, completed, description })
        console.log(response)
        res.status(201).send({ data: response })
    } catch (e){
        res.status(404).send({ data: e.message })
    }

})
export default router;
