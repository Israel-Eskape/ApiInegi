var mysql = require('mysql');

let instance = null;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '77israel77',
    database: 'inegidb',
    port: 3306
});


connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async searchByName(name, field) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM bajacalifornia WHERE ${field} = ?;`;
                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchByFields(name, field, field2) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM denue_inegi WHERE ${field}= ? and ${field2}  = ?;`;
                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async gerAll(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM denue_inegi;`;
                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = DbService;