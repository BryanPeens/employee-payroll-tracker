// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// ========================================================================== Get Employees
// Collect employee data
window.employees = []; // Initialize an empty array to store employee data

const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  
  // Loop until the user decides to end it
  while (true) {
    let firstName = prompt("Enter first name: "); // Prompt user to enter name
    let lastName = prompt("Enter last name: "); // Prompt user to enter lastname
    let salary = prompt("Enter salary: "); // Prompt user to enter salary

    // Create an object for the employee, using the data a user input
    let employee = {
      firstName: firstName,
      lastName: lastName,
      salary: parseFloat(salary) || 0.0, // Convert salary to a float, undifined will be ignored and use 0 ( NaN || 0 ) 
    };
    window.employees.push(employee); // Add the employee object to the array

    // use sortEmployee function to sort employee list
    window.employees = sortEmployees(window.employees);

    let doNext = confirm("Do you want to add another employee?"); // Prompt user to enter another employee
    if (!doNext) {
      break; // If not create another employee
    }
  }
  console.log(window.employees);
  return window.employees;
};

// Function to sort employees
const sortEmployees = function(employeesArray) {

  // order an array of objects with name
  employeesArray.sort(function (employeeA, employeeB) {
    if (employeeA.lastName < employeeB.lastName) {
      return -1; // if employeeA lastname is earlier in the alphabet than employeeB, move to top
    }
    if (employeeA.lastName > employeeB.lastName) {
      return 1; // if employeeA lastname is later in the alphabet than employeeB, move to back 
    }
    return 0; // equal stays at the same place
  });

  return employeesArray;
}

// ========================================================================== Average Salary
// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
  let totalSalary = 0; // Variable to store the total salary

  // Loop through each employee in array
  for (let employee of employeesArray) {
    totalSalary += employee.salary; // Update total salary with each employee's salary
  }

  const averageSalary = totalSalary / (employeesArray.length || 1); // Do not divide by 0
  const displayAverage = document.querySelector("#average-salary"); // Display average salary in an element

  // Do formatting on the salary
  displayAverage.textContent =
    "The average employee salary is: " +
    averageSalary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    // Print employee count and average salary
    let countEmployees = employeesArray.length; 
    // Keep this in one line to avoid odd space in dev console
    console.log(`The average employee salary between our ${countEmployees} employees is: ${averageSalary.toLocaleString("en-US", { 
      style: "currency",
      currency: "USD",
    })}`);

  // I added <p id="average-salary></p>" in the HTML to get rid of the Uncaught TypeError 
  // Uncaught TypeError: Cannot set properties of null (setting 'textContent')
};

// ========================================================================== Get Random Employees
// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  let rondomEmployee = Math.floor(Math.random() * employeesArray.length); // Random for the employeesArray length
  let newRandomEmployee = employeesArray[rondomEmployee];

  console.log(`Congratulations to ${newRandomEmployee.firstName} ${newRandomEmployee.lastName}, our random draw winner!`);
};

/*
  ========================================================================== STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
