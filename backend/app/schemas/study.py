from pydantic import BaseModel, Field, field_validator


class StudyRequest(BaseModel):
    subject: str = Field(min_length=2, max_length=100)
    content: str = Field(min_length=20, max_length=10_000)
    question_count: int = Field(ge=1, le=10)
    language: str = Field(default="pt-BR", min_length=2, max_length=10)

    @field_validator("subject", "content", mode="before")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        if not isinstance(value, str):
            return value
        return " ".join(value.strip().split()) if "\n" not in value else value.strip()

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("subject não pode ser vazio.")
        return value.strip()

    @field_validator("content")
    @classmethod
    def validate_content(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("content não pode ser vazio.")
        if not value.strip():
            raise ValueError("content não pode ser vazio.")
        return value.strip()


class StudyQuestion(BaseModel):
    question: str = Field(min_length=1)
    answer: str = Field(min_length=1)


class StudyResponse(BaseModel):
    subject: str
    summary: str = Field(min_length=1)
    key_points: list[str] = Field(min_length=1)
    questions: list[StudyQuestion] = Field(min_length=1, max_length=10)
