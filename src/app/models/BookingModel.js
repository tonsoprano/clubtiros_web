const db = require('../../config/database');

const addBoking = async (data) => {
    try {
        let query = `
            INSERT INTO bookings
            (users_id, lines_id, line_type, date, time_start, time_end, automatizated)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        let args = [
            data.userId,
            data.lineId,
            data.lineType,
            data.date,
            data.timeStart,
            data.timeEnd,
            data.automatizated
        ];
        let result = await db.query(query, args);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

const findBooking = async (data) => {
    try {
        let query = `
            SELECT
                users_id userId,
                lines_id lineId,
                line_type lineType,
                DATE_FORMAT(date, '%Y-%m-%d') date,
                time_start timeStart,
                time_end timeEnd,
                automatizated
            FROM bookings
            WHERE date = ? AND time_start = ? AND lines_id = ?
        `;
        let args = [ data.date, data.timeStart, data.lineId ];
        let result = await db.query(query, args);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

const getBookings = async () => {
    try {
        let query = `
            SELECT
                b.id AS bookingId,
                l.id AS lineId,
                l.line AS lineName,
                IF(
                    b.line_type = 1,
                    'Arma larga',
                    'Arma corta'
                ) AS lineType,
                DATE_FORMAT(b.date, '%Y-%m-%d') dateBooking,
                b.time_start AS timeStart,
                b.time_end AS timeEnd,
                IF(
                    b.automatizated = 1,
                    'Si',
                    'No'
                ) AS automatizated,
                u.id userId,
                u.email userEmail
            FROM bookings AS b
            JOIN shoot_lines AS l ON b.lines_id = l.id
            JOIN users AS u ON b.users_id = u.id    
        `;
        let result = await db.query(query, []);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

module.exports = {
    addBoking,
    findBooking,
    getBookings
}