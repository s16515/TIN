const SpecVetRepository = require('../repository/mysql2/SpecVetRepository');

exports.getSpecVets = (req, res, next) => {
    SpecVetRepository.getSpecVets()
        .then(specVets => {
            res.status(200).json(specVets);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getSpecVetById = (req, res, next) => {
    const specVetId = req.params.specVetId;
    SpecVetRepository.getSpecVetById(specVetId)
        .then(specVet => {
            if(!specVet) {
                res.status(404).json({
                    message: 'SpecVet with id: '+specVetId+' not found'
                })
            } else {
                res.status(200).json(specVet);
            }
        });
};

exports.createSpecVet = (req, res, next) => {
    SpecVetRepository.createSpecVet(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateSpecVet = (req, res, next) => {
    const specVetId = req.params.specVetId;
    SpecVetRepository.updateSpecVet(specVetId, req.body)
        .then(result => {
           res.status(200).json({message: 'SpecVet updated!', specVet: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteSpecVet = (req, res, next) => {
    const specVetId = req.params.specVetId;
    SpecVetRepository.deleteSpecVet(specVetId)
        .then(result => {
            res.status(200).json({message: 'Removed SpecVet', specVet: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};