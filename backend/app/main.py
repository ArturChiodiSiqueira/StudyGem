from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.routes.health import router as health_router
from app.routes.study import router as study_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="API do StudyGem para transformar conteúdo acadêmico em material de revisão com Gemini.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"error": "Erro de validação do request.", "details": exc.errors()})


@app.exception_handler(Exception)
async def unhandled_exception_handler(_, __):
    return JSONResponse(status_code=500, content={"error": "Erro interno."})


app.include_router(health_router)
app.include_router(study_router)
