import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "../theme";
import PropTypes from "prop-types";
import { images } from "../image";

const IconButton = ({ type, onPressOut }) => {
  return (
    <TouchableOpacity onPressOut={onPressOut}>
      <Image style={styles.image} source={type} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    margin: 10,
    tintColor: theme.text,
  },
});

IconButton.prototype = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
};
