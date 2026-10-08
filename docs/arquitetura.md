# Arquitetura do StudyGem

```text
┌──────────────────────────────┐
│       React Native           │
│          Expo Web            │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│           FastAPI            │
│                              │
│ Validação Pydantic           │
│ Regras de negócio            │
│ Prompt controlado            │
│ Tratamento de erros          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Gemini API            │
│                              │
│ Resumo                       │
│ Pontos principais            │
│ Questões + respostas         │
└──────────────────────────────┘
```

A chave do Gemini permanece exclusivamente no backend. O frontend nunca conhece a credencial.

## Fluxo de dados

1. O usuário preenche o formulário.
2. O Expo Web envia JSON para `POST /api/v1/study`.
3. FastAPI valida tamanho, conteúdo e quantidade de perguntas.
4. O serviço monta instruções internas e inclui o conteúdo do estudante em um bloco delimitado.
5. O Google GenAI SDK solicita JSON estruturado com esquema baseado em Pydantic.
6. O backend valida a resposta novamente.
7. O frontend renderiza o resultado de forma amigável.
