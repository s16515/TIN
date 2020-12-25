
//dodaj specjalizację do weta - walidacja formularza
function validateForm() {

    const getDateInput = document.getElementById('getdate');
    const costInput = document.getElementById('cost');

    const errorGetDate = document.getElementById('errorGetDate');
    const errorCost = document.getElementById('errorCost');
    const errorsSummary = document.getElementById('errorsSummary'); 
    
    resetErrors([getDateInput, costInput], [errorGetDate, errorCost], errorsSummary);
    
    //buduję aktualną datę
    let valid = true;
    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
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

    if (!checkRequired(getDateInput.value)) {
        valid = false;
        getDateInput.classList.add("error-input");
        errorGetDate.innerText = "Pole jest wymagane";
    } 


    if (!checkRequired(getDateInput.value)) {
        valid = false;
        getDateInput.classList.add("error-input");
        errorGetDate.innerText = "Pole jest wymagane";
    } else if (checkDateIfAfter(getDateInput.value, nextYearString)) {
        valid = false;
        getDateInput.classList.add("error-input");
        errorGetDate.innerText = "Data nie może być z więcej niż rok do przodu";
    } else if (checkDateIfAfter(pastString, getDateInput.value)) {
        //jeśli data jest o 80+ lat do tylu to za duzo
        valid = false;
        getDateInput.classList.add("error-input");
        errorGetDate.innerText = "Data nie powinna być późniejsza niż 80 lat temu";
    }

    if (!checkRequired(costInput.value)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = "Pole jest wymagane";
    } else if (!checkNumber(costInput.value)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(costInput.value, 2000, 1_000_000)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = "Pole powinno być liczbą w zakresie od 2000 do 1000000";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
