let variables = {}; // Dictionary to store variables

function interpretCommand(command) {
    const outputElement = document.getElementById('output');
    
    // Handle the "set" command
    if (command.startsWith("set")) {
        const parts = command.split("=");
        if (parts.length === 2) {
            const varName = parts[0].replace("set", "").trim(); // Extract variable name
            let value = parts[1].trim(); // Extract value
            
            // Try to convert value to a number if possible
            if (!isNaN(value)) {
                value = parseFloat(value);
            }
            
            // Define and initialize the variable
            variables[varName] = value;
            outputElement.textContent += `Defined variable '${varName}' and set it to ${value}\n`;
        } else {
            outputElement.textContent += `Error: Invalid 'set' command format. Use 'set <variable> = <value>'.\n`;
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
        const argument = command.substring(7).trim(); // Extract the argument after "output"
        if (argument.startsWith('"') && argument.endsWith('"')) {
            // Print a string literal
            const message = argument.slice(1, -1); // Remove surrounding quotes
            outputElement.textContent += `${message}\n`;
        } else if (variables.hasOwnProperty(argument)) {
            // Print a variable's value
            outputElement.textContent += `The value of ${argument} is: ${variables[argument]}\n`;
        } else {
            outputElement.textContent += `Error: Variable '${argument}' not defined or invalid format.\n`;
        }
    } 
    // Handle arithmetic and assignment
    else if (command.includes(" = ") && !command.startsWith("set")) {
        const [varName, expression] = command.split(" = ");
        const trimmedVarName = varName.trim();
        let trimmedExpression = expression.trim();

        // Replace variable names in the expression with their values
        for (const key in variables) {
            trimmedExpression = trimmedExpression.replace(new RegExp(`\\b${key}\\b`, 'g'), variables[key]);
        }

        try {
            // Define and assign the variable
            variables[trimmedVarName] = eval(trimmedExpression);
            outputElement.textContent += `Set variable '${trimmedVarName}' to ${variables[trimmedVarName]}\n`;
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
        if (command.trim() !== "") {
            interpretCommand(command.trim());
        }
    });
}
