const db = require('../../config/mysql2/db');

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
        sv.price, sv.dateFrom, s._id as spec_id, spec.name, spec.minSalary 
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
            specvets: []
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
                emp.specvets.push(specvet);
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
    const firstName = newVetData.firstName;
    const lastName = newVetData.lastName;
    const email = newVetData.email;
    const sql = 'INSERT into Vet (firstName, lastName, email) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email]);
};

exports.updateVet = (vetId, vetData) => {
    const firstName = vetData.firstName;
    const lastName = vetData.lastName;
    const email = vetData.email;
    const sql = `UPDATE Employee set firstName = ?, lastName = ?, email = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, email, vetId]);
};

exports.deleteVet = (vetId) => {
    const sql1 = 'DELETE FROM SpecVet where vet_id = ?'
    const sql2 = 'DELETE FROM Vet where _id = ?'

return db.promise().execute(sql1, [vetId])
    .then(() => {
        return db.promise().execute(sql2, [vetId])
    });
};