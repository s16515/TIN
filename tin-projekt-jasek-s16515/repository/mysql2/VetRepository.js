const db = require('../../config/mysql2/db');
const vetSchema = require('../../model/joi/Vet');


checkEmailUnique = (email, vetId) => { 
    let sql, promise;
    if(vetId) {
        sql = `SELECT COUNT(1) as c FROM Vet where _id != ? and email = ?`;
        promise = db.promise().query(sql, [vetId, email]);
        console.log(vetId);
    } else {
        sql = `SELECT COUNT(1) as c FROM Vet where email = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then( (results, fields) => {
        console.log(results);
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }
        return err;
    });
}

exports.getVets = () => {
    return db.promise().query('SELECT * FROM Vet')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getVetById = (vetId) => {
    const query = `SELECT v._id as _id, v.firstName, v.lastName, v.email, sv._id as specvet_id,
        sv.price, sv.dateFrom, s._id as spec_id, s.name, s.minSalary 
    FROM Vet v
    left join SpecVet sv on sv.vet_id = v._id
    left join Spec s on s._id = sv.spec_id 
    where v._id = ?`
return db.promise().query(query, [vetId]) //zastepuje tym znak zapytania
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const vet = {
            _id: parseInt(vetId),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            email: firstRow.email,
            specVets: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.specvet_id) {
                const specvet = {
                    _id: row.specvet_id,
                    price: row.price,
                    dateFrom: row.dateFrom,
                    spec: {
                        _id: row.spec_id,
                        name: row.name,
                        minSalary: row.minSalary
                    }
                };
                vet.specVets.push(specvet);
            }
        }
        return vet;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createVet = (newVetData) => {
    const vRes = vetSchema.validate(newVetData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(newVetData.email)
        .then(emailErr => {
            if(emailErr) {
                return Promise.reject(emailErr);
            } else {
                const firstName = newVetData.firstName;
                const lastName = newVetData.lastName;
                const email = newVetData.email;
                const password = newVetData.password;
                console.log('OK');
                const sql = 'INSERT into Vet (firstName, lastName, email, password) VALUES (?, ?, ?, ?)'
                return db.promise().execute(sql, [firstName, lastName, email, password]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}; 


exports.updateVet = (vetId, vetData) => {
    const vRes = vetSchema.validate(vetData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(vetData.email, vetId)
        .then(emailErr => {
            if(emailErr) {
                return Promise.reject(emailErr);
            } else {
        const firstName = vetData.firstName;
        const lastName = vetData.lastName;
        const email = vetData.email;
        const sql = `UPDATE Vet set firstName = ?, lastName = ?, email = ? where _id = ?`;
        return db.promise().execute(sql, [firstName, lastName, email, vetId]);
}
})
.catch(err => {
    return Promise.reject(err);
});
};

exports.deleteVet = (vetId) => {
    const sql1 = 'DELETE FROM SpecVet where vet_id = ?'
    const sql2 = 'DELETE FROM Vet where _id = ?'

return db.promise().execute(sql1, [vetId])
    .then(() => {
        return db.promise().execute(sql2, [vetId])
    });
};  
