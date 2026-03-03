import { Dimensions, StyleSheet, TextInput } from "react-native";
import { theme } from "../theme";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Input = ({ placeholder, value, onChangeText, onSubmitEditing }) => {
  const width = Dimensions.get("window").width;

  return (
    <TextInput
      style={{
        width: width - 40,
        height: 50,
        marginVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: theme.itemBackground,
        fontSize: 25,
        color: theme.text,
      }}
      placeholder={placeholder}
      placeholderTextColor={theme.text}
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
};
