let variables = {}; // Dictionary to store variables

function interpretCommand(command) {
    const outputElement = document.getElementById('output');
    
    // Handle the "set" command
    if (command.startsWith("set")) {
        let parts = command.split("=");
        if (parts.length === 2) {
            let varName = parts[0].replace("set", "").trim(); // Extract variable name
            let value = parts[1].trim(); // Extract value
            
            // Try to convert value to number if possible
            if (!isNaN(value)) {
                value = parseFloat(value);
            }
            
            // Define and initialize the variable
            variables[varName] = value;
            outputElement.textContent += `Defined variable '${varName}' and set it to ${value}\n`;
        } else {
            outputElement.textContent += `Error: Invalid 'set' command format.\n`;
        }
    } 
    // Handle the "store input as" command
    else if (command.startsWith("store input as")) {
        let varName = command.split(" ").pop();
        let userInput = prompt(`Enter a value for ${varName}:`);
        if (!isNaN(userInput)) {
            userInput = parseFloat(userInput);
        }
        // Define the variable
        variables[varName] = userInput;
        outputElement.textContent += `Stored input for '${varName}' with value ${userInput}\n`;
    } 
    // Handle the "output" command
    else if (command.startsWith("output")) {
        let varName = command.split(" ").pop();
        if (variables.hasOwnProperty(varName)) {
            outputElement.textContent += `The value of ${varName} is: ${variables[varName]}\n`;
        } else {
            outputElement.textContent += `Error: Variable '${varName}' not defined.\n`;
        }
    } 
    // Handle arithmetic and assignment
    else if (command.includes(" = ") && !command.startsWith("set")) {
        let [varName, expression] = command.split(" = ");
        varName = varName.trim();
        expression = expression.trim();

        // Replace variable names in the expression with their values
        for (let key in variables) {
            expression = expression.replace(new RegExp(`\\b${key}\\b`, 'g'), variables[key]);
        }

        try {
            // Define and assign the variable
            variables[varName] = eval(expression);
            outputElement.textContent += `Set variable '${varName}' to ${variables[varName]}\n`;
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
    document.getElementById('output').textContent = ""; // Clear previous output

    commands.forEach(command => {
        interpretCommand(command.trim());
    });
}
