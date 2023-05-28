const PartnerModel = require('../models/PartnerModel');

const getInscriptions = async (req, res) => {
    try {
        const inscriptions = await PartnerModel.getInscriptions();
        return res.status(200).json({
            ok: true,
            data: inscriptions,
            status: 1
        });
    } catch (error) {
        console.log('Error al obtener solicitudes: ', error);
        return res.status(500).json({
            ok: false,
            message: 'Hubo un error al obtener las solicitudes.',
            status: 0
        });
    }
}

const updateStateInscription = async (req, res) => {
    const requiredParams = {
        partnerId: req.body.partnerId || null,
        state: req.body.state || null,
    };
    console.log(requiredParams)
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios',
        status: 2
    });
    try {
        const inscriptions = await PartnerModel.updateInscription(requiredParams);
        console.log(inscriptions);
        return res.status(200).json({
            ok: true,
            message: 'Inscripción actualizada exitosamente',
            status: 1
        });
    } catch (error) {
        console.log('Error al actualizar la solicitud: ', error);
        return res.status(500).json({
            ok: false,
            message: 'Hubo un error al actualizar la solicitud.',
            status: 0
        });
    }
}

module.exports = {
    getInscriptions,
    updateStateInscription
}