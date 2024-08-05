const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square } = require("./lib/shapes");

const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter text for the logo (up to 3 characters):",
    validate: (input) =>
      input.length <= 3 || "Text must be 3 characters or less.",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter text color (color keyword or hexadecimal):",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose a shape for the logo:",
    choices: ["Circle", "Triangle", "Square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter shape color (color keyword or hexadecimal):",
  },
];

function generateSVG({ text, textColor, shape, shapeColor }) {
  let svgShape;
  switch (shape) {
    case "Triangle":
      svgShape = new Triangle();
      break;
    case "Circle":
      svgShape = new Circle();
      break;
    case "Square":
      svgShape = new Square();
      break;
  }
  svgShape.setColor(shapeColor);

  const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${svgShape.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
`;
  fs.writeFileSync("logo.svg", svgContent);
  console.log("Generated logo.svg");
}

inquirer.prompt(questions).then((answers) => {
  generateSVG(answers);
});
