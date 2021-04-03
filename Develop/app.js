const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employeeArr = [];

// Prompt to add a team member 
const addMember = [
    {
      type: "list",
      name: "role",
      message: "Please select the role of the employee:?",
      choices: [
        "Engineer",
        "Intern",
        "Manager",
        "Complete roster, no employees left to add.",
      ],
    },
];

const managerPrompt = [
    {
        type: "input",
        message: "Please enter manager's name:",
        name: "managerName",
    },
    {
        type: "input",
        message: "Please enter manager's ID number:",
        name: "id",
    },
    {
        type: "input",
        message: "Please enter manager's email address:",
        name: "email",
    },
    {
        type: "input",
        message: "Please enter manager's office number:",
        name: "officeNum",
    },
    
];

const engineerPrompt = [
    {
        type:"input",
        message: "What is your engineer's name?",
        name:"engineerName",
    },
    {
        type:"input",
        message: "What is your engineer's id?",
        name:"id",
    },
    {
        type:"input",
        message: "What is your engineer's email?",
        name:"email",
    },
    {
        type:"input",
        message: "What is your engineer's github username?",
        name:"username",
    },
];

const internPrompt = [
    {
        type:"input",
        message: "What is your intern's name?",
        name:"internName",
    },

    {
        type:"input",
        message: "What is your intern's id?",
        name:"id",
    },
    {
        type:"input",
        message: "What is your intern's email?",
        name:"email",
    },
    {
        type:"input",
        message: "What is your intern's school?",
        name:"school",
    },
];

createTeam();

function createTeam() {
    inquirer.prompt (addMember)
     .then(function(userInput) {
         return(userInput);
        })
     .then (function (userInput) {
        if(userInput.role === "Manager") {
            inquirer.prompt(managerPrompt).then((userInput) => {
                var addedManager = new Manager(userInput.managerName,userInput.id,userInput.email,userInput.officeNum);
                employeeArr.push(addedManager);        
                createTeam();
            })
        } 
        else if (userInput.role === "Engineer") {
            inquirer.prompt(engineerPrompt).then((response) => {

                var addedEngineer = new Engineer(response.engineerName,response.id,response.email,response.username);
                employeeArr.push(addedEngineer)
                createTeam();
            })       
        }
        else if (userInput.role === "Intern") {
            inquirer.prompt(internPrompt).then((response) => {

                var addedIntern = new Intern(response.internName,response.id,response.email,response.school);
                employeeArr.push(addedIntern)
                createTeam();      
            })

        }else {
            var createdPage = render(employeeArr);
            fs.writeFile(outputPath,createdPage , (err) => {
                if (err) throw err;
                console.log('Team page has been created')
            });
        }
    })
            
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to wor
