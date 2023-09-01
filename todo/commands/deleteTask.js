import inquirer from "inquirer";
import { connectDB, disconnectDB } from '../db/connectDB.js';
import ora from "ora";
import chalk from "chalk";
import Todos from "../schema/TodoSchema.js";

export async function getTaskCode() {
    try {
        // Prompting the user to enter the todo code
        const answers = await inquirer.prompt([
            { name: 'code', message: 'Enter the code of the todo: ', type: 'input' }
        ])

        // Triming user's response so that the todo code does not containany starting or trailing white spaces.
        answers.code = answers.code.trim();
        return answers;
    } catch (error) {
        console.log('Something went wrong...\n', error)
    }
}

export default async function deleteTask() {
    try {
        // Obtaining the todo code provided by user
        const userCode = await getTaskCode();
        console.log('user code is', userCode)
        // Connection to the database
        await connectDB()

        // Starting the spinner
        const spinner = ora('Finding and Deleting the todo...').start()

        // Deleting the task
        const response = await Todos.deleteOne({ code: userCode.code })

        // Stopping the spinner
        spinner.stop()

        // Checking the delete operation
        if (response.deleteCount === 0) {
            console.log(chalk.redBright('Could not find any todo matching the provided name. Deletion failed.'));
        } else {
            console.log(chalk.greenBright('Deleted Task Successfully'));
        }

        // Disconnection from the database
        await disconnectDB();
    } catch (error) {
        // Error Handling.
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}
