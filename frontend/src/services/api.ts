import { StudyRequest, StudyResponse } from "../types/study";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function generateStudy(payload: StudyRequest): Promise<StudyResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/study`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const message =
      typeof body === "object" && body && "error" in body && typeof body.error === "string"
        ? body.error
        : "Não foi possível gerar o estudo.";
    throw new Error(message);
  }

  return body as StudyResponse;
}
