//Wywołanie funkcji render wygeneruje widok na podstawie wybranego szablonu (pierwszy parametr funkcji 
// wskazuje na lokalizację szablonu względem folderu views, bez rozszerzenia .ejs). 
//Drugi parametr funkcji render umożliwia przekazanie danych mogących być użytymi w trakcie generowania strony. Na razie przekazujemy pusty obiekt.

const SpecRepository = require('../repository/mysql2/SpecRepository');


exports.addSpec = (req, res, next) => {
    const specData = { ...req.body };
    SpecRepository.createSpec(specData)
        .then( result => {
            res.redirect('/specs');
        })
        .catch(err => {
            res.render('pages/specs/specs-form', {
                spec: specData,
                pageTitle: 'Dodaj specjalizację',
                pageTitlev2: 'Dodanie nowej specjalizacji do bazy danych kliniki',
                formMode: 'createNew',
                btnLabel: 'Dodaj specjalizację',
                formAction: '/specs/add',
                navLocation: 'specs',
                validationErrors: err.details
            });
        });
};

exports.updateSpec = (req, res, next) => {
    const specId = req.body._id;
    const specData = { ...req.body };
    SpecRepository.updateSpec(specId, specData)
    .then( result => {
        res.redirect('/specs');
    })
    .catch(err => {
        const specId = req.body._id;
        SpecRepository.getSpecById(specId)
        .then(spec => {
            res.render('pages/specs/specs-form', {
                spec: spec,
                formMode: 'edit',
                pageTitle: 'Edycja specjalizacji',
                pageTitlev2: 'Edycja danych wybranej specjalizacji',
                btnLabel: 'Aktualizuj dane specjalizacji',
                formAction: '/specs/edit',
                navLocation: 'specs',
                validationErrors: err.details
            });
        });
    });
};

exports.deleteSpec = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.deleteSpec(specId)
    .then( () => {
        res.redirect('/specs');
    });
};

//funkcje SHOW

exports.showSpecsList = (req, res, next) => {
    SpecRepository.getSpecs()
        .then(specs => {
            res.render('pages/specs/specs', {
                specs: specs,
                navLocation: 'specs'
            });
        });
}

exports.showSpecDetails = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.getSpecById(specId)
        .then(spec => {
            res.render('pages/specs/specs-form', {
                spec: spec,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły specjalizacji',
                pageTitlev2: 'Szczegółowe dane dotyczące wybranej specjalizacji.',
                formAction: '',
                navLocation: 'specs',
                validationErrors: []
            });
        });
}

exports.showAddSpecForm = (req, res, next) => {
    res.render('pages/specs/specs-form', {
        spec: {},
        pageTitle: 'Dodaj specjalizację',
        pageTitlev2: 'Dodanie nowej specjalizacji do bazy danych kliniki',
        formMode: 'createNew',
        btnLabel: 'Dodaj specjalizację',
        formAction: '/specs/add',
        navLocation: 'specs',
        validationErrors: []
    });
}


exports.showEditSpecForm = (req, res, next) => {
    const specId = req.params.specId;
    SpecRepository.getSpecById(specId)
        .then(spec => {
            res.render('pages/specs/specs-form', {
                spec: spec,
                formMode: 'edit',
                pageTitle: 'Edycja specjalizacji',
                pageTitlev2: 'Edycja danych wybranej specjalizacji',
                btnLabel: 'Aktualizuj dane specjalizacji',
                formAction: '/specs/edit',
                navLocation: 'specs',
                validationErrors: []
            });
        });
};

