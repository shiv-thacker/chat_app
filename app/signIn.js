import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../Context/authContext";

const signIn = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please Fill All The Feilds");
      return;
    }

    setLoading(true);
    // login process

    let response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log("get result: signin", response);
    if (!response.success) {
      Alert.alert("Sign In", response?.msg);
    }
  };
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />

      {/* SignIn Image */}
      <View
        className="flex-1 gap-12"
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25), resizeMode: "contain" }}
            source={require("../assets/images/login.png")}
          />
        </View>
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="tracking-wider font-bold text-center text-neutral-800"
          >
            Sign In
          </Text>
          {/* input fields */}
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>

            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={"gray"}
                />
              </View>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-neutral-500"
              >
                Forgot Password
              </Text>
            </View>

            {/* submit button */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(8)} />
                </View>
              ) : (
                <TouchableOpacity
                  //   className="bg-indigo-500 rounded-xl justify-center items-center"
                  style={{
                    height: hp(6.5),
                    backgroundColor: "#3f51f5",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: hp(2),
                  }}
                  onPress={handleLogin}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default signIn;

const styles = StyleSheet.create({});
