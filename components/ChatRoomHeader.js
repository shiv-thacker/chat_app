import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ChatRoomHeader = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View
            style={{
              flexDirection: "row", // flex-row
              alignItems: "center", // items-center
              gap: wp(1), // gap-4
            }}
            // className="flex-row items-center gap-4"
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row", // flex-row
                alignItems: "center", // items-center
                gap: wp(2), // gap-3
              }}
              // className="flex-row items-center gap-3"
            >
              <Image
                source={{ uri: user?.profileUrl }}
                style={{ height: hp(4.5), borderRadius: 100, aspectRatio: 1 }}
              />
              <Text
                style={{
                  fontSize: hp(2.5),

                  color: "#222222", // text-neutral-700
                  fontWeight: "500", // font-medium
                }}
                //className="text-neutral-700 font-medium"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),

        headerRight: () => (
          <View
            style={{
              flexDirection: "row", // flex-row
              alignItems: "center", // items-center
              justifyContent: "space-between",
              gap: wp(6),
              marginHorizontal: wp(5), // gap-8
            }}
            // className="flex-row items-center gap-8"
          >
            <Ionicons name="call" size={hp(2.8)} color="#737373" />
            <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
          </View>
        ),
      }}
    />
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({});
