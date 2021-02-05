//dodaj specjalizację - walidacja formularza
function validateForm() {

    const nameInput = document.getElementById('name');
    const minSalaryInput = document.getElementById('minSalary');

    const errorName = document.getElementById('errorName');
    const errorMinSalary = document.getElementById('errorMinSalary');
    const errorsSummary = document.getElementById('errorsSummary'); 
    
    resetErrors([nameInput, minSalaryInput], [errorName, errorMinSalary], errorsSummary);
    
    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(minSalaryInput.value)) {
        valid = false;
        minSalaryInput.classList.add("error-input");
        errorMinSalary.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(minSalaryInput.value, 4, 8)) {
        valid = false;
        minSalaryInput.classList.add("error-input");
        errorMinSalary.innerText = "Pole powinno zawierać od 4 do 8 znaków";
    } else if (!checkNumber(minSalaryInput.value)) {
        valid = false;
        minSalaryInput.classList.add("error-input");
        errorMinSalary.innerText = "Zły format danych";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}