// src/services/appointmentService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AppointmentService {
  async create({ medicoName, especialidade, dataConsulta, motivo, userId }) {
    if (new Date(dataConsulta) <= new Date()) {
      const error = new Error('A data da consulta precisa ser um momento futuro.');
      error.statusCode = 400;
      throw error;
    }

    return await prisma.appointment.create({
      data: { medicoName, especialidade, dataConsulta: new Date(dataConsulta), motivo, userId }
    });
  }

  async getAllByUser(userId) {
    return await prisma.appointment.findMany({ where: { userId } });
  }

  async update(id, userId, updateData) {
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment || appointment.userId !== userId) {
      const error = new Error('Agendamento não localizado ou acesso negado.');
      error.statusCode = 404;
      throw error;
    }

    return await prisma.appointment.update({
      where: { id },
      data: { ...updateData, dataConsulta: updateData.dataConsulta ? new Date(updateData.dataConsulta) : appointment.dataConsulta }
    });
  }

  async delete(id, userId) {
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment || appointment.userId !== userId) {
      const error = new Error('Agendamento não localizado ou acesso negado.');
      error.statusCode = 404;
      throw error;
    }

    await prisma.appointment.delete({ where: { id } });
    return { message: 'Agendamento cancelado com sucesso.' };
  }
}

module.exports = new AppointmentService();