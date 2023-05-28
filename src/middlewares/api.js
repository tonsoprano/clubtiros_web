const { API_KEY } = require('../config/constants');

const validateApiKey = (req, res, next) => {
    let key = req.get('x-api-key');
    if(!key) return res.status(401).json({
        ok: false,
        message: 'Falta token de acceso'
    });
    if(key !== API_KEY) return res.status(401).json({
        ok: false,
        message: 'Token de acceso incorrecto'
    });

    next();
}

module.exports = {
    validateApiKey
}