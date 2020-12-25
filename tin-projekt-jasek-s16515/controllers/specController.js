exports.showSpecsList = (req, res, next) => {
    res.render('pages/specs/specs', {navLocation: 'specs' });
}

exports.showAddSpecForm = (req, res, next) => {
    res.render('pages/specs/specs-add', {navLocation: 'specs' });
}

exports.showEditSpecForm = (req, res, next) => {
    res.render('pages/specs/specs-edit', {navLocation: 'specs' });
}

// exports.showSpecDetails = (req, res, next) => {
//     res.render('pages/specs/specs-', {navLocation: 'specs' });
// } 