## 🚀 Histórico de Evolução e Melhorias Aplicadas (Feedback do Tutor)

Com base nas orientações das entregas anteriores, esta versão final consolidada traz os seguintes aprimoramentos de engenharia:
* **Correção de Sintaxe (Front-end):** Revisão completa de nomenclatura e estados nos componentes React (padronização de escopo de `import` e consistência em hooks como `setAgendados`).
* **Exemplos de Contratos JSON (Back-end):** Inclusão de payloads reais de requisição e resposta para facilitar o consumo por equipes de Front-end, agora formalizados via **Swagger/OpenAPI** em `/api-docs`.
* **Instruções de Ambiente Detalhadas:** Manual passo a passo para configuração de variáveis `.env` e inicialização de migrações do banco relacional com Prisma CLI v7.

---

# 🏥 MedSync - Plataforma de Agendamento Médico Inteligente

O **MedSync** é um ecossistema completo voltado para a otimização e automação de agendamentos de consultas médicas. O projeto nasceu como uma Single Page Application (SPA) responsiva e evoluiu para uma arquitetura moderna, robusta e modularizada, integrando tecnologias de ponta no Front-end e no Back-end.

---

## 📅 Histórico de Evolução do Projeto

### 🚀 Fase 1: MVP em Vanilla JS (Projetos e Práticas de Extensão II)
A versão inicial foi desenvolvida utilizando conceitos fundamentais da Web:
- **Interface:** HTML5 estruturado e estilização ágil via Tailwind CSS (CDN).
- **Lógica:** JavaScript Puro (Vanilla JS) com manipulação direta do DOM.
- **Integrações Inteligentes:** - **Brasil API:** Consumo assíncrono para preenchimento automático de endereço via CEP.
  - **Google Gemini API:** Processamento de linguagem natural (IA) para triagem automatizada de sintomas e otimização de notas clínicas.
- **Qualidade:** Cobertura de testes automatizados de ponta a ponta (E2E) utilizando **Cypress**.

### ⚛️ Fase 2: Migração Front-end (PPE III - Unidade 1)
Evolução da arquitetura do cliente para o ecossistema do **React**:
- **Componentização:** Divisão da interface em componentes modulares e reutilizáveis (Cards de médicos, formulários reativos).
- **Gerenciamento de Estado:** Fluxos de interface controlados nativamente através de React Hooks (`useState` e `useEffect`).
- **Navegação Dinâmica:** Introdução do `React Router Dom` para gerenciamento de rotas e criação da jornada do paciente sem recarregamento de página.

### ⚙️ Fase 3: Infraestrutura Back-end (PPE III - Unidade 2)
Desenvolvimento de uma API RESTful escalável para suporte e persistência dos dados:
- **Tecnologias:** Node.js com o framework Express.
- **Padrão Arquitetural em Camadas:** Divisão estrita de responsabilidades entre `Routes`, `Controllers`, `Services` (regras de negócio) e `Models`.
- **Persistência com Prisma ORM:** Modelagem de dados relacional vinculando usuários e consultas através do banco PostgreSQL.
- **Segurança Avançada:** Endpoint de registro e login com hash de senhas via `bcrypt` e proteção de rotas privadas por meio de middlewares de barreira baseados em tokens **JWT (JSON Web Tokens)**.
- **Estabilidade:** Tratamento global e centralizado de exceções com respostas padronizadas em JSON e simulação de logs de auditoria.

---

## 📂 Estrutura de Pastas do Projeto

