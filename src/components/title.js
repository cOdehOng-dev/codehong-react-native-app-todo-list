import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../theme";

const Title = () => {
  return (
    <View>
      <Text style={styles.title}>TODO List</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: theme.main,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginRight: 20,
  },
});
