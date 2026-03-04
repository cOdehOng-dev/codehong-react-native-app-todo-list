import { Dimensions, StyleSheet, TextInput } from "react-native";
import { theme } from "../theme";
import React, { useState } from "react";
import PropTypes from "prop-types";

// placeholder: 안내 문구, value: 현재 텍스트, onChangeText: 변경 핸들러
// onSubmitEditing: 완료 버튼 핸들러, onBlur: 포커스 해제 핸들러
const Input = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  // 기기 화면 너비 가져오기
  const width = Dimensions.get("window").width;

  return (
    <TextInput
      style={{
        width: width - 40,       // 좌우 여백 20씩 확보
        height: 50,
        marginVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: theme.itemBackground,
        fontSize: 25,
        color: theme.text,
      }}
      placeholder={placeholder}
      placeholderTextColor={theme.text} // placeholder 글자 색상
      maxLength={50}                    // 최대 입력 글자 수 제한
      autoCapitalize="none"             // 자동 대문자 변환 비활성화
      autoCorrect={false}               // 자동 교정 비활성화
      returnKeyType="done"              // 키보드 완료 버튼 표시
      keyboardAppearance="dark"         // 키보드 다크 모드
      value={value}                     // 현재 입력 텍스트 상태
      onChangeText={onChangeText}       // 텍스트 변경 시 호출
      onSubmitEditing={onSubmitEditing} // 완료 버튼 클릭 시 호출
      onBlur={onBlur}                   // 포커스 해제 시 호출
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
  onblur: PropTypes.func.isRequired,
};
