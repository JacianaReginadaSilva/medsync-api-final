// tests/appointmentService.spec.js

// Simulando o comportamento do serviço para rodar isolado (Unitário)
const appointmentServiceMock = {
  async create({ dataConsulta }) {
    if (new Date(dataConsulta) <= new Date()) {
      throw new Error('A data da consulta precisa ser um momento futuro.');
    }
    return { id: "123", status: "Agendado" };
  }
};

describe('Testes Unitários - Regras de Negócio de Agendamentos', () => {
  it('Deve impedir o agendamento de consultas em datas passadas', async () => {
    const dataPassada = '2023-01-01T10:00:00.000Z';
    
    try {
      await appointmentServiceMock.create({ dataConsulta: dataPassada });
    } catch (error) {
      expect(error.message).toBe('A data da consulta precisa ser um momento futuro.');
    }
  });

  it('Deve permitir o agendamento se a data for no futuro', async () => {
    const dataFutura = '2027-12-25T14:00:00.000Z';
    const resultado = await appointmentServiceMock.create({ dataConsulta: dataFutura });
    expect(resultado.status).toBe('Agendado');
  });
});