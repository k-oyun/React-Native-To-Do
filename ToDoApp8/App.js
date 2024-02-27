import {StatusBar} from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import {theme} from "./colors";
import {useState} from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  //hashmap : {}
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if (text === "") {
      return;
    }
    //Object.assign = object과 object을 합쳐줌
    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: {text, work: working},
    // });

    //object를 새로 만듬
    const newToDos = {...toDos, [Date.now()]: {text, work: working}};
    //save to do
    setToDos(newToDos);
    setText("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* TouchableOpacity를 사용하면 touch시 opacity animation을 가짐 */}
        {/* TouchableHighlight touch시 배경이 바뀜, touch시 action을 지정할 수 있음 */}
        {/* TouchableWithoutFeedback은 touch시 아무 animation 변경이 없음 */}
        {/* Pressable은 TouchableWithoutFeedback과 유사하지만 더 많은 기능을 가짐 
          Hitslop을 사용하여 터치인식 범위를 지정할 수 있음*/}
        <TouchableOpacity onPress={work}>
          <Text
            style={{...styles.btnText, color: working ? "white" : theme.grey}}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{...styles.btnText, color: !working ? "white" : theme.grey}}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        returnKeyType="done"
        value={text}
        style={styles.input}
        placeholder={working ? "Add a To Do" : "Where do you want to go"}

        // placeholderTextColor="red"
        //여러 줄을 쓸 수 있음
        // multiline
        //비밀번호 입력시 별표 처리
        // secureTextEntry
        //return key type을 바꿀 수 있음 ex) 전송, 완료
        // returnKeyType="done"
        // return key Label은 label 내용을 바꿀 수 있음
        //keyboard default type을 지정할 수 있음 ex) 전화번호 입력, 이메일 입력, 주소 입력
        // keyboardType="web-search"
      />
      <ScrollView>
        {/* key를 통해 toDo를 렌더링 */}
        {Object.keys(toDos).map((key) => (
          <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View>
        ))}
      </ScrollView>
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
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
