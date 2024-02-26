import {StatusBar} from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import {theme} from "./colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* TouchableOpacity를 사용하면 touch시 opacity animation을 가짐 */}
        {/* TouchableHighlight touch시 배경이 바뀜, touch시 action을 지정할 수 있음 */}
        {/* TouchableWithoutFeedback은 touch시 아무 animation 변경이 없음 */}
        {/* Pressable은 TouchableWithoutFeedback과 유사하지만 더 많은 기능을 가짐 
          Hitslop을 사용하여 터치인식 범위를 지정할 수 있음*/}
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
});
