import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../theme";
import IconButton from "./IconButton";
import { images } from "../image";
import PropTypes from "prop-types";

const Task = ({ item, deleteTask, toggleTask }) => {
  return (
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
      {item.completed || <IconButton type={images.update} />}
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
