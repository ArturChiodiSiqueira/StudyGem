from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health", summary="Verifica a saúde da API")
def health() -> dict[str, str]:
    return {"status": "ok"}
