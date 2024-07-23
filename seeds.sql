--initial data inserted for 'department' table
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');

-- initial data insertied for 'role' table
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 70000, 1),
('Salesperson', 50000, 1),
('Engineer', 80000, 2),
('Finance Manager', 75000, 3),
('Accountant', 55000, 3);
