
def payload(question_count=5):
    return {
        "subject": "Redes de Computadores",
        "content": "O protocolo HTTP é utilizado na comunicação entre clientes e servidores na web.",
        "question_count": question_count,
        "language": "pt-BR",
    }


def test_study_endpoint_returns_expected_structure(client):
    response = client.post("/api/v1/study", json=payload())
    assert response.status_code == 200
    body = response.json()
    assert body["subject"] == "Redes de Computadores"
    assert isinstance(body["summary"], str)
    assert isinstance(body["key_points"], list)
    assert len(body["questions"]) == 5
    assert set(body["questions"][0]) == {"question", "answer"}


def test_minimum_question_count(client):
    response = client.post("/api/v1/study", json=payload(1))
    assert response.status_code == 200
    assert len(response.json()["questions"]) == 1


def test_maximum_question_count(client):
    response = client.post("/api/v1/study", json=payload(10))
    assert response.status_code == 200
    assert len(response.json()["questions"]) == 10


def test_invalid_json_returns_422(client):
    response = client.post("/api/v1/study", content='{"subject":')
    assert response.status_code in (400, 422)


def test_validation_error_has_consistent_shape(client):
    response = client.post("/api/v1/study", json=payload(0))
    assert response.status_code == 422
    assert response.json()["error"] == "Erro de validação do request."
