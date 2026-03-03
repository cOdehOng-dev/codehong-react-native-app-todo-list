import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../theme";
import IconButton from "./IconButton";
import { images } from "../image";
import PropTypes from "prop-types";

const Task = ({ text }) => {
  return (
    <View style={styles.container}>
      <IconButton type={images.uncompleted} />
      <Text style={styles.contents}>{text}</Text>
      <IconButton type={images.update} />
      <IconButton type={images.delete} />
    </View>
  );
};

Task.prototype = {
  text: PropTypes.string.isRequired,
};

export default Task;

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
    color: theme.text,
  },
});
