
exports.showVetDetails = (req, res, next) => {
    res.render('pages/vets/vets-details', {navLocation: 'vets' });
} 

exports.showAddSpecVetForm = (req, res, next) => {
    res.render('pages/vets/specs-vets-add', {navLocation: 'vets' });
} 

