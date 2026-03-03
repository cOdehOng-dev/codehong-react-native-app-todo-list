import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "../theme";
import PropTypes from "prop-types";
import { images } from "../image";

const IconButton = ({ type, onPressOut, id, completed }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Image
        style={[
          styles.image,
          { tintColor: completed ? theme.done : theme.text },
        ]}
        source={type}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    margin: 10,
  },
});

IconButton.defaultProps = {
  onPressOut: () => {},
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
};

export default IconButton;
