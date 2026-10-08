# StudyGem — Frontend

Interface web responsiva construída com React Native, Expo e TypeScript. O mesmo código é executado no Expo Web.

## Configuração

Por padrão, a aplicação chama `http://127.0.0.1:8000`. Para outro endereço, use:

```powershell
$env:EXPO_PUBLIC_API_URL="http://127.0.0.1:8000"
```

## Execução

```powershell
npm install
npm run web
```

A aplicação abre no navegador pelo Expo.

## Fluxo

O estudante informa o assunto, cola o conteúdo, escolhe de 1 a 10 perguntas e solicita a análise. Durante o carregamento, novos envios são bloqueados. Em sucesso, o resumo, pontos principais e perguntas são exibidos; cada resposta pode ser expandida individualmente.
