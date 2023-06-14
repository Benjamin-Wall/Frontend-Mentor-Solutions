class Calculator {
	constructor(calculatorDisplayPrimary, calculatorDisplaySecondary) {
		this.calculatorDisplayPrimary = calculatorDisplayPrimary;
		this.calculatorDisplaySecondary = calculatorDisplaySecondary;
		this.clear();
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") this.compute();

		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;

		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;

			case "-":
				computation = prev - current;
				break;

			case "*":
				computation = prev * current;
				break;

			case "/":
				computation = prev / current;
				break;

			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.calculatorDisplayPrimary.innerText = this.getDisplayNumber(this.currentOperand);

		if (this.operation != null) {
			this.calculatorDisplaySecondary.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.calculatorDisplaySecondary.innerText = "";
		}
	}
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

const equalsButton = document.getElementById("equals");
const deleteButton = document.getElementById("delete");
const resetButton = document.getElementById("reset");

const calculatorDisplaySecondary = document.getElementById("calculator-display-secondary");
const calculatorDisplayPrimary = document.getElementById("calculator-display-primary");

const radioButton = document.querySelectorAll("input[type=radio]");

const calculator = new Calculator(calculatorDisplayPrimary, calculatorDisplaySecondary);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

resetButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});

radioButton.forEach((button) => {
	button.addEventListener("click", () => {
		let prevTheme = document.body.classList[0];
		document.body.classList.remove(prevTheme);
		document.body.classList.add(`theme-${button.id}`);
	});
});
