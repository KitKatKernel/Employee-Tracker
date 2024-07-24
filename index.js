const inquirer = require('inquirer');
const db = require('./db/db');

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

// Function to add an employee
const addEmployee = async () => {
    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const employees = await db.query('SELECT * FROM employee');
    const managerChoices = employees.rows.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    // Add a placeholder for "None" option
    managerChoices.push({ name: 'None', value: null });

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the first name of the employee:'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the last name of the employee:'
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'Select the role:',
            choices: roleChoices
        },
        {
            name: 'manager_id',
            type: 'list',
            message: 'Select the manager (You can select None initially and update later to be self-managed):',
            choices: managerChoices
        }
    ]);

    // insert employee into the database
    const res = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id', [first_name, last_name, role_id, manager_id]);
    const employeeId = res.rows[0].id;
    
    // If self manager then update the manager_id to the employee's own ID
    if (manager_id === null) {
        const { self_managed } = await inquirer.prompt([
            {
                name: 'self_managed',
                type: 'confirm',
                message: 'Is this employee their own manager?',
                default: false
            }
        ]);
        
        if (self_managed) {
            await db.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [employeeId, employeeId]);
            console.log(`${first_name} ${last_name} is now their own manager.`);
        }
    }

    console.log(`Added employee: ${first_name} ${last_name}`);
};


// Function to update an employee's role
const updateEmployeeRole = async () => {
    const employees = await db.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { employee_id, role_id } = await inquirer.prompt([
        {
            name: 'employee_id',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employeeChoices
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'Select the new role:',
            choices: roleChoices
        }
    ]);

    // Update the employee's role
    await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);

    // Prompt to select a manager
    const { manager_id } = await inquirer.prompt([
        {
            name: 'manager_id',
            type: 'list',
            message: 'Select the manager:',
            choices: [...employeeChoices, { name: 'None', value: null }]
        }
    ]);

    if (manager_id === null) {
        const { self_managed } = await inquirer.prompt([
            {
                name: 'self_managed',
                type: 'confirm',
                message: 'Do you want this employee to be their own manager?',
                default: false
            }
        ]);
        
        if (self_managed) {
            await db.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [employee_id, employee_id]);
            console.log(`Updated employee role and set ${employee_id} as their own manager.`);
        } else {
            await db.query('UPDATE employee SET manager_id = NULL WHERE id = $1', [employee_id]);
            console.log(`Updated employee role without setting a manager.`);
        }
    } else {
        await db.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
        console.log(`Updated employee role and set manager to ${manager_id}.`);
    }
};


// Define main menu options and their corresponding functions
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

// Start the application
mainMenu();
