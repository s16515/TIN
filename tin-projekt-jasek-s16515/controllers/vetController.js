//Wywołanie funkcji render wygeneruje widok na podstawie wybranego szablonu (pierwszy parametr funkcji 
// wskazuje na lokalizację szablonu względem folderu views, bez rozszerzenia .ejs). 
//Drugi parametr funkcji render umożliwia przekazanie danych mogących być użytymi w trakcie generowania strony. Na razie przekazujemy pusty obiekt.

const VetRepository = require('../repository/mysql2/VetRepository');
const SpecRepository = require('../repository/mysql2/SpecRepository');


exports.addVet = (req, res, next) => {
    const vetData = { ...req.body };
    VetRepository.createVet(vetData)
        .then( result => {
            res.redirect('/vets');
        })
        .catch(err => {
            
            res.render('pages/vets/vets-form', {
                vet: vetData,
                pageTitle: 'Dodaj weterynarza',
                pageTitlev2: 'Dodanie nowego weterynarza do bazy danych kliniki',
                pageTitle: 'Dodawanie weterynarza',
                formMode: 'createNew',
                btnLabel: 'Dodaj weterynarza',
                formAction: '/vets/add',
                navLocation: 'vets',
                validationErrors: err.details
            });
        });
};



exports.updateVet = (req, res, next) => {
    const vetId = req.body._id;
    const vetData = { ...req.body };
    VetRepository.updateVet(vetId, vetData)
    .then( result => {
        res.redirect('/vets');
    })
    .catch(err => {
        const vetId = req.body._id;
        VetRepository.getVetById(vetId)
        .then(vet => {
            res.render('pages/vets/vets-form', {
                vet: vet,
                formMode: 'edit',
                pageTitle: 'Edycja weterynarza',
                pageTitlev2: 'Edycja danych wybranego weterynarza',
                btnLabel: 'Aktualizuj dane weterynarza',
                formAction: '/vets/edit',
                navLocation: 'vets',
                validationErrors: err.details
            });
        });
    });
};

exports.deleteVet = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.deleteVet(vetId)
    .then( () => {
        res.redirect('/vets');
    });
};


//funkcje SHOW


exports.showVetsList = (req, res, next) => {
    VetRepository.getVets()
        .then(vets => {
            res.render('pages/vets/vets', {
                vets: vets,
                pageTitle: "Weterynarze",
                pageTitlev2: "Lista pracowników (weterynarzy) kliniki. ",
                navLocation: 'vets',
                validationErrors: []
            });
        });
}

exports.showVetDetails = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.getVetById(vetId)
        .then(vet => {
            res.render('pages/vets/vets-form', {
                vet: vet,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły weterynarza',
                pageTitlev2: 'Szczegółowe dane dotyczące wybranego weterynarza wraz z jego specjalizacjami',
                formAction: '',
                navLocation: 'vets',
                validationErrors: []
            });
        });
}



exports.showAddVetForm = (req, res, next) => {
    res.render('pages/vets/vets-form', {
        vet: {},
        pageTitle: 'Dodaj weterynarza',
        pageTitlev2: 'Dodanie nowego weterynarza do bazy danych kliniki',
        formMode: 'createNew',
        btnLabel: 'Dodaj weterynarza',
        formAction: '/vets/add',
        navLocation: 'vets',
        validationErrors: []
    });
}

exports.showEditVetForm = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.getVetById(vetId)
        .then(vet => {
            console.log(vet),
            res.render('pages/vets/vets-form', {
                
                vet: vet,
                formMode: 'edit',
                pageTitle: 'Edycja weterynarza',
                pageTitlev2: 'Edycja danych wybranego weterynarza',
                btnLabel: 'Aktualizuj dane weterynarza',
                formAction: '/vets/edit',
                navLocation: 'vets',
                validationErrors: []
            });
        });
};
//specVets

exports.showEditSpecVetPage = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.getVetById(vetId)
        .then(vet => {
            res.render('pages/vets/vets-form', {
                vet: vet,
                formMode: 'editSpecVetPage',
                pageTitle: 'Edycja specjalizacji weterynarza',
                pageTitlev2: 'Edycja specjalizacji wybranego weterynarza',
                btnLabel: 'Aktualizuj dane weterynarza',
                formAction: '/vets/specVetEditPage',
                navLocation: 'vets',
                validationErrors: []
            });
        });
}

exports.showEditSpecVetForm = (req, res, next) => {
    const specVetId = req.params.specvetId;
    SpecVetRepository.getSpecVetById(specVetId)
        .then(specVet => {
            res.render('pages/vets/vets-form', {
                specVet: specVet,
                formMode: 'editSpecVet',
                pageTitle: 'Edycja specjalizacji weterynarza',
                pageTitlev2: 'Edycja istniejącej specjalizacji wybranego weterynarza',
                btnLabel: 'Aktualizuj',
                formAction: '/vets/specVetEdit',
                navLocation: 'vets',
                validationErrors: []
            });
        });
}


exports.showAddSpecVetForm = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.getVetById(vetId)
    .then(vet => {
        res.render('pages/vets/vets-form', {
            vet: {},
            pageTitle: 'Dopisz specjalizację do weterynarza',
            pageTitlev2: 'Przypisanie specjalizacji do wybranego weterynarza',
            formMode: 'addSpecVet',
            btnLabel: 'Dopisz specjalizację do weterynarza',
            formAction: '/vets/specVetAdd',
            navLocation: 'vets',
            validationErrors: []
        });
    });
}

exports.showAddSpecVetForm = (req, res, next) => {
    let allVets, allSpecs;
    VetRepository.getVets()
        .then(vets => {
            allVets = vets;
            return SpecRepository.getSpecs();
        })
        .then(specs => {
            allSpecs = specs;
            res.render('pages/employment/form', {
                employment: {},
                formMode: 'createNew',
                allEmps: allEmps,
                allDepts: allDepts,
                pageTitle: 'Nowe zatrudnienia',
                btnLabel: 'Dodaj zatrudnienie',
                formAction: '/employments/add',
                navLocation: 'employment',
                validationErrors: []
            });
        });
}