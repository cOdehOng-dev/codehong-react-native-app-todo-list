import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Title from "./components/Title";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StatusBar } from "react-native";
import Input from "./components/Input";
import { useState } from "react";
import Task from "./components/Task";

export default function App() {
  const width = Dimensions.get("window").width;
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState({
    1: { id: "1", text: "Hanbit", completed: false },
    2: { id: "2", text: "React Native", completed: true },
    3: { id: "3", text: "React Native Sample", completed: false },
    4: { id: "4", text: "Edit TODO Item", completed: false },
  });

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
    setTasks({ ...tasks, ...newTaskObject });
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
    setTasks(currentTask);
  };

  const _toggleTask = (id) => {
    const currentTask = Object.assign({}, tasks);
    currentTask[id]["completed"] = !currentTask[id]["completed"];
    setTasks(currentTask);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  return (
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
            placeholder="+ Add a Task"
            value={newTask}
            onChangeText={_handleTextChange}
            onSubmitEditing={_addTask}
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
                />
              ))}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
