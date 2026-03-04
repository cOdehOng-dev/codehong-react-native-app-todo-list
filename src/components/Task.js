import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme";
import IconButton from "./IconButton";
import { images } from "../image";
import PropTypes from "prop-types";
import Input from "./Input";

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };

  /**
   * Object.assign(                                                                                                                                                     
    {},           // 빈 객체 (복사본)                                                                                                                              
    item,         // 기존 item 전체 복사
    { text }      // text만 새 값으로 덮어씌움
  )
   */
  const _onSubmitEditiing = () => {
    if (isEditing) {
      // 기존 item을 복사하고 text만 새 값으로 덮어써서 수정된 task 생성
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      // 부모(App.js)로 수정된 task 전달
      updateTask(editedTask);
    }
  };

  const _onBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setText(item.text); // 편집 취소 시 원래 텍스트로 복원
    }
  };
  return isEditing ? (
    <Input
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={_onSubmitEditiing}
      onBlur={_onBlur}
    />
  ) : (
    <View style={styles.container}>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Text
        style={[
          styles.contents,
          {
            color: item.completed ? theme.done : theme.text,
            textDecorationLine: item.completed ? "line-through" : "none",
          },
        ]}
      >
        {item.text}
      </Text>
      {item.completed || (
        <IconButton
          type={images.update}
          onPressOut={_handleUpdateButtonPress}
        />
      )}
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      />
    </View>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.itemBackground,
    borderRadius: 10,
    padding: 5,
    marginVertical: 3,
  },
  contents: {
    flex: 1,
    fontSize: 24,
  },
});

export default Task;
