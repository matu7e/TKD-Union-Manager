const mp = require('../config/mercadoPago');
const { sql } = require('./../config/bdHelper');
const { Preference } = require('mercadopago');

async function crearPreferenciaPago(miembro) {
  const preferencia = new Preference(mp);
  const cuerpo = {  
  body: {
      items: [
        {
          title: `Pago del miembro ${miembro.nombre} ${miembro.apellido}`,
          quantity: 1,
          unit_price: 2000,
          currency_id: "ARS"
        }
      ],
      payer: {
        email: miembro.email
      },
      back_urls: {
        success: 'http://localhost:3000/mercadopago/success?monto=2000',
        failure: 'http://localhost:3000/mercadopago/failure',
        pending: 'http://localhost:3000/mercadopago/pending',
      },
      auto_return: 'approved',
      external_reference: miembro.dni_miembro.toString(), // Incluimos el DNI aquí
    }
  };

  try {
    const respuesta = await preferencia.create(cuerpo);
    return respuesta; // Devuelve la preferencia creada
  } catch (err) {
    console.error('Error al crear preferencia de pago:', err);
    throw new Error('No se pudo crear la preferencia de pago.');
  }
}

async function registrarPago(dniMiembro, total) { 
    const fechaCobro = new Date();
    let fechaVencimiento;

    if(fechaCobro.getMonth() <=5 ) {fechaVencimiento = new Date(fechaCobro.getFullYear(), 6, 1);} else {
        fechaVencimiento = new Date(fechaCobro.getFullYear() + 1, 0, 1);
    }
    try {

    const request = new sql.Request();
      request.input('dni_miembro', sql.Int, dniMiembro);
      request.input('fecha_cobro', sql.Date, fechaCobro);
      request.input('fecha_vencimiento', sql.Date, fechaVencimiento);
      request.input('monto', sql.Int, parseInt(total));

    await request.execute('RegistrarPago');
    console.log('Pago registrado y miembro actualizado exitosamente.'); 
    
  } catch (err) {
         console.error('Error al registrar el pago:', err); 
        }
}
module.exports = { crearPreferenciaPago, registrarPago };