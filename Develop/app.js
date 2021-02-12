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
let employeeArr = [],

const managerPrompt = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name:"managerName",
        },
        {
            type:"input",
            message: "What is your manager's id?",
            name:"id",
        },
        {
            type:"input",
            message: "What is your manager's email?",
            name:"email",
        },
        {
            type:"input",
            message: "What is your manager's office number?",
            name:"office",
        },
    ]).then (input => {
        const manager = new manager(input.managerName,input.id,input.email,input.office);
        employeeArr.push(manager);

        console.log(employeeArr);

        if (input.addCheck){
            addMember();
        }else {
            let inputData = render(employeeArr);
            fs.writeFile(outputPath,inputData, (err) => {
                if(err) throw err;
            });
        }
    })
}

const addMember = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add?",
            name:"memberType",
            choices : [ Engineer, Intern , "I dont want to add anymore team members" ]
        },
    ]).then (input =>{
        
        if (input.memberType === "Engineer") {
            employeePrompt();
        }else if 
           (input.memberType === "Intern"){
            internQuestion();
        }else {
            (input.memberType === "I dont want to add anymore team members"); {
                console.log("Done!");
                return;
            }
        }
    })
}

addMember();

const employeePrompt  = () => {
    inquirer.prompt([
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
            message: "What is your engineer's git hub username?",
            name:"username",
        },
        {
            type:"confirm",
            message: "What is your engineer's id?",
            name:"addCheck",
        },
    ]).then(input = () => {
        const engineer = new engineer(input.engineerName, input.id, input.email, input.username);
        employeeArr.push(engineer);

        console.log(employeeArr);

        if (input.addCheck){
            let inputData = render(employeeArr);
            fs.writeFile(outputPath,inputData, (err) => {
                if(err) throw err
            });
        }
    })
}

const intern = () => {
    inquirer.prompt([
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
    ]).then (input = () => {
        const intern = new intern (input.interName, input.id, input.email, input.school);
        if  (input.addCheck){
            let inputData = render(employeeArr);
            fs.writeFile(outputPath,inputData, (err) => {
                if(err) throw err
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
// for the provided `render` function to work! ```
