import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.routes.study import get_gemini_service
from app.schemas.study import StudyQuestion, StudyResponse


class MockGeminiService:
    def generate_study(self, request):
        return StudyResponse(
            subject=request.subject,
            summary="Resumo mockado para teste.",
            key_points=["Ponto principal 1", "Ponto principal 2"],
            questions=[
                StudyQuestion(question=f"Pergunta {i}", answer=f"Resposta {i}")
                for i in range(1, request.question_count + 1)
            ],
        )


@pytest.fixture
def client():
    app.dependency_overrides[get_gemini_service] = lambda: MockGeminiService()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
