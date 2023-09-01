#!/usr/bin / env node

import addTask from './commands/addTask.js'
import deleteTask from './commands/deleteTask.js'
import readTask from './commands/readTask.js'
import updateTask from './commands/updateTask.js'

// Importing the Command class from Commander.js library
import { Command } from 'commander'

// Creating an instance of the Command class
const program = new Command()

// Setting the name and description of the CLI tool
program
    .name('todo')
    .description('Your ternimal task manager!')
    .version('1.0.0')

// Defining the command called 'add'
program
    .command('add')
    .description('Create a new todo')
    .action(addTask)

// Defining a command called 'read
program
    .command('read')
    .description('Reads all the todos.')
    .action(readTask)

// Defining a command called 'update
program
    .command('update')
    .description('Updates a todo.')
    .action(updateTask)

// Defining a command called 'delete'
program
    .command('delete')
    .description('Deletes a todo.')
    .action(deleteTask)

// Parsing the command-line arguments an dexecuting the corresponding actions
program.parse()