```text
/medsync-backend
├── prisma/
│   └── schema.prisma         # Modelagem do Banco de Dados (ORM)
├── src/
│   ├── config/
│   │   └── database.js       # Conexão centralizada do banco
│   ├── middlewares/
│   │   ├── authMiddleware.js # Validação de segurança do Token JWT
│   │   └── errorMiddleware.js# Interceptador global de erros da API
│   ├── controllers/
│   │   └── appointmentController.js # Controle HTTP de Agendamentos
│   ├── services/
│   │   └── appointmentService.js    # Regras de negócio e validações
│   ├── routes/
│   │   └── appointmentRoutes.js     # Endpoints da API RESTful
│   └── app.js                # Arquivo principal de inicialização do servidor
├── package.json              # Manifesto de dependências do Node.js
└── README.md                 # Documentação do projeto
📦 Como Executar o Back-end Localmente
Abra o terminal na raiz do projeto e instale as dependências:

Bash
npm install
Configure as variáveis de ambiente em um arquivo .env:

Snippet de código
DATABASE_URL="postgresql://postgres:senha@localhost:5432/medsync_db?schema=public"
JWT_SECRET="sua_chave_secreta_jwt"
Execute as migrações para preparar o banco de dados (Prisma):

Bash
npx prisma migrate dev --name init
Inicie o servidor em ambiente de desenvolvimento:

Bash
npm start
📡 Resumo dos Endpoints RESTful Criados
POST /api/auth/register -> Criação de novas contas com senhas criptografadas (Público).

POST /api/auth/login -> Validação de credenciais e geração de Token de Acesso (Público).

POST /api/appointments -> Registro de novas consultas médicas (Protegido por JWT).

GET /api/appointments -> Listagem de consultas ativas do usuário logado (Protegido por JWT).

PUT /api/appointments/:id -> Edição e remarcação de horários (Protegido por JWT).

DELETE /api/appointments/:id -> Cancelamento definitivo de agendamentos (Protegido por JWT).

---

## 🧪 Atividade 3: Testes, Qualidade e CI/CD (Garantia de Qualidade)

Nesta etapa final, o MedSync recebeu uma infraestrutura completa de testes automatizados e integração contínua para garantir a estabilidade das regras de negócio e da interface.

### 🕹️ 1. Como Rodar os Testes Automatizados

Certifique-se de ter instalado as dependências de desenvolvimento (`npm install`).

* **Modo Interativo (Interface Visual do Cypress):**
  Para abrir o painel do Cypress e acompanhar os testes rodando no navegador em tempo real, execute:
  ```bash
  npm run test

Modo Headless (Execução rápida via Terminal):
Para rodar todos os testes lógicos e de componentes direto no terminal, execute:

Bash
npm run test:ci

📊 2. Como Visualizar a Cobertura de Código (Coverage)
A cobertura de código foi configurada utilizando o módulo @cypress/code-coverage.

Após rodar os testes com o comando npm run test:ci, uma pasta chamada /coverage será gerada automaticamente na raiz do seu projeto.

Para visualizar o relatório gráfico detalhado, basta abrir o arquivo coverage/lcov-report/index.html em qualquer navegador.

Métrica alcançada: O projeto garante cobertura lógica superior a 80% das ramificações do fluxo de agendamentos.

🚀 3. Como Funciona o Pipeline de CI/CD
O projeto conta com automação nativa via GitHub Actions configurada no arquivo .github/workflows/ci.yml.

Toda vez que um novo código for enviado para o repositório (git push ou Pull Request), o GitHub iniciará automaticamente um container Linux em nuvem que realiza os seguintes passos:

Provisionamento: Inicializa um banco de dados PostgreSQL isolado e testa sua conectividade.

Ambiente: Instala a versão correta do Node.js e restaura o cache de dependências.

Instalação: Executa o comando npm install de forma limpa.

Validação de QA: Executa de forma automatizada toda a suíte de testes (Back-end e Front-end), bloqueando o deploy caso algum teste falhe ou a cobertura fique abaixo da meta.

---

## 📖 Atividade 4: Documentação e Contrato da API (Swagger/OpenAPI)

Nesta etapa final de consolidação, o projeto recebeu a especificação formal de seus contratos de integração.

### 🗺️ Como Acessar a Documentação da API
Com o servidor rodando localmente (`npm start`), o contrato técnico interativo da API contendo a descrição de todos os endpoints, parâmetros aceitos e formatos de respostas JSON pode ser consumido diretamente na rota pública:
* **URL Local:** `http://localhost:3000/api-docs`

Projeto desenvolvido por Jaciana Regina da Silva como parte integrante das atividades práticas de engenharia e extensão universitária.