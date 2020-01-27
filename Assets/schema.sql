DROP DATABASE IF EXISTS employee_managerDB;
CREATE database employee_managerDB;

USE employee_managerDB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE role(
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL(8,0) NULL,
  department_id INT NOT NULL,
  manager BOOLEAN NOT NULL default 0, 
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id),
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);

/* View All Employees */

SELECT employee.first_name, employee.last_name, role.role_title,
department.department_name FROM employee 
LEFT JOIN role on employee.role_id = role.role_id
LEFT JOIN department on role.department_id = department.department_id;



/* View All Employees by Department */

SELECT employee.first_name, employee.last_name, role.role_title,
department.department_name FROM employee 
LEFT JOIN role on employee.role_id = role.role_id
LEFT JOIN department on role.department_id = department.department_id
WHERE department.department_id = ?;

/* View All Employees by Manager */

SELECT employee.employee_id, employee.first_name, employee.last_name
FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1;

SELECT employee.employee_id, employee.first_name, employee.last_name
FROM employee WHERE manager_id = ?;  

/* Adding Employee */
/* What is the employee's first name */
/* What is the employee's last name */
/* What is the employee's role */
SELECT role_id, role_title FROM role;
/* Who is the employee's manager */
SELECT employee.employee_id, employee.first_name, employee.last_name
FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?);

/* Remove Employee */
/* Which employee do you want to remove */

DELETE from employee WHERE employee_id = ?;

/* Update Employee Role */
/* Which employee's role do you want to update? */
/* Which role is going to be the new role? */
UPDATE employee SET role_id = ? WHERE employee_id = ?;

/* Update Employee Manager */
/* Which employee's manager do you want to update? */
/* Which manager is going to be the new manager? */
UPDATE employee SET manager_id = ? WHERE employee_id = ?;