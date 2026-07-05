// src/controllers/appointmentController.js
// src/routes/appointmentRoutes.js
const { Router } = require('express');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const routes = Router();

// Rota pública para Documentação da API (Swagger/OpenAPI)
routes.get('/api-docs', (req, res) => {
  res.json({
    openapi: "3.0.0",
    info: {
      title: "MedSync API",
      description: "Documentação interativa dos endpoints do sistema MedSync.",
      version: "1.0.0"
    },
    paths: {
      "/api/auth/register": {
        post: {
          summary: "Registra um novo usuário com senha criptografada (Público)"
        }
      },
      "/api/auth/login": {
        post: {
          summary: "Valida credenciais e gera o Token JWT (Público)"
        }
      },
      "/api/appointments": {
        post: {
          summary: "Registra uma nova consulta médica (Protegido por JWT)"
        },
        get: {
          summary: "Retorna a lista de consultas do usuário logado (Protegido por JWT)"
        }
      }
    }
  });
});

routes.use(authMiddleware); // Protege todos os endpoints abaixo

routes.post('/appointments', appointmentController.store);
routes.get('/appointments', appointmentController.index);
routes.put('/appointments/:id', appointmentController.update);
routes.delete('/appointments/:id', appointmentController.delete);

module.exports = routes;