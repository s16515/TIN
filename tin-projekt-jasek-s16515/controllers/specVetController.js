
//Wywołanie funkcji render wygeneruje widok na podstawie wybranego szablonu (pierwszy parametr funkcji 
// wskazuje na lokalizację szablonu względem folderu views, bez rozszerzenia .ejs). 
//Drugi parametr funkcji render umożliwia przekazanie danych mogących być użytymi w trakcie generowania strony. Na razie przekazujemy pusty obiekt.

const VetRepository = require('../repository/mysql2/VetRepository');
const SpecRepository = require('../repository/mysql2/SpecRepository');
const SpecVetRepository = require('../repository/mysql2/SpecVetRepository');


exports.addSpecVet = (req, res, next) => {
    const specVetData = { ...req.body };
    console.log(specVetData);
    SpecVetRepository.createSpecVet(specVetData)
        .then( result => {
            res.redirect('/specVets'); 
        }); 
};

exports.updateSpecVet = (req, res, next) => {
    const specVetId = req.body._id;
    const specVetData = { ...req.body };
    console.log(specVetData);
    SpecVetRepository.updateSpecVet(specVetId, specVetData)
    .then( result => {
        res.redirect('/specVets');
    });
};

exports.deleteSpecVet = (req, res, next) => {
    const specVetId = req.params.specVetId;
    SpecVetRepository.deleteSpecVet(specVetId)
    .then( () => {
        res.redirect('/specVets');
    });
};


//funkcje SHOW

exports.showSpecVetsList = (req, res, next) => {
    SpecVetRepository.getSpecVets()
        .then(specVets => {
            res.render('pages/specVets/specVets', {
                specVets: specVets,
                formMode: 'editSpecVetPage',
                pageTitle: 'Specjaliści',
                pageTitlev2: 'Lista specjalistów w klinice',
                btnLabel: 'Aktualizuj dane weterynarza',
                navLocation: 'specVets'
            });
        });
}

exports.showSpecVetDetails = (req, res, next) => {
    const specVetId = req.params.specVetId;
    SpecVetRepository.getSpecVetById(specVetId)
        .then(specVet => {
            res.render('pages/specVets/specVets-form', {
                specVet: specVet,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły specjalizacji weterynarza',
                pageTitlev2: 'Szczegółowe dane dotyczące specjalizacji u danego weterynarza',
                formAction: '',
                navLocation: 'specVets'
            });
        });
} 

exports.showEditSpecVetForm= (req, res, next) => {
    const specVetId = req.params.specVetId;
    SpecVetRepository.getSpecVetById(specVetId)
        .then(specVet => {
            res.render('pages/specVets/specVets-form', {
                specVet: specVet,
                formMode: 'edit',
                pageTitle: 'Edycja specjalizacji weterynarza',
                pageTitlev2: 'Edycja wskazanej specjalizacji wybranego weterynarza',
                btnLabel: 'Aktualizuj',
                formAction: '/specVets/edit',
                navLocation: 'specVets'
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
            res.render('pages/specVets/specVets-form', {
                specVet: {},
                formMode: 'createNew',
                allVets: allVets,
                allSpecs: allSpecs,
                pageTitle: 'Dodanie specjalizacji do weterynarza',
                pageTitlev2: 'Dołączenie dodatkowej specjalizacji do profilu wybranego weterynarza',
                btnLabel: 'Dodaj specjalizację do weterynarza',
                formAction: '/specVets/add',
                navLocation: 'specVets'
            });
        });
}

