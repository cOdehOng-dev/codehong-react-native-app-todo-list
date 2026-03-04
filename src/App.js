import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Title from "./components/Title";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StatusBar } from "react-native";
import Input from "./components/Input";
import { useState } from "react";
import Task from "./components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

export default function App() {
  const width = Dimensions.get("window").width;

  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});

  const _saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks); // 상태 업데이트로 UI 즉시 반영
    } catch (e) {
      console.error(e);
    }
  };
  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem("tasks");
    setTasks(JSON.parse(loadedTasks) || {});
  };

  /**
   * 추가
   * ID 생성 → 새로운 Task 객체 생성 → 기존 tasks 객체와 병합 → 상태 업데이트
   */
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask("");
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  /**
   * 삭제
   *  tasks (원본) → 복사 → id 삭제 → setTasks로 상태 업데이트
   * @param {*} id
   */
  const _deletTask = (id) => {
    // Object.assign({}, tasks) : tasks 객체를 얕은 복사(shallow copy) 해서 새 객체 생성
    // 원본 tasks를 직접 수정하지 않기 위해 복사본을 만드는 것 (불변성 유지)
    const currentTask = Object.assign({}, tasks);
    delete currentTask[id];
    _saveTasks(currentTask);
  };

  const _toggleTask = (id) => {
    const currentTask = Object.assign({}, tasks);
    currentTask[id]["completed"] = !currentTask[id]["completed"];
    _saveTasks(currentTask);
  };

  const _updateTask = (item) => {
    const currentTask = Object.assign({}, tasks);
    currentTask[item.id] = item;
    _saveTasks(currentTask);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  const _onBlur = () => {
    setNewTask("");
  };

  return isReady? (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.background,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* Android status bar color */}
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.background}
          />
          <Title />
          <Input
            placeholder="+ Add a Task" // 입력창에 표시되는 안내 문구
            value={newTask} // 입력창에 표시되는 현재 텍스트 상태
            onChangeText={_handleTextChange} // 텍스트 변경 시 newTask 상태 업데이트
            onSubmitEditing={_addTask} // 키보드 완료 버튼 클릭 시 task 추가
            onBlur={_onBlur} // 입력창 포커스 해제 시 newTask 초기화
          />
          <ScrollView
            style={{
              flex: 1,
              width: width - 40,
            }}
          >
            {Object.values(tasks)
              .reverse()
              .map((item) => (
                <Task
                  key={item.id}
                  item={item}
                  deleteTask={_deletTask}
                  toggleTask={_toggleTask}
                  updateTask={_updateTask}
                />
              ))}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  ) : (
    <AppLoading 
      startAsync={_loadTasks} // 앱 로딩 시 실행할 비동기 함수
      onFinish={() => setIsReady(true)} // 로딩 완료 시 isReady 상태를 true로 설정
      onError={console.warn} // 로딩 중 에러 발생 시 콘솔에 경고 메시지 출력
    />
  )
}
