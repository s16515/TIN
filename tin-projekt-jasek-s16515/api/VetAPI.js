const VetRepository = require('../repository/mysql2/VetRepository');

exports.getVets = (req, res, next) => {
    VetRepository.getVets()
        .then(vets => {
            res.status(200).json(vets);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getVetById = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.getVetById(vetId)
        .then(vet => {
            if(!vet) {
                res.status(404).json({
                    message: 'Vet with id: '+vetId+' not found'
                })
            } else {
                res.status(200).json(vet);
            }
        });
};

exports.createVet = (req, res, next) => {
    VetRepository.createVet(req.body)
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

exports.updateVet = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.updateVet(vetId, req.body)
        .then(result => {
           res.status(200).json({message: 'Vet updated!', vet: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteVet = (req, res, next) => {
    const vetId = req.params.vetId;
    VetRepository.deleteVet(vetId)
        .then(result => {
            res.status(200).json({message: 'Removed Vet', vet: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};