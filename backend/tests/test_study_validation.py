import pytest
from pydantic import ValidationError

from app.schemas.study import StudyRequest


def valid_payload(**overrides):
    payload = {
        "subject": "Redes de Computadores",
        "content": "O protocolo HTTP é utilizado na comunicação entre clientes e servidores na web.",
        "question_count": 5,
        "language": "pt-BR",
    }
    payload.update(overrides)
    return payload


def test_valid_request_is_accepted():
    model = StudyRequest(**valid_payload())
    assert model.question_count == 5


@pytest.mark.parametrize("payload", [
    valid_payload(subject=""),
    valid_payload(subject="A"),
    valid_payload(content=""),
    valid_payload(content="curto"),
    valid_payload(content="x" * 10_001),
    valid_payload(question_count=0),
    valid_payload(question_count=11),
])
def test_invalid_request_is_rejected(payload):
    with pytest.raises(ValidationError):
        StudyRequest(**payload)


def test_whitespace_is_trimmed():
    model = StudyRequest(**valid_payload(subject="  Matemática  ", content="\n Conteúdo suficiente para o teste de normalização. \n"))
    assert model.subject == "Matemática"
    assert model.content.startswith("Conteúdo suficiente")
