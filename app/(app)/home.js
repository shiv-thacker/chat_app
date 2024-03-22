import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../../Context/authContext";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import Chatlist from "../../components/Chatlist";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../../components/Loading";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import { userRef } from "../../firebaseConfig";

const home = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.userId) getUsers();
    console.log("user in home", user);
  }, [user]);
  const getUsers = async () => {
    //fetch users
    const q = query(userRef, where("userId", "!=", user?.userId));

    const querySnapshot = await getDocs(q);

    let data = [];

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    console.log("get user data", data);
    setUsers(data);
  };

  return (
    <View className="flex-1 bg-white">
      {/* to make fonts while in status bar */}
      <StatusBar style="light" />

      {users.length > 0 ? (
        <Chatlist users={users} currentUser={user} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      )}
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
