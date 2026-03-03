import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Title from "./components/Title";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StatusBar } from "react-native";
import Input from "./components/Input";
import { useState } from "react";
import IconButton from "./components/IconButton";
import { images } from "./image";
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

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
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
                 <Task key={item.id} text={item.text} />
              ))}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
