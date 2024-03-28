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
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../Context/authContext";

const signIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const profileRef = useRef();

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please Fill All The Feilds");
      return;
    }

    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );

    setLoading(false);
    console.log("get result: signup", response);
    if (!response.success) {
      Alert.alert("Sign up", response.msg);
    }
    // register process
  };
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />

      {/* SignIn Image */}
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
          flex: 1,
          gap: hp(6),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: hp(20), resizeMode: "contain" }}
            source={require("../assets/images/register.png")}
          />
        </View>
        <View style={{ gap: hp(3) }}>
          <Text style={styles.signinText}>Sign Up</Text>
          {/* input fields */}
          <View style={{ gap: hp(2) }}>
            <View
              style={styles.inputtextcontainer}
              // className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={styles.textinput}
                //className="flex-1 font-semibold text-neutral-700"
                placeholder="Username"
                placeholderTextColor={"gray"}
              />
            </View>
            <View style={styles.inputtextcontainer}>
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={styles.textinput}
                // className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>

            <View
              style={styles.inputtextcontainer}
              // className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={styles.textinput}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={"gray"}
              />
            </View>

            <View style={styles.inputtextcontainer}>
              <Feather name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={styles.textinput}
                //className="flex-1 font-semibold text-neutral-700"
                placeholder="Profile url"
                placeholderTextColor={"gray"}
              />
            </View>

            {/* submit button */}
            <View>
              {loading ? (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                  //className="flex-row justify-center"
                >
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
                  onPress={handleRegister}
                >
                  <Text
                    style={{
                      fontSize: hp(2.7),
                      fontWeight: "bold",
                      color: "white",
                    }}
                    //className="text-white font-bold tracking-wider"
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}

            <View
              style={{ flexDirection: "row", justifyContent: "center" }}
              // className="flex-row justify-center"
            >
              <Text
                style={styles.forgotpassword}
                // className="font-semibold text-neutral-500"
              >
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("signIn")}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontWeight: "bold",
                    color: "#3F51B5",
                  }}
                >
                  Sign In
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

const styles = StyleSheet.create({
  signinText: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    color: "#222222",
  },
  inputtextcontainer: {
    flexDirection: "row",
    gap: wp(4),
    paddingHorizontal: wp(4),
    height: hp(7),
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    borderRadius: 20,
  },
  textinput: {
    fontSize: hp(2),
    flex: 1,
    fontWeight: "500",
    color: "#222222",
  },
  forgotpassword: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: "#888888",
  },
});
