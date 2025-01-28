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
            
            variables[varName] = value; // Store the variable
            outputElement.textContent += `Set variable '${varName}' to ${value}\n`;
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
        variables[varName] = userInput;
    } 
    // Handle the "output" command
    else if (command.startsWith("output")) {
        let varName = command.split(" ").pop();
        if (variables.hasOwnProperty(varName)) {
            outputElement.textContent += `The value of
