from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, TimeoutError as FutureTimeoutError

try:
    from google import genai  # type: ignore
except ImportError:  # Permite executar a suíte de testes sem o SDK instalado.
    genai = None

from app.core.config import Settings
from app.schemas.study import StudyResponse
from app.utils.prompts import build_study_prompt


class GeminiServiceError(Exception):
    """Erro controlado na integração com o Gemini."""


class GeminiService:
    def __init__(self, settings: Settings):
        self.settings = settings

    def generate_study(self, request) -> StudyResponse:
        if not self.settings.gemini_api_key:
            raise GeminiServiceError("GEMINI_API_KEY não configurada.")
        if genai is None:
            raise GeminiServiceError("SDK do Gemini não instalado no ambiente.")

        client = genai.Client(api_key=self.settings.gemini_api_key)
        prompt = build_study_prompt(request)
        config = {
            "response_mime_type": "application/json",
            "response_schema": StudyResponse,
        }

        try:
            with ThreadPoolExecutor(max_workers=1) as executor:
                future = executor.submit(
                    client.models.generate_content,
                    model=self.settings.gemini_model,
                    contents=prompt,
                    config=config,
                )
                response = future.result(timeout=self.settings.gemini_timeout_seconds)
        except FutureTimeoutError as exc:
            raise GeminiServiceError("Tempo limite excedido ao comunicar com o Gemini.") from exc
        except Exception as exc:
            raise GeminiServiceError("Falha ao comunicar com o Gemini.") from exc

        parsed = getattr(response, "parsed", None)
        if parsed is not None:
            try:
                result = parsed if isinstance(parsed, StudyResponse) else StudyResponse.model_validate(parsed)
            except Exception as exc:
                raise GeminiServiceError("O Gemini retornou uma estrutura inválida.") from exc
        else:
            raw_text = getattr(response, "text", None)
            if not raw_text:
                raise GeminiServiceError("O Gemini não retornou conteúdo válido.")
            try:
                result = StudyResponse.model_validate_json(raw_text)
            except Exception as exc:
                raise GeminiServiceError("O Gemini retornou uma estrutura inválida.") from exc

        if len(result.questions) != request.question_count:
            raise GeminiServiceError("O Gemini não retornou a quantidade esperada de perguntas.")

        result.subject = request.subject
        return result
