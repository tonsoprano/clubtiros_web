const db = require('../../config/database');

const createUser = async (data) => {
    try {
        let query = `
            INSERT INTO users
            (email, password, roles_id)
            VALUES (?, ?, ?)
        `;
        let args = [data.email, data.password, data.role];
        let result = await db.query(query, args);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

const findUser = async (email) => {
    try {
        let query = `
            SELECT
                u.id userId,
                u.email,
                u.password,
                r.type role,
                u.active state,
                DATE_FORMAT(u.created_at, '%Y-%m-%d') createdAt
            FROM users u
            JOIN roles r ON u.roles_id = r.id
            WHERE u.email = ?
        `;
        let args = [email];
        let result = await db.query(query, args);
        return result;
    } catch (error) {
        console.log('Error al buscar usuario: ', error);
        return undefined;
    }
}

module.exports = {
    createUser,
    findUser
}