const VetRepository = require('../repository/mysql2/VetRepository');
const authUtil = require('../util/authUtils');


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    VetRepository.findByEmail(email)
        .then(vet => {
            if(!vet) {
                res.render('pages/login', {
                    navLocation: 'login',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, vet.password) === true) {
                req.session.loggedUser = vet;
                res.redirect('/vets/login');
            } else {
                res.render('pages/login', {
                    navLocation: 'login',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/vets/login');
}

exports.showLoginPage = (req, res, next) => {
    res.render('pages/login', {
      //  vet: {},
        pageTitle: 'Strona logowanie',
        pageTitlev2: 'Logowanie na indywidualne konto',
        formMode: 'login',
        btnLabel: 'Zaloguj',
        formAction: '/vets/login',
        navLocation: 'login',
    });
}
