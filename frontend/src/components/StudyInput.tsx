import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const PRIMARY = "#2563EB";
const PURPLE = "#7C3AED";

export type StudyInputProps = {
  subject: string;
  content: string;
  questionCount: number;
  loading: boolean;
  onSubjectChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onQuestionCountChange: (value: number) => void;
  onGenerate: () => void;
};

export function StudyInput(props: StudyInputProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Assunto</Text>
      <TextInput
        value={props.subject}
        onChangeText={props.onSubjectChange}
        placeholder="Ex.: Redes de Computadores"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <Text style={[styles.label, styles.topSpacing]}>Conteúdo para estudar</Text>
      <TextInput
        value={props.content}
        onChangeText={props.onContentChange}
        placeholder="Cole aqui o texto, resumo ou anotações..."
        placeholderTextColor="#94A3B8"
        multiline
        textAlignVertical="top"
        style={[styles.input, styles.textArea]}
      />

      <View style={styles.row}>
        <View style={styles.questionBox}>
          <Text style={styles.label}>Perguntas</Text>
          <View style={styles.counterRow}>
            <Pressable onPress={() => props.onQuestionCountChange(Math.max(1, props.questionCount - 1))} style={styles.counterButton}>
              <Text style={styles.counterText}>−</Text>
            </Pressable>
            <Text style={styles.count}>{props.questionCount}</Text>
            <Pressable onPress={() => props.onQuestionCountChange(Math.min(10, props.questionCount + 1))} style={styles.counterButton}>
              <Text style={styles.counterText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          disabled={props.loading}
          onPress={props.onGenerate}
          style={({ pressed }: { pressed: boolean }) => [styles.button, props.loading && styles.buttonDisabled, pressed && styles.buttonPressed]}
        >
          <Text style={styles.spark}>✦</Text>
          <Text style={styles.buttonText}>{props.loading ? "Analisando..." : "Gerar estudo"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 24, borderWidth: 1, borderColor: "#E2E8F0", shadowColor: "#0F172A", shadowOpacity: 0.06, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 3 },
  label: { fontSize: 14, fontWeight: "700", color: "#334155", marginBottom: 8 },
  topSpacing: { marginTop: 18 },
  input: { borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#F8FAFC", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: "#0F172A" },
  textArea: { minHeight: 180 },
  row: { flexDirection: "row", alignItems: "flex-end", gap: 14, marginTop: 20, flexWrap: "wrap" },
  questionBox: { minWidth: 150 },
  counterRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  counterButton: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#EEF2FF", borderWidth: 1, borderColor: "#C7D2FE" },
  counterText: { fontSize: 22, fontWeight: "700", color: PURPLE },
  count: { minWidth: 28, textAlign: "center", fontSize: 18, fontWeight: "800", color: "#0F172A" },
  button: { minHeight: 48, paddingHorizontal: 22, borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, backgroundColor: PRIMARY, flexGrow: 1 },
  buttonDisabled: { opacity: 0.6 },
  buttonPressed: { transform: [{ scale: 0.99 }] },
  buttonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  spark: { color: "#FFFFFF", fontSize: 20, fontWeight: "900" },
});
