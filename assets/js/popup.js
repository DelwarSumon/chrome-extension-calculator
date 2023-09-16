document.addEventListener('DOMContentLoaded', function () {
  let output = document.getElementById('output');
  let lastKeyPressTime = 0;
  // Define a mapping of keyboard keys to calculator button IDs
  const keyToButtonId = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '.': 'dot',
    'Enter': 'equal', // 'Enter' key maps to the '=' button
    'Escape': 'clear', // 'Escape' key maps to the 'C' button
  };

  function appendToOutput(value) {
    output.value += value;
  }

  function clearOutput() {
    output.value = '';
  }

  function calculateResult() {
    try {
      const result = math.evaluate(output.value);
      output.value = result.toString();
    } catch (error) {
      console.log(error);
      output.value = 'Error';
    }
  }

  // Attach event listeners for keyboard input
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;
    console.log(key)

    // Check if the pressed key maps to a calculator button
    if (keyToButtonId[key]) {
      const buttonId = keyToButtonId[key];
      const button = document.getElementById(buttonId);

      // Highlight the button by changing its background color
      if (button) {
        button.style.backgroundColor = '#ccc'; // Change to your desired highlight color
        button.style.color = '#fff'; // Change text color for better visibility
        button.style.filter = 'brightness(1.2)'; 
      }

      // Simulate a button click by triggering a click event
      if (buttonId !== 'equal' && buttonId !== 'clear') {
        appendToOutput(key);
      } else if (buttonId === 'equal') {
        calculateResult();
      } else if (buttonId === 'clear') {
        const currentTime = new Date().getTime();
        if (currentTime - lastKeyPressTime < 300) {
          // Close the extension on double-click (within 300 milliseconds)
          window.close();
        } else {
          clearOutput();
        }
        lastKeyPressTime = currentTime;
      }

      // Prevent the default behavior of the key press
      event.preventDefault();
    } else {
      if (key === 'Backspace') {
        // Handle Backspace to clear the last typed character
        output.value = output.value.slice(0, -1);
      }
    }
  });

  // Listen for keyup events on the document to remove the highlight
  document.addEventListener('keyup', (event) => {
    const key = event.key;
    const buttonId = keyToButtonId[key];

    // Check if the pressed key maps to a calculator button
    if (buttonId) {
      const button = document.getElementById(buttonId);
      // Remove the highlight by resetting the background color
      if (button) {
        button.style.backgroundColor = ''; // Reset to the default button color
        button.style.color = ''; // Reset to the default text color
        button.style.filter = 'brightness(1)'; 
      }
    }
  });

  // Attach event listeners
  document.getElementById('clear').addEventListener('click', clearOutput);
  document.getElementById('seven').addEventListener('click', () => appendToOutput('7'));
  document.getElementById('eight').addEventListener('click', () => appendToOutput('8'));
  document.getElementById('nine').addEventListener('click', () => appendToOutput('9'));
  document.getElementById('add').addEventListener('click', () => appendToOutput('+'));
  document.getElementById('four').addEventListener('click', () => appendToOutput('4'));
  document.getElementById('five').addEventListener('click', () => appendToOutput('5'));
  document.getElementById('six').addEventListener('click', () => appendToOutput('6'));
  document.getElementById('subtract').addEventListener('click', () => appendToOutput('-'));
  document.getElementById('one').addEventListener('click', () => appendToOutput('1'));
  document.getElementById('two').addEventListener('click', () => appendToOutput('2'));
  document.getElementById('three').addEventListener('click', () => appendToOutput('3'));
  document.getElementById('multiply').addEventListener('click', () => appendToOutput('*'));
  document.getElementById('zero').addEventListener('click', () => appendToOutput('0'));
  document.getElementById('dot').addEventListener('click', () => appendToOutput('.'));
  document.getElementById('equal').addEventListener('click', calculateResult);
  document.getElementById('divide').addEventListener('click', () => appendToOutput('/'));
});
