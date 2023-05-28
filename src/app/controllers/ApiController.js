const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');
const BookingModel = require('../models/BookingModel');

const login = async (req, res) => {
    const requiredParams = {
        email: req.body.email || null,
        password: req.body.password || null,
    };
    console.log(requiredParams);
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios',
        status: 2
    });

    try {
        const user = await UserModel.findUser(requiredParams.email);
        console.log(user);
    
        if(!user) return res.status(500).json({
            ok: true,
            message: 'Hubo un error interno en el sistema. Intente nuevamente.',
            status: 3
        });
    
        if(user.length === 0) return res.status(401).json({
            ok: true,
            message: 'El usuario ingresado no pertenece al sistema',
            status: 3
        });
    
        let isPassword = bcrypt.compareSync(requiredParams.password, user[0].password);
        if(!isPassword){
            return res.status(401).json({
                ok: true,
                message: 'El correo y/o la contraseña son incorrectos. Intente nuevamente.',
                status: 3
            });
        }
    
        delete user[0]['password'];
        return res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso',
            status: 1,
            data: user[0]
        });
    } catch (error) {
        console.log('CATCH ERROR: ', error);
        return res.status(500).json({
            ok: true,
            message: 'Hubo un error interno en el sistema. Intente nuevamente.',
            status: 3
        });
    }
}

const requestBooking = async (req, res) => {
    const requiredParams = {
        userId: req.body.userId || null,
        lineType: req.body.lineType || null,
        lineId: req.body.lineId || null,
        date: req.body.date || null,
        timeStart: req.body.timeStart || null,
        timeEnd: req.body.timeEnd || null
    };
    console.log(requiredParams)
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios',
        status: 2
    });
    try {
        requiredParams['automatizated'] = req.body.automatizated || null;
        
        const checkIfExist = await BookingModel.findBooking({date: requiredParams.date, timeStart: requiredParams.timeStart, lineId: requiredParams.lineId});
        if(!checkIfExist) return res.status(500).json({
            ok: true,
            message: 'Hubo un error interno en el sistema. Intente nuevamente.',
            status: 3
        });
        
        if(checkIfExist.length > 0) return res.status(400).json({
            ok: false,
            message: 'Ya existe una reserva para esa fecha y horario.',
            status: 2
        });

        const booking = await BookingModel.addBoking(requiredParams);
        console.log(booking);

        return res.status(200).json({
            ok: true,
            message: 'Reserva realizada exitosamente.',
            status: 1
        });
    } catch (error) {
        console.log('Error en inscripción: ', error);
        return res.status(500).json({
            ok: true,
            message: 'Hubo un error interno. Intente nuevamente.',
            status: 0
        });
    }
}

module.exports = {
    login,
    requestBooking
}