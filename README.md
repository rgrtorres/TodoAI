# 🧠 TodoAI

Um sistema de lista de tarefas inteligente que **cria subtarefas automaticamente** com ajuda das inteligências artificiais **Gemini** (Google) e **HuggingFace**.  
Back-end desenvolvido com **Node.js** e persistência em **MongoDB**.

## 📦 Funcionalidades

- Criar, listar, atualizar e deletar tarefas.
- Integração com Gemini e HuggingFace para gerar **subtarefas automaticamente** com base na tarefa principal.
- Estrutura MVC (Model-View-Controller).
- API RESTful simples e funcional.

## 🗂 Estrutura do Projeto

```
src/
├── AI/
│   ├── Gemini.js         # Integração com Gemini API
│   └── HuggingFace.js    # Integração com HuggingFace API
├── config/               # Configurações (ex: conexão com MongoDB)
├── controllers/
│   └── taskController.js # Lógica dos endpoints
├── models/               # Modelos do MongoDB
├── routes/
│   └── taskRoutes.js     # Rotas da API
├── services/
│   └── taskService.js    # Regras de negócio
├── app.js                # App Express
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js
- MongoDB
- Conta nas APIs Gemini e HuggingFace

### 1. Clone o repositório

```bash
git clone https://github.com/rgrtorres/TodoAI.git
cd TodoAI
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```
PORT=3000
MONGO_URI=sua_string_de_conexão
GEMINI_APIKEY=sua_chave_gemini
HF_TOKEN=sua_chave_huggingface
```

### 4. Inicie o servidor

```bash
npm start
```

A API estará rodando em: `http://localhost:3000`

## 📬 Rotas principais

| Método | Rota           | Descrição                        |
|--------|----------------|----------------------------------|
| POST   | `/tasks`       | Criar nova tarefa + subtarefas   |
| GET    | `/tasks`       | Listar todas as tarefas          |
| PATCH  | `/tasks/:id`   | Atualizar uma tarefa             |
| DELETE | `/tasks/:id`   | Remover uma tarefa               |

---

## 🤖 IA utilizada

- **Gemini**: gera subtarefas com base na tarefa principal.
- **HuggingFace**: também usado para gerar ou validar subtarefas com NLP.

## 🧠 Exemplo

> Criar tarefa: "Organizar um evento de tecnologia"  
> → Gemini/HuggingFace geram automaticamente subtarefas como:  
> - Reservar local  
> - Convidar palestrantes  
> - Criar página de inscrição

---

## 📚 Tecnologias

- Node.js
- Express
- MongoDB
- Gemini API
- HuggingFace API

---

## 💻 Autor

Renan Torres — [GitHub](https://github.com/rgrtorres)

---

## 📄 Licença

Este projeto está sob a licença MIT.
