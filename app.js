const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: "root",
     password: "root",
     database: "employee_managerDB"
});

connection.connect(function (err) {
     if (err) throw err;
     init();
});

function init() {
     inquirer
          .prompt({
               name: "action",
               type: "rawlist",
               message: "What would you like to do?",
               choices: [
                    "View Departments",
                    "View Roles",
                    "View All Employees",
                    "View Employees by Department",
                    "View Employees by Manager",
                    "View The Total Utilized Budget of a Department",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "Remove Department",
                    "Remove Role",
                    "Remove Employee",
                    "Exit"
               ]
          })
          .then(function (answer) {
               switch (answer.action) {
                    case "View Departments":
                         viewDepartments();
                         break;

                    case "View Roles":
                         viewRoles();
                         break;

                    case "View All Employees":
                         viewEmployees();
                         break;

                    case "View Employees by Department":
                         viewEmployeesByDepartment();
                         break;

                    case "View Employees by Manager":
                         viewEmployeesByManager();
                         break;

                    case "View The Total Utilized Budget of a Department":
                         viewBudget();
                         break;

                    case "Add Department":
                         addDepartment();
                         break;

                    case "Add Role":
                         addRole();
                         break;

                    case "Add Employee":
                         addEmployee();
                         break;

                    case "Update Employee Role":
                         updateEmployeeRole();
                         break;

                    case "Update Employee Manager":
                         updateEmployeeManager();
                         break;

                    case "Remove Department":
                         removeDepartment();
                         break;

                    case "Remove Role":
                         removeRole();
                         break;

                    case "Remove Employee":
                         removeEmployee();
                         break;

                    case "Exit":
                         connection.end();
                         break;
               }
          });

}

function viewDepartments() {
     var query = "SELECT * FROM department";
     connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log("");
          init();
     });
}

function viewRoles() {
     var query = "SELECT role_id, role_title FROM role";
     connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res, ["role_id", "role_title"]);
          console.log("");
          init();
     });
}

function viewEmployees() {
     var query = "SELECT employee.first_name, employee.last_name, role.role_title, " +
          "department.department_name FROM employee " +
          "LEFT JOIN role on employee.role_id = role.role_id " +
          "LEFT JOIN department on role.department_id = department.department_id";
          connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log("");
          init();
     });
}

function viewEmployeesByDepartment() {
     let array = [];
     var query = "SELECT department_id as value, department_name as name FROM department";
     connection.query(query, function (err, res) {
          if (err) throw err;
          array = JSON.parse(JSON.stringify(res));

          inquirer
          .prompt({
               name: 'department',
               type: 'list',
               message: 'Which department\'s employees do you want to see?',
               choices: array
          })
          .then(function (answer) {
               connection.query("SELECT employee.first_name, employee.last_name, role.role_title," +
                    "department.department_name FROM employee LEFT JOIN role on employee.role_id = " +
                    "role.role_id LEFT JOIN department on role.department_id = department.department_id " +
                    "WHERE department.department_id = ?", [ answer.department] , function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    console.log("");
                    init();
               });    
          }); 
     });    
}

function viewEmployeesByManager() {
     let array = [];
     var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name " + 
     "FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1";
     connection.query(query, function (err, res) {
          if (err) throw err;
          array = JSON.parse(JSON.stringify(res));
          console.log(array); 

          inquirer
          .prompt({
               name: 'manager',
               type: 'list',
               message: 'Which department\'s employees do you want to see?',
               choices: array
          })
          .then(function (answer) {
               connection.query("SELECT employee.employee_id, employee.first_name, employee.last_name " +
                    "FROM employee WHERE manager_id = ?", [ answer.manager] , function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    console.log("");
                    init();
               });    
          }); 
     });
}

function viewBudget() {
     let array = [];
     var query = "SELECT department_id as value, department_name as name FROM department";
     connection.query(query, function (err, res) {
          if (err) throw err;
          array = JSON.parse(JSON.stringify(res));

          inquirer
          .prompt({
               name: 'department',
               type: 'list',
               message: 'Which department\'s budget do you want to see?',
               choices: array
          })
          .then(function (answer) {
               connection.query("SELECT role.department_id, department.department_name, " + 
                    "SUM(role.role_salary) FROM role INNER JOIN department on " + 
                    "role.department_id = department.department_id WHERE role.department_id = ?", [ answer.department] , function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    console.log("");
                    init();
               });    
          }); 
     }); 
}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployeeRole() {

}

function updateEmployeeManager() {

}

function removeDepartment() {

}

function removeRole() {

}

function removeEmployee() {
     const obj = [
          {
               name: 'ali',
               id: 1
          },
          {
               name: 'veli',
               id: 2
          }
     ]

     inquirer
          .prompt([
               {
                    type: 'list',
                    name: 'employee',
                    message: 'Which is better?',
                    choices: obj,
               },
          ])
          .then(answers => {
               console.info('Answer:', answers.employee);
          });
}


