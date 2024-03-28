import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

const Chatlist = ({ users, currentUser }) => {
  // we need router in chatitem, but we declare here, because every time chat item render, it declare the router
  const router = useRouter();
  return (
    <View
      style={{ flex: 1 }}
      //className="flex-1 "
    >
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            currentUser={currentUser}
            item={item}
            index={index}
            noBorder={index + 1 == users.length}
            router={router}
          />
        )}
      />
    </View>
  );
};

export default Chatlist;

const styles = StyleSheet.create({});
