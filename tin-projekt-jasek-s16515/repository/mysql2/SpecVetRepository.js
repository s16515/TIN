const db = require('../../config/mysql2/db');

exports.getSpecVets = () => {
    const query = `SELECT sv._id as specVet_id, sv.price, sv.dateFrom, s._id as spec_id, s.name,
    s.minSalary, v._id as vet_id, v.firstName, v.lastName, v.email, v.password
        FROM SpecVet sv 
        left join Vet v on sv.vet_id = v._id
        left join Spec s on sv.spec_id = s._id`

       
    return db.promise().query(query)
        .then( (results, fields) => {
            const specVets = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                const specVet = {
                    _id: row.specVet_id,
                    price: row.price,
                    dateFrom: row.dateFrom,
                    spec: {
                        _id: row.spec_id,
                        name: row.name,
                        minSalary: row.minSalary
                    },
                    vet: {
                        _id: row.vet_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email,
                        password: row.password
                    }
                };
                specVets.push(specVet);
            }
            console.log(specVets);
            return specVets;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getSpecVetById = (SpecVetId) => {
    const query = `SELECT sv._id as specVet_id, sv.price, sv.dateFrom, s._id as spec_id, s.name,
    s.minSalary, v._id as vet_id, v.firstName, v.lastName, v.email, v.password
        FROM SpecVet sv 
        left join Vet v on sv.vet_id = v._id
        left join Spec s on sv.spec_id = s._id
        where sv._id = ?`
    return db.promise().query(query, [SpecVetId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            const specVet = {
                _id: SpecVetId,
                price: row.price,
                dateFrom: row.dateFrom,
                
                spec: {
                    _id: row.spec_id,
                    name: row.name,
                    minSalary: row.minSalary
                },
                vet: {
                    _id: row.vet_id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    password: row.password
                }
            };
            console.log(specVet);
            return specVet;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createSpecVet = (data) => {
    console.log('createSpecVet');
    console.log(data);
    const sql = 'INSERT into SpecVet (vet_id, spec_id, price, dateFrom) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [data.vetId, data.specId, data.price, data.dateFrom]);
};

/*
exports.createVet = (newVetData) => {
    const firstName = newVetData.firstName;
    const lastName = newVetData.lastName;
    const email = newVetData.email;
    const sql = 'INSERT into Vet (firstName, lastName, email) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email]);
};*/

exports.updateSpecVet = (specVetId, data) => {
    const price = data.price;
    const dateFrom = data.dateFrom;
    const sql = `UPDATE SpecVet set price = ?, dateFrom = ? where _id = ?`;
    return db.promise().execute(sql, [price, dateFrom, specVetId]);
}

exports.deleteSpecVet = (specVetId) => {
    const sql = 'DELETE FROM SpecVet where _id = ?'
    return db.promise().execute(sql, [specVetId]);
}

exports.deleteManyEmployments = (SpecVetIds) => {
    const sql = 'DELETE FROM SpecVet where _id IN (?)'
    return db.promise().execute(sql, [SpecVetIds]);
}
