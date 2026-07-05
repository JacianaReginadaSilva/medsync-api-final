// src/middlewares/errorMiddleware.js
module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocorreu um erro interno imprevisto no servidor.';

  console.error(`[AUDITORIA LOG] Erro ${statusCode}: ${message} em ${new Date().toISOString()}`);

  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};