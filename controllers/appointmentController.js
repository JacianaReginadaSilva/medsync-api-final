// src/controllers/appointmentController.js
const appointmentService = require('../services/appointmentService');

class AppointmentController {
  async store(req, res, next) {
    try {
      const { medicoName, especialidade, dataConsulta, motivo } = req.body;
      const appointment = await appointmentService.create({
        medicoName, especialidade, dataConsulta, motivo, userId: req.userId
      });
      return res.status(201).json(appointment);
    } catch (err) {
      next(err);
    }
  }

  async index(req, res, next) {
    try {
      const appointments = await appointmentService.getAllByUser(req.userId);
      return res.status(200).json(appointments);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await appointmentService.update(id, req.userId, req.body);
      return res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await appointmentService.delete(id, req.userId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AppointmentController();