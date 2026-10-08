from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.core.config import Settings, get_settings
from app.schemas.study import StudyRequest, StudyResponse
from app.services.gemini_service import GeminiService, GeminiServiceError

router = APIRouter(prefix="/api/v1/study", tags=["Study"])


def get_gemini_service(settings: Settings = Depends(get_settings)) -> GeminiService:
    return GeminiService(settings)


@router.post(
    "",
    response_model=StudyResponse,
    summary="Gera um estudo a partir de um conteúdo",
    responses={
        502: {"description": "Falha na integração com Gemini"},
        500: {"description": "Erro interno"},
    },
)
def generate_study(request: StudyRequest, service: GeminiService = Depends(get_gemini_service)):
    try:
        return service.generate_study(request)
    except GeminiServiceError as exc:
        message = str(exc)
        if "API_KEY" in message:
            return JSONResponse(status_code=500, content={"error": "Configuração do serviço de IA indisponível."})
        return JSONResponse(status_code=502, content={"error": message})
    except Exception:
        return JSONResponse(status_code=500, content={"error": "Erro interno ao gerar o estudo."})
