from unittest.mock import Mock
import pytest
import time

from app.core.config import Settings
from app.schemas.study import StudyRequest
from app.services.gemini_service import GeminiService, GeminiServiceError
import app.services.gemini_service as module


def request(count=3):
    return StudyRequest(
        subject="Matemática",
        content="Funções relacionam elementos de dois conjuntos e podem ser representadas por gráficos.",
        question_count=count,
    )


def test_missing_api_key_is_controlled():
    service = GeminiService(Settings(gemini_api_key=None))
    with pytest.raises(GeminiServiceError, match="API_KEY"):
        service.generate_study(request())


def test_invalid_gemini_json_is_controlled(monkeypatch):
    fake_response = Mock(text="not-json")
    fake_client = Mock()
    fake_client.models.generate_content.return_value = fake_response
    monkeypatch.setattr(module, "genai", Mock(Client=lambda api_key: fake_client))
    service = GeminiService(Settings(gemini_api_key="test-key"))
    with pytest.raises(GeminiServiceError, match="estrutura inválida"):
        service.generate_study(request())


def test_unavailable_gemini_is_controlled(monkeypatch):
    fake_client = Mock()
    fake_client.models.generate_content.side_effect = RuntimeError("network down")
    monkeypatch.setattr(module, "genai", Mock(Client=lambda api_key: fake_client))
    service = GeminiService(Settings(gemini_api_key="test-key"))
    with pytest.raises(GeminiServiceError, match="Falha ao comunicar"):
        service.generate_study(request())


def test_gemini_timeout_is_controlled(monkeypatch):
    fake_client = Mock()
    fake_client.models.generate_content.side_effect = lambda **_: time.sleep(0.05)
    monkeypatch.setattr(module, "genai", Mock(Client=lambda api_key: fake_client))
    service = GeminiService(Settings(gemini_api_key="test-key", gemini_timeout_seconds=0))
    with pytest.raises(GeminiServiceError, match="Tempo limite"):
        service.generate_study(request())
