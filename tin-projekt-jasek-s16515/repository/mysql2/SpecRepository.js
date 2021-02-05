const db = require('../../config/mysql2/db');
const specSchema = require('../../model/joi/Spec');

exports.getSpecs = () => {
    return db.promise().query('SELECT * FROM Spec')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getSpecById = (specId) => {
    const query = `SELECT s._id as _id, s.name, s.minSalary, sv._id as specvet_id,
        sv.price, sv.dateFrom, v._id as vet_id, v.firstName, v.lastName, v.email 
    FROM Spec s
    left join SpecVet sv on sv.spec_id = s._id
    left join Vet v on v._id = sv.vet_id 
    where s._id = ?`
return db.promise().query(query, [specId]) //zastepuje tym znak zapytania
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const spec = {
            _id: parseInt(specId),
            name: firstRow.name,
            minSalary: firstRow.minSalary,
            specvets: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.specvet_id) {
                const specvet = {
                    _id: row.specvet_id,
                    price: row.price,
                    dateFrom: row.dateFrom,
                    vet: {
                        _id: row.vet_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email,
                    }
                };
                spec.specvets.push(specvet);
            }
        }
        return spec;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createSpec = (newSpecData) => {
    const sRes = specSchema.validate(newSpecData, { abortEarly: false} );
    if(sRes.error) {
        return Promise.reject(sRes.error);
    }
    const name = newSpecData.name;
    const minSalary = newSpecData.minSalary;
    const sql = 'INSERT into Spec (name, minSalary) VALUES (?, ?)'
    return db.promise().execute(sql, [name, minSalary]);
};

exports.updateSpec = (specID, specData) => {
    const sRes = specSchema.validate(newSpecData, { abortEarly: false} );
    if(sRes.error) {
        return Promise.reject(sRes.error);
    }
    const name = specData.name;
    const minSalary = specData.minSalary;
    const sql = `UPDATE Spec set name = ?, minSalary = ? where _id = ?`;
    return db.promise().execute(sql, [name, minSalary, specID]);
};

exports.deleteSpec = (specID) => {
    const sql1 = 'DELETE FROM SpecVet where spec_id = ?'
    const sql2 = 'DELETE FROM Spec where _id = ?'

return db.promise().execute(sql1, [specID])
    .then(() => {
        return db.promise().execute(sql2, [specID])
    });
};