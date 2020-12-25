//Wywołanie funkcji render wygeneruje widok na podstawie wybranego szablonu (pierwszy parametr funkcji 
// wskazuje na lokalizację szablonu względem folderu views, bez rozszerzenia .ejs). 
//Drugi parametr funkcji render umożliwia przekazanie danych mogących być użytymi w trakcie generowania strony. Na razie przekazujemy pusty obiekt.

exports.showVetsList = (req, res, next) => {
    res.render('pages/vets/vets', {navLocation: 'vets' });
}

exports.showAddVetForm = (req, res, next) => {
    res.render('pages/vets/vets-add', {navLocation: 'vets' });
}

exports.showEditVetForm = (req, res, next) => {
    res.render('pages/vets/vets-edit', {navLocation: 'vets' });
}
