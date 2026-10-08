import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StudyResponse } from "../types/study";

export function StudyResult({ result, onNewAnalysis }: { result: StudyResponse; onNewAnalysis: () => void }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <View style={styles.sectionHeader}><Text style={styles.icon}>▤</Text><Text style={styles.sectionTitle}>Resumo</Text></View>
        <Text style={styles.body}>{result.summary}</Text>
      </View>

      <View style={styles.resultCard}>
        <View style={styles.sectionHeader}><Text style={styles.icon}>✓</Text><Text style={styles.sectionTitle}>Principais pontos</Text></View>
        {result.key_points.map((point, index) => (
          <View style={styles.point} key={`${point}-${index}`}><View style={styles.dot} /><Text style={styles.body}>{point}</Text></View>
        ))}
      </View>

      <View style={styles.resultCard}>
        <View style={styles.sectionHeader}><Text style={styles.icon}>?</Text><Text style={styles.sectionTitle}>Perguntas para revisão</Text></View>
        {result.questions.map((item, index) => (
          <View style={styles.questionCard} key={`${item.question}-${index}`}>
            <Text style={styles.questionNumber}>QUESTÃO {index + 1}</Text>
            <Text style={styles.question}>{item.question}</Text>
            <Pressable onPress={() => setOpen((current) => ({ ...current, [index]: !current[index] }))} style={styles.answerButton}>
              <Text style={styles.answerButtonText}>{open[index] ? "Ocultar resposta" : "Mostrar resposta"}</Text>
              <Text style={styles.chevron}>{open[index] ? "⌃" : "⌄"}</Text>
            </Pressable>
            {open[index] && <View style={styles.answer}><Text style={styles.answerText}>{item.answer}</Text></View>}
          </View>
        ))}
      </View>

      <Pressable onPress={onNewAnalysis} style={styles.newButton}><Text style={styles.refresh}>↻</Text><Text style={styles.newButtonText}>Nova análise</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16, width: "100%" },
  resultCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 22, borderWidth: 1, borderColor: "#E2E8F0" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 19, fontWeight: "800", color: "#0F172A" },
  icon: { fontSize: 20, fontWeight: "900", color: "#2563EB" },
  chevron: { fontSize: 18, color: "#2563EB", fontWeight: "900" },
  refresh: { fontSize: 18, color: "#FFFFFF", fontWeight: "900" },
  body: { color: "#334155", lineHeight: 24, fontSize: 15 },
  point: { flexDirection: "row", gap: 10, marginBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 99, backgroundColor: "#7C3AED", marginTop: 8 },
  questionCard: { borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 16, padding: 16, marginTop: 12, backgroundColor: "#F8FAFC" },
  questionNumber: { fontSize: 11, fontWeight: "800", letterSpacing: 1, color: "#7C3AED", marginBottom: 7 },
  question: { fontSize: 16, lineHeight: 23, fontWeight: "700", color: "#0F172A" },
  answerButton: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingVertical: 9 },
  answerButtonText: { color: "#2563EB", fontWeight: "800" },
  answer: { marginTop: 4, padding: 14, borderRadius: 12, backgroundColor: "#EEF2FF" },
  answerText: { color: "#334155", lineHeight: 22 },
  newButton: { backgroundColor: "#0F172A", borderRadius: 14, paddingVertical: 14, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
  newButtonText: { color: "#FFFFFF", fontWeight: "800" },
});
