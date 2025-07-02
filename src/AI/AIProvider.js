const Huggingface = require('./HuggingFace')
const Gemini = require('./Gemini')

const IA_CHOICE = process.env.IA_PROVIDER || 'gemini'

const providers = {
  gemini: Gemini,
  huggingface: Huggingface,
}

const selectedProvider = providers[IA_CHOICE.toLowerCase()]

if (!selectedProvider) {
  throw new Error(`IA provider "${IA_CHOICE}" não é suportado.`)
}

module.exports = {
  gerarSubtasks: selectedProvider.gerarSubtasks
}
