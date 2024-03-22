import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { blurhash, formatDate, getRoomId } from "../utils/common";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const ChatItem = ({ item, router, noBorder, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined);
  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");

    const q = query(messageRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allmessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setLastMessage(allmessages[0] ? allmessages[0] : null);
    });

    return unsub;
  }, []);

  console.log("last message", lastMessage);

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };
  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId)
        return "You: " + lastMessage?.text;
    } else {
      return "Say Hi!!";
    }
  };
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={[
        styles.touchablechat,
        { borderBottomWidth: noBorder ? null : wp(0.3) },
      ]}
    >
      <Image
        source={{ uri: item?.profileUrl }}
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        placeholder={blurhash}
        transition={500}
      />

      {/* name and last message */}
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  touchablechat: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(2.5),
    alignItems: "center",
    gap: wp(3),
    marginBottom: hp(2),
    paddingBottom: hp(1),
    borderBottomWidth: wp(0.3),
    borderColor: "gray",
  },
});
