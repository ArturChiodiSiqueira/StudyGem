# StudyGem — Backend

API REST construída com FastAPI para validar conteúdos de estudo, montar o prompt controlado e integrar o Gemini no backend.

## Tecnologias

Python, FastAPI, Pydantic, pydantic-settings, python-dotenv, Google GenAI SDK, Uvicorn e pytest.

## Configuração

Copie `.env.example` para `.env` e preencha `GEMINI_API_KEY` com sua própria chave. Nunca versione o `.env`.

## Execução

```powershell
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Swagger: http://127.0.0.1:8000/docs

## Endpoints

- `GET /health`
- `POST /api/v1/study`

O endpoint de estudo recebe assunto, conteúdo, quantidade de perguntas e idioma. A API valida o request, cria um prompt interno, solicita JSON estruturado ao Gemini e valida novamente a saída antes de responder.

## Testes

```powershell
pytest -q
```

Os testes utilizam mock e não dependem da API real.
