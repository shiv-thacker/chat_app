import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator />
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({});
