var keys = document.querySelectorAll('#calculator span'),
		operators = ['+', '-', '*', '/'],
		decimalAdded = false;

// Add onclick to all keys
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		var screen = document.querySelector('.screen');
		var screenVal = screen.innerHTML;
		var keyVal = this.innerHTML;

		// Clear all results
		if(keyVal == 'C') {
			screen.innerHTML = '';
			decimalAdded = false;
		}

		// Eval
		else if(keyVal == '=') {
			var equation = screenVal;
			var lastChar = equation[equation.length - 1];

			// Replace operator symbols with the actual operator
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			// Remove last character if it's a decimal or 0
			if(operators.indexOf(lastChar) > -1 || lastChar == '.') {
				equation = equation.replace(/.$/, '');
			}
			if(equation) {
				screen.innerHTML = eval(equation);
			}
			decimalAdded = false;
		}

		// Operators
		else if(operators.indexOf(keyVal) > -1) {
			var lastChar = screenVal[screenVal.length - 1];

			// Only add operator if screen is blank and last char is not a operator
			if(screenVal != '' && operators.indexOf(lastChar) == -1)
				screen.innerHTML += keyVal;

			// Except for negative
			else if(screenVal == '' && keyVal == '-')
				screen.innerHTML += keyVal;

			// Replace the last operator with clicked one
			if(operators.indexOf(lastChar) > -1 && screenVal.length > 1) {
				screen.innerHTML = screenVal.replace(/.$/, keyVal);
			}
			decimalAdded = false;
		}

		// Decimals
		else if(keyVal == '.') {
			if(!decimalAdded) {
				screen.innerHTML += keyVal;
				decimalAdded = true;
			}
		}

		// Add value to screen
		else {
			screen.innerHTML += keyVal;
		}

		// prevent page jumps
		e.preventDefault();
	}
}
