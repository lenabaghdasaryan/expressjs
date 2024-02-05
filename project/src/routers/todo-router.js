import moment from 'moment'
import JWT from 'jsonwebtoken';
import { Router } from 'express'
const router = Router()

import { Todo } from '../models/todo-model.js';

router.post('/', async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { title, description, storyPoints } = req.body

        const user = JWT.verify(authorization, 'bubu');
        const deadline = moment().add(Number(storyPoints), 'days').format('YYYY-MM-DD');
        await Todo.create({ title, description, contributor: user._id, storyPoints, deadline })
        const todo = await Todo.find({ title })
        res.status(201).send({ data: todo })
    } catch (e) {
        res.status(404).send({ data: e.message })
    }
})


router.get('/', async (req, res) => {
    try {
        const filter = req.query
        const { authorization } = req.headers;

        const user = JWT.verify(authorization, 'bubu');
        const todo = await Todo.find(filter);

        if (user.id !== todo[0].contributor) {
            throw new Error("You are no allow to read  others todos")
        }

        res.status(201).send({ data: todo })

    } catch (e) {
        res.status(404).send({ data: e.message })
    }
})

router.delete('/:title?', async (req, res) => {
    try {
        const { title } = req.params;
        const { authorization } = req.headers;
        const user = JWT.verify(authorization, 'bubu');
        const todoArray = title ? await Todo.find({ title }) : await Todo.find({});
        if (!todoArray.length) {
            throw new Error("Todo not found");
        }
        for (const elem of todoArray)
            if (user._id !== elem.contributor) {
                throw new Error("You are not allowed to delete others' todos");
            }
        const deletedTodo = title ? await Todo.deleteOne({ title: title }) : await Todo.deleteMany({});
        res.status(200).send({ data: deletedTodo })

    } catch (e) {
        res.status(404).send(e.message)
    }

})

router.put('/', async (req, res) => {
    try {
        const filter = req.query;
        const { authorization } = req.headers;
        const user = JWT.verify(authorization, 'bubu');
        const [firstTodo] = await Todo.find(filter); 
        console.log(firstTodo)
        const update = req.body;
        let updatedTodo;

        if (!firstTodo) {
            throw new Error("Todo not found");
        }

        if (!filter) {
            if (user._id === firstTodo.contributor) {
                updatedTodo = await Todo.updateMany({ contributor: firstTodo.contributor }, { $set: update });
            } else {
                throw new Error("Todo created by someone else");
            }
        } else {
            updatedTodo = await Todo.updateOne(filter, { $set: update });
        }

        res.status(204).send({ data: updatedTodo });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});




export default router