# Employee Tracker Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Watch the Demo Video](https://drive.google.com/file/d/1MuRrbUd_nv_AjxMX9bTRfLsfSfyLInjJ/view?usp=sharing)

## What is This Project?

This project is a Node.js application that manages a company's employee database using PostgreSQL.

- **Why Did I Make This?**: To improve my skills in Node.js, PostgreSQL, and creating command-line applications for managing database records.
- **What's in It?**: The application allows the user to view departments, roles, and employees; add new departments, roles, and employees; and update employee roles. The data is stored in a PostgreSQL database.
- **What Did I Learn?**: This project helped me learn more about creating command-line applications in Node.js, handling user input with Inquirer, and interacting with PostgreSQL databases using the `pg` package.

## Table of Contents

Explore the contents of this guide:

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To run this project locally:
1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies using `npm install`.
4. Set up the PostgreSQL database.

## Usage

1. Start the PostgreSQL server.
2. Create the database and set up the schema:
    ```bash
    psql -U postgres -c "CREATE DATABASE employee_tracker;"
    psql -U postgres -d employee_tracker -f db/schema.sql
    psql -U postgres -d employee_tracker -f db/seeds.sql
    ```
3. Update the `db/db.js` file with your PostgreSQL credentials:
    ```javascript
    const { Pool } = require('pg');

    const pool = new Pool({
        user: '',
        host: 'localhost',
        database: '',
        password: '',
        port: 5432,
    });

    module.exports = pool;
    ```
4. Run the application using the command:
    ```bash
    node index.js
    ```
5. Follow the prompts to:
    - View all departments, roles, and employees.
    - Add a new department, role, or employee.
    - Update an employee's role.

## Credits

A heartfelt thank you to my bootcamp instructors and peers for their continuous guidance and support. Special thanks to:

- [MDN Web Docs](https://developer.mozilla.org/en-US/) for their comprehensive resources on JavaScript and PostgreSQL.
- [Stack Overflow](https://stackoverflow.com/) for providing solutions to coding issues.
- [Node.js Documentation](https://nodejs.org/en/docs/) for detailed information on Node.js features.
- [Inquirer.js Documentation](https://www.npmjs.com/package/inquirer) for instructions on collecting user input in command-line applications.
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) for detailed information on PostgreSQL features and SQL syntax.

## License

MIT License 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Review

You are required to submit the following for review:

* A walkthrough video that demonstrates the functionality of the application and passing tests.
* The URL of the GitHub repository, with a unique name and a README describing the project.

Refer to the [Video Submission Guide](https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide) on the Full-Stack Blog for additional guidance on creating a video.
