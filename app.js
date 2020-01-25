const mysql = require('mysql');
const inquirer = require('inquirer');
var columnify = require('columnify')

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
          console.log(columnify(res));
          init();
     });
}

function viewRoles() {
     var query = "SELECT role_id, role_title FROM role";
     connection.query(query, function (err, res) {
          if (err) throw err;
          console.log(columnify(res));
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
          console.log(columnify(res));
          init();
     });
}

function viewEmployeesByDepartment() {
     var query = "SELECT department_id as value, department_name as name FROM department";
     connection.query(query, function (err, res) {
          if (err) throw err;
          let array = JSON.parse(JSON.stringify(res));
          console.log(array); 
     });

//      inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//         if (err) throw err;
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
}

function viewEmployeesByManager() {

}

function viewBudget() {

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

}


// const obj = [
//      {
//           name: 'ali',
//           value: 1
//      },
//      {
//           name: 'veli',
//           value: 2
//      }
// ]

// inquirer
//      .prompt([
//           {
//                type: 'list',
//                name: 'employee',
//                message: 'Which is better?',
//                choices: obj,
//           },
//      ])
//      .then(answers => {
//           console.info('Answer:', answers.employee);
//      });