let variables = {};

function interpretCommand(command) {
    const outputElement = document.getElementById('output');
    
    if (command.startsWith("store input as")) {
        let varName = command.split(" ").pop();
        let userInput = prompt(`Enter a value for ${varName}:`);
        if (!isNaN(userInput)) {
            userInput = parseFloat(userInput);
        }
        variables[varName] = userInput;
    } 
    else if (command.startsWith("output")) {
        let varName = command.split(" ").pop();
        if (variables.hasOwnProperty(varName)) {
            outputElement.textContent += `The value of ${varName} is: ${variables[varName]}\n`;
        } else {
            outputElement.textContent += `Error: Variable '${varName}' not defined.\n`;
        }
    } 
    else if (command.includes(" = ")) {
        let [varName, expression] = command.split(" = ");
        varName = varName.trim();
        expression = expression.trim();

        for (let key in variables) {
            expression = expression.replace(new RegExp(`\\b${key}\\b`, 'g'), variables[key]);
        }

        try {
            variables[varName] = eval(expression);
        } catch (e) {
            outputElement.textContent += `Error evaluating expression: ${e}\n`;
        }
    } 
    else {
        outputElement.textContent += `Unknown command: ${command}\n`;
    }
}

function runInterpreter() {
    const pseudocodeInput = document.getElementById('pseudocodeInput').value;
    const commands = pseudocodeInput.split("\n");
    document.getElementById('output').textContent = "";  // Clear previous output

    commands.forEach(command => {
        interpretCommand(command.trim());
    });
}
