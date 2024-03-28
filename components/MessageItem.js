import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem = ({ message, currentUser }) => {
  if (currentUser?.userId == message?.userId) {
    return (
      <View
        style={{
          flexDirection: "row", // flex-row
          justifyContent: "flex-end", // justify-end
          marginBottom: hp(0.7), // mb-3
          marginRight: wp(2), // mr-3
        }}
        //className="flex-row justify-end mb-3 mr-3"
      >
        <View style={{ width: wp(80) }}>
          <View
            style={{
              display: "flex", // flex
              alignSelf: "flex-end", // self-end
              borderRadius: 16, // rounded-2xl (2 * 8 = 16)
              backgroundColor: "white", // bg-white
              borderWidth: 1, // border
              borderColor: "#D1D5DB", // border-neutral-200
              padding: 12, // p-3 (3 * 4 = 12)
            }}
            //className="flex self-end rounded-2xl bg-white border border-neutral-200 p-3"
          >
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        // className="mb-3 ml-3"
        style={{
          width: wp(80),
          marginBottom: hp(0.7), // mb-3
          marginLeft: wp(2), // ml-3
        }}
      >
        <View
          style={{
            display: "flex", // flex
            alignSelf: "flex-start", // self-start
            padding: 12, // p-3 (3 * 4 = 12)
            paddingHorizontal: 16, // px-4
            borderRadius: 16, // rounded-2xl (2 * 8 = 16)
            borderWidth: 1, // border
            backgroundColor: "#EBF4FF", // bg-indigo-100
            borderColor: "#C3DAFE", // border-indigo-200
          }}
          //className="flex self-start p-3 px-4 rounded-2xl border bg-indigo-100 border-indigo-200"
        >
          <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;

const styles = StyleSheet.create({});
