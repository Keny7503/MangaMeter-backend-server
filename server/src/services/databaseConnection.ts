import { AppDataSource } from "./data-source"
import { UserTest } from "../entity/UserTest"
require('dotenv').config()

// console.log("test"+ process.env.DB_SERVER);
export const runDatabaseConnection = AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new UserTest()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 30
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(UserTest)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
