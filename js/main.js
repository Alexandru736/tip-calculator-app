const billAmountInput = document.querySelector('.dollar');
const numberOfPeopleInput = document.querySelector('.person');
const tipButtons = document.querySelectorAll('.tip-button');
const tipCustomInput = document.querySelector('.custom-tip');
const resetButton = document.querySelector('.btn');
const tipAmountDisplay = document.querySelector('.tip-amount');
const totalAmountDisplay = document.querySelector('.total-amount');
const errorMessage = document.querySelector('.error-message');

let billAmount = 0;
let numberOfPeople = 0;
let tipValue = 0;

billAmountInput.addEventListener('input', (e) => billAmountHandle());

numberOfPeopleInput.addEventListener('input', (e) => numberOfPeopleHandle());

tipButtons.forEach(button => {
    button.addEventListener('click', (e) => tipButtonHandle(e));
});

['input', 'click'].forEach(eventType => {
    tipCustomInput.addEventListener(eventType, (e) => tipCustomInputHandle());
})

resetButton.addEventListener('click', (e) => reset());

function billAmountHandle() {
    billAmount = parseFloat(billAmountInput.value);
    enableReset();
    calculateAmounts();
}

function numberOfPeopleHandle() {
    numberOfPeople = parseFloat(numberOfPeopleInput.value);
    enableReset();
    calculateAmounts();
}

function tipButtonHandle(event) {
    tipCustomInput.value = "";

    tipButtons.forEach(button => {
        button.classList.remove('selected');
        if(button.innerHTML === event.currentTarget.innerHTML) {
            button.classList.add('selected');
            tipValue = parseFloat(button.innerHTML) / 100;
        }
    });

    enableReset();
    calculateAmounts();
}

function tipCustomInputHandle() {
    tipButtons.forEach(button => {
        button.classList.remove('selected');
    });
    tipValue = parseFloat(tipCustomInput.value) / 100;
    if(isNaN(tipValue)) {
        tipValue = 0;
    }
    
    enableReset();
    calculateAmounts();
}

function reset() {
    billAmount = 0;
    numberOfPeople = 0;
    tipValue = 0;
    resetButton.disabled = true;

    numberOfPeopleInput.value = "";
    billAmountInput.value = "";
    tipButtons.forEach(button => {
        button.classList.remove('selected');
    });
    tipCustomInput.value = "";
    tipAmountDisplay.textContent = "0.00$";
    totalAmountDisplay.textContent = "0.00$";
    errorMessage.setAttribute('aria-hidden', 'true');
    numberOfPeopleInput.setAttribute('aria-hidden', 'true');
}

function enableReset() {
    resetButton.disabled = false;
}

function validateAmounts() {
    if(!validateBillAmount()) return false;
    if(!validateTipValue()) return false;
    if(!validateNumberOfPeople()) return false;
    return true;
}

function validateBillAmount() {
    if(billAmount <= 0) return false;
    return true;
}

function validateTipValue() {
    if(tipCustomInput.value < 0) return false;
    return true;
}

function validateNumberOfPeople() {
    if (numberOfPeople <= 0 || isNaN(numberOfPeople)) {
        errorMessage.setAttribute('aria-hidden', 'false');
        numberOfPeopleInput.setAttribute('aria-hidden', 'false');
        return false;
    } else {
        errorMessage.setAttribute('aria-hidden', 'true');
        numberOfPeopleInput.setAttribute('aria-hidden', 'true');
        return true;
    }
}

function calculateAmounts() {
    if(!validateAmounts()) return;
    tipAmountDisplay.textContent = parseFloat(billAmount * tipValue / numberOfPeople).toFixed(2);
    totalAmountDisplay.textContent = parseFloat(billAmount * (1 + tipValue) / numberOfPeople).toFixed(2);
}




