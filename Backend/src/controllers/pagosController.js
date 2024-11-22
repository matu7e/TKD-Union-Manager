const Pagos = require('../models/pagos');
const Miembros = require('../models/miembros');


async function iniciarPago(req, res) {
    const id_miembro = req.params.dni;

    if (!id_miembro) {
      return res.status(400).json({ message: 'ID del miembro es obligatorio.' });
    }
  
    try {
      const miembro = await Miembros.getBydni(id_miembro); // Obtener datos del miembro
      
      const pago = await Pagos.crearPreferenciaPago(miembro);

      res.status(200).json({
        status: pago.api_response.status,
        id: pago.id,
        init_point: pago.init_point || null, // Devuelve la URL para iniciar el pago
      });
    } catch (err) {
      console.error('Error al iniciar el pago:', err);
      res.status(500).json({ message: 'Hubo un problema al iniciar el pago.' });
    }
  }
  
  async function registrarPago(req, res) {
    const dni_miembro = req.query.external_reference;
    const monto = req.query.monto;

    try{
        Pagos.registrarPago(dni_miembro, monto);
        return res.status(200).send('¡Pago aprobado! Gracias por tu compra.');
    }catch(err){
        return res.status(500).send("Problemas con el pago");
    }
  }
  module.exports = { iniciarPago, registrarPago };