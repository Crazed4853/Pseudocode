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
    else if (command.startsWith("store input as")) {
        const varName = parts[-1]
        const userInput = prompt(`Enter a value for ${varName}:`); // Prompt the user for input
        
        // Convert input to a number if possible, otherwise store it as a string
        const value = isNaN(userInput) ? userInput : parseFloat(userInput);
        
        // Initialize the variable if it doesn't exist
        if (!variables.hasOwnProperty(varName)) {
            outputElement.textContent += `Initialized variable '${varName}'\n`;
        }
        
        // Store the input value in the variable
        variables[varName] = value;
        outputElement.textContent += `Stored input for '${varName}' with value ${value}\n`;
    } 
    // Handle the "store user input as" command
    else if (command.startsWith("store user input as")) {
        const varName = parts[-1]
        const userInput = prompt(`Enter a value for ${varName}:`); // Prompt the user for input
        
        // Convert input to a number if possible, otherwise store it as a string
        const value = isNaN(userInput) ? userInput : parseFloat(userInput);
        
        // Initialize the variable if it doesn't exist
        if (!variables.hasOwnProperty(varName)) {
            outputElement.textContent += `Initialized variable '${varName}'\n`;
        }
        
        // Store the input value in the variable
        variables[varName] = value;
        outputElement.textContent += `Stored input for '${varName}' with value ${value}\n`;
    } 
    // Handle the "output" command with combined strings and variables
    else if (command.startsWith("output")) {
        const argument = command.substring(7).trim(); // Extract the argument after "output"

        try {
            let outputMessage = argument;

            // Replace variables in the argument with their values
            for (const [varName, value] of Object.entries(variables)) {
                const varPattern = new RegExp(`\\b${varName}\\b`, "g"); // Match whole variable names
                outputMessage = outputMessage.replace(varPattern, value);
            }

            // Evaluate and process combined string/variable outputs
            if (outputMessage.includes('"')) {
                outputMessage = eval(outputMessage); // Process expressions with strings and variables
            }

            // Print the final combined output
            outputElement.textContent += `${outputMessage}\n`;
        } catch (e) {
            outputElement.textContent += `Error processing output: ${e}\n`;
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
