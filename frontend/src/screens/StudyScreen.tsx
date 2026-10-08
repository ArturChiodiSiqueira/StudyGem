import { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StudyInput } from "../components/StudyInput";
import { StudyResult } from "../components/StudyResult";
import { generateStudy } from "../services/api";
import { StudyResponse } from "../types/study";

export function StudyScreen() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<StudyResponse | null>(null);

  async function handleGenerate() {
    setError("");
    const cleanSubject = subject.trim();
    const cleanContent = content.trim();
    if (cleanSubject.length < 2) return setError("Informe um assunto com pelo menos 2 caracteres.");
    if (cleanContent.length < 20) return setError("Insira pelo menos 20 caracteres de conteúdo para análise.");

    setLoading(true);
    try {
      setResult(await generateStudy({ subject: cleanSubject, content: cleanContent, question_count: questionCount, language: "pt-BR" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível gerar o estudo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleNew() {
    setResult(null);
    setError("");
    setSubject("");
    setContent("");
    setQuestionCount(5);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.brand}>StudyGem</Text>
          <Text style={styles.subtitle}>Aprenda melhor com ajuda da Inteligência Artificial.</Text>
          <Text style={styles.tagline}>Seu conteúdo. Seu resumo. Seu estudo.</Text>
        </View>

        {!result && <StudyInput subject={subject} content={content} questionCount={questionCount} loading={loading} onSubjectChange={setSubject} onContentChange={setContent} onQuestionCountChange={setQuestionCount} onGenerate={handleGenerate} />}

        {loading && <View style={styles.loading}><ActivityIndicator size="large" color="#2563EB" /><Text style={styles.loadingTitle}>Analisando conteúdo...</Text><Text style={styles.loadingText}>O StudyGem está preparando seu material de revisão.</Text></View>}

        {!!error && <View style={styles.error}><Text style={styles.errorTitle}>Não foi possível gerar o estudo.</Text><Text style={styles.errorText}>{error}</Text></View>}

        {!!result && !loading && <StudyResult result={result} onNewAnalysis={handleNew} />}

        <Text style={styles.footer}>StudyGem • Projeto acadêmico de integração com Gemini</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  page: { width: "100%", maxWidth: 980, alignSelf: "center", padding: 22, gap: 18 },
  hero: { paddingVertical: 18 },
  brand: { fontSize: 36, fontWeight: "900", color: "#2563EB" },
  subtitle: { fontSize: 18, fontWeight: "700", color: "#0F172A", marginTop: 4 },
  tagline: { color: "#7C3AED", fontWeight: "700", marginTop: 9 },
  loading: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 28, alignItems: "center", borderWidth: 1, borderColor: "#E2E8F0" },
  loadingTitle: { marginTop: 14, fontSize: 18, fontWeight: "800", color: "#0F172A" },
  loadingText: { marginTop: 6, color: "#64748B", textAlign: "center" },
  error: { backgroundColor: "#FFF7ED", borderColor: "#FDBA74", borderWidth: 1, borderRadius: 16, padding: 16 },
  errorTitle: { color: "#9A3412", fontWeight: "800" },
  errorText: { color: "#C2410C", marginTop: 4, lineHeight: 21 },
  footer: { textAlign: "center", color: "#94A3B8", fontSize: 12, paddingVertical: 18 },
});
