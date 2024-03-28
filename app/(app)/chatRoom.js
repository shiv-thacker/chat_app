import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { useRouter } from "expo-router";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../Context/authContext";
import { getRoomId } from "../../utils/common";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ChatRoom = () => {
  const item = useLocalSearchParams(); //second user
  const { user } = useAuth(); // logged in user
  console.log("got item data:", item);
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  //for message state ref
  const textRef = useRef("");

  //for <Textinput/> ref
  const inputRef = useRef(null);

  //scrollviewref for chat should not hide behind keyboard

  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNoExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");

    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allmessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allmessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollview
    );

    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollview();
  }, [messages]);

  const updateScrollview = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const createRoomIfNoExists = async () => {
    //roomId

    let roomId = getRoomId(user?.userId, item?.userId);

    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();

    if (!message) return;

    try {
      // sort and mrerge both roomid
      let roomId = getRoomId(user?.userId, item?.userId);
      //get firebase collection from this id
      const docRef = doc(db, "rooms", roomId);
      //make new collection from upper reference
      const messagesRef = collection(docRef, "messages");

      textRef.current = "";

      if (inputRef) inputRef?.current?.clear();

      //now add perticular data in this collection
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        sendername: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("new message id", newDoc.id);
    } catch (e) {
      Alert.alert("message", e.message);
    }
  };

  console.log("message", messages);
  return (
    <CustomKeyboardView inchat={true}>
      <View
        style={{ flex: 1, backgroundColor: "white" }}
        // className="flex-1 bg-white"
      >
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View
          style={{
            height: hp(2),
            borderBottomWidth: 1,
            borderBottomColor: "#D1D5DB",
          }}
          //className="h-3 border-b border-neutral-300"
        ></View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: "#F3F4F6", // Assuming neutral-100 is equivalent to #F3F4F6
            overflow: "visible",
          }}
          // className="flex-1 justify-between bg-neutral-100 overflow-visible"
        >
          <View
            style={{ flex: 1 }}
            //className="flex-1"
          >
            <MessageList
              messages={messages}
              currentUser={user}
              scrollViewRef={scrollViewRef}
            />
          </View>
          <View
            //className="pt-2"
            style={{ marginBottom: hp(2.7), paddingTop: hp(2) }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: "white",
                borderWidth: 1,
                padding: hp(0.7),
                borderColor: "#D1D5DB",
                borderRadius: 999,
                paddingLeft: 5,
                marginHorizontal: wp(2),
              }}
              //className="flex-row justify-around bg-white border p-2 border-neutral-300  rounded-full pl-5 mx-3"
            >
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message..."
                // className="flex-1 mr-2"
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  marginRight: wp(2),
                  marginLeft: wp(0.7),
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#DDDDDD",
                  padding: wp(2),
                  marginRight: wp(0.5),
                  borderRadius: 100,
                }}
                onPress={handleSendMessage}
              >
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
