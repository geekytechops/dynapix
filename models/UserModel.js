const db = require('../config/db');

const UserModel = {

    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT user_id, username, email, password FROM dypx_users WHERE email = ?";
            db.query(query, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(results[0]); 
            });
        });
    },

    createUser: (userData) => {
        return new Promise((resolve, reject) => {
            const { username, email, password } = userData;
            const query = "INSERT INTO dypx_users (username, email, password) VALUES (?, ?, ?)";
            db.query(query, [username, email, password], (err, result) => {
                if (err) {
                    return reject(err); 
                }
                resolve({
                    id: result.insertId,
                    username,
                    email
                });
            });
        });
    }

}

module.exports = UserModel;