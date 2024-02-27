import {StatusBar} from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import {theme} from "./colors";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Fontisto} from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  //hashmap : {}
  const [toDos, setToDos] = useState({});
  useEffect(() => {
    loadToDos();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  //로컬에 toDo를 저장하도록
  //로컬에 저장함!
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  //로컬에 저장된 것을 불러옴!
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    //string -> js object으로 만들어줌
    setToDos(JSON.parse(s));
  };

  const addToDo = async () => {
    //text가 비어있으면 아무것도 하지않음
    if (text === "") {
      return;
    }

    //Text가 비어있지 않으면 object를 새로 만듬
    const newToDos = {...toDos, [Date.now()]: {text, working}};
    //save to do
    setToDos(newToDos);
    await saveToDos(newToDos);
    //text 초기화
    setText("");
  };
  //key에 맞는 toDo삭제
  const deleteToDo = (key) => {
    //삭제 전 재차 묻기
    //https://reactnative.dev/docs/alert
    Alert.alert("Delete To Do?", "Are you sure?", [
      {text: "Cancle"},
      {
        text: "I'm sure",
        style: "destructive",
        onPress: () => {
          const newToDos = {...toDos};
          //key에 맞는 object 삭제
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
    return;
    //...toDos는 새로운 옵젝을 불러와 삭제 후 toDo 업데이트하고 로컬에 저장
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
        {Object.keys(toDos).map((key) =>
          //각각의 카테고리의 맞는 todo만 출력되도록
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Text>
                  <Fontisto name="trash" size={18} color={theme.grey} />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
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
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
