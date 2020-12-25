
//dodaj specjalizację - walidacja formularza
function validateForm() {

    const getSpecInput = document.getElementById('specName');
    const minSalInput = document.getElementById('minSal');

    const errorGetSpec = document.getElementById('errorSpecName');
    const errorMinSal = document.getElementById('errorMinSal');
    const errorsSummary = document.getElementById('errorsSummary'); 
    
    resetErrors([getSpecInput, minSalInput], [errorGetSpec, errorMinSal], errorsSummary);
    
    let valid = true;

    if (!checkRequired(getSpecInput.value)) {
        valid = false;
        getSpecInput.classList.add("error-input");
        errorGetSpec.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(getSpecInput.value, 2, 60)) {
        valid = false;
        getSpecInput.classList.add("error-input");
        errorGetSpec.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(minSalInput.value)) {
        valid = false;
        minSalInput.classList.add("error-input");
        errorMinSal.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(minSalInput.value, 2, 7)) {
        valid = false;
        minSalInput.classList.add("error-input");
        errorMinSal.innerText = "Pole powinno zawierać od 2 do 7 znaków";
    } else if (!checkCost(minSalInput.value)) {
        valid = false;
        minSalInput.classList.add("error-input");
        errorMinSal.innerText = "Zły format danych";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}