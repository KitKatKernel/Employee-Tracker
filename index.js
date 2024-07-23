const inquirer = require('inquirer');
const db = require('./db/db');

// Define the main menu options and their corresponding functions
const menuOptions = {
    'View all departments': viewAllDepartments,
    'View all roles': viewAllRoles,
    'View all employees': viewAllEmployees,
    'Add a department': addDepartment,
    'Add a role': addRole,
    'Add an employee': addEmployee,
    'Update an employee role': updateEmployeeRole,
    'Exit': () => process.exit()
};

// Main menu function
const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: Object.keys(menuOptions)
    });

    // Calls the action function
    await menuOptions[action]();
    mainMenu(); // Return to the main menu after the action is completed
};

// view all departments
const viewAllDepartments = async () => {
    const res = await db.query('SELECT * FROM department');
    console.table(res.rows);
};

//  view all roles
const viewAllRoles = async () => {
    const res = await db.query('SELECT * FROM role');
    console.table(res.rows);
};

// view all employees
const viewAllEmployees = async () => {
    const res = await db.query('SELECT * FROM employee');
    console.table(res.rows);
};

// add a department
const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:'
    });

    await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department: ${name}`);
};

// add a role
const addRole = async () => {
    const departments = await db.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(({ id, name }) => ({
        name,
        value: id
    }));

    const { title, salary, department_id } = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary of the role:'
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Select the department:',
            choices: departmentChoices
        }
    ]);

    await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Added role: ${title}`);
};



// start the application
mainMenu();
