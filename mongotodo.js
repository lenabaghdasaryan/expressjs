import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';

const dbName = 'todo';
async function connectToMongoDB() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName)
    } catch (error) {
        console.error('Error connecting to MongoDB', error)
        throw error
    }
};
export async function getTodos() {
    try {
        const db = await connectToMongoDB();
        const coll = db.collection('todos');
        return await coll.find({}).toArray()
    } catch (e) {
        console.log("error in getTodos", e.message);
        throw new Error(e.message)
    }
}
export async function createTodos(todo) {
    try {
        const db = await connectToMongoDB();
        const coll = db.collection('todos');
        return await coll.insertOne(todo)
    }
    catch(e) {
        console.log("error in createTodos", e.message);
        throw new Error(e.message)
    }
}
export async function getTodo(todo) {
    try {
        console.log(todo);
        const db = await connectToMongoDB();
        const coll = db.collection('todos');
        return await coll.findOne(todo)
    } catch (e) {
        console.log("error in getTodo", e.message);
        throw new Error(e.message)
    }
}
export async function updateTodo(todo, update) {
    try {
        const db = await connectToMongoDB(todo);
        const coll = db.collection('todos');
        const updatedTodo = await coll.updateOne(todo, { $set: update });
        return updatedTodo
    } catch (e) {
        console.log("error in updateTodo", e.message);
        throw new Error(e.message)
    }
}
export async function deleteTodo(todo) {
    try {
        const db = await connectToMongoDB(todo);
        const coll = db.collection('todos');
        return await coll.deleteMany(todo)

    }
    catch (e) {
        console.log("error in deleteTodo", e.message);
        throw new Error(e.message)
    }
}