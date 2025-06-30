const taskService = require('../services/taskService');
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function gerarSubtasks(data) {
    const task = await taskService.getById(data.id);

    const API_KEY = process.env.GEMINI_APIKEY;

    if (!API_KEY) {
        console.error("Erro: A API_KEY não está definida nas variáveis de ambiente.");
        console.error("Crie um arquivo .env na raiz do projeto com API_KEY='SUA_CHAVE_AQUI'");
        return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Gera apenas um array JSON com subtasks.
    Título: "${task.title}"
    Descrição: "${task.description}"
    Formato esperado: [
    { "title": "string", "status": "pending" }
    ]
    Comece a resposta com '[' e termine com ']'.
          `.trim()

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;

        const content = response.text();

        const regex = /```(?:json\n)?([\s\S]*?)```/;
        const match = content.match(regex)
        const conteudoJSON = match ? match[1].trim() : null;

        let suggestions;
        try {
            suggestions = JSON.parse(conteudoJSON);
            if (!Array.isArray(suggestions)) throw new Error('Resposta não é um array');
        } catch (e) {
            console.error('JSON inválido da IA:', conteudoJSON);
            return res.status(500).json({ error: 'JSON inválido da IA', raw: conteudoJSON });
        }

        task.subtasks.push(...suggestions);
        await task.save();
    } catch (err) {
        console.error('Erro no Gemini:', err);
        res.status(500).json({ error: 'Erro ao gerar subtasks', details: err.message });
    }
}

module.exports = {
    gerarSubtasks
}