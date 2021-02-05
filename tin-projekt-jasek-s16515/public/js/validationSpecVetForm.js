
//dodaj specjalizację do weta - walidacja formularza
function validateForm() {

    const vetInput = document.getElementById('vet');
    const specInput = document.getElementById('spec');
    const dateFromInput = document.getElementById('dateFrom');
    const priceInput = document.getElementById('price');

    const errorVet = document.getElementById('errorVet');
    const errorSpec = document.getElementById('errorSpec');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorPrice = document.getElementById('errorPrice');
    const errorsSummary = document.getElementById('errorsSummary'); 
    console.log('jestem tu');
    
    resetErrors([dateFromInput, priceInput], [errorDateFrom, errorPrice], errorsSummary);
    
    //buduję aktualną datę
    let valid = true;
    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.dateFrom(),
    year = nowDate.getFullYear();
    yearPlus = nowDate.getFullYear() +1;
    yearMinus = nowDate.getFullYear() -80;

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const pastString = [yearMinus, month, day].join('-');
    const nextYearString = [yearPlus, month, day].join('-');

    //zaczynam sprawdzanie warunków

    if (!checkRequired(vetInput.value)) {
        valid = false;
        vetInput.classList.add("error-input");
        errorVet.innerText = "Pole jest wymagane";
    }
    if (!checkRequired(specInput.value)) {
        valid = false;
        employeeInput.classList.add("error-input");
        errorSpec.innerText = "Pole jest wymagane";
    }
    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } 


    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if (checkDateIfAfter(dateFromInput.value, nextYearString)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie może być z więcej niż rok do przodu";
    } else if (checkDateIfAfter(pastString, dateFromInput.value)) {
        //jeśli data jest o 80+ lat do tylu to za duzo
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie powinna być późniejsza niż 80 lat temu";
    }

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    } else if (!checkNumber(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(priceInput.value, 20, 1000)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno być liczbą w zakresie od 20 do 1 000";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
 