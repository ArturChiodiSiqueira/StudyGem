# Fluxo de demonstração do StudyGem

1. Iniciar o backend com Uvicorn.
2. Iniciar o frontend com Expo Web.
3. Abrir o StudyGem no navegador.
4. Informar `Redes de Computadores` no campo de assunto.
5. Colar um conteúdo com pelo menos 20 caracteres.
6. Selecionar 5 perguntas.
7. Clicar em `Gerar estudo`.
8. Mostrar o estado `Analisando conteúdo...`.
9. Após o retorno, apresentar o resumo e os principais pontos.
10. Abrir algumas respostas das perguntas.
11. Acessar o Swagger em `http://127.0.0.1:8000/docs`.
12. Mostrar no código que a API Key fica apenas no backend.
13. Explicar o fluxo React Native → FastAPI → Gemini → FastAPI → React Native.

## Teste negativo sugerido

Tentar enviar assunto vazio, conteúdo muito curto e quantidade de perguntas fora de 1–10 para demonstrar as validações.
