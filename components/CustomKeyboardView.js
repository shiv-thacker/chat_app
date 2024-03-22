import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const ios = Platform.OS == "ios";

//we will write {children} here because we want to wrap up sign in and sign up components also
const CustomKeyboardView = ({ children, inchat }) => {
  let kavConfig = {};
  let scrollViewConfig = {};

  if (inchat) {
    kavConfig = {
      keyboardVerticalOffset: 90,
    };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;

const styles = StyleSheet.create({});
