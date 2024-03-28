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
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/login.png")}
          />
        </View>
        <View style={{ gap: hp(4) }}>
          <Text style={styles.signinText}>Sign In</Text>
          {/* input fields */}
          <View style={{ gap: hp(2.5) }}>
            <View style={styles.inputtextcontainer}>
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={styles.textinput}
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>

            <View style={{ gap: 3 }}>
              <View style={styles.inputtextcontainer}>
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={styles.textinput}
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={"gray"}
                />
              </View>
              <Text style={styles.forgotpassword}>Forgot Password</Text>
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
                    style={{
                      fontSize: hp(2.7),
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  fontWeight: "500",
                  color: "#888888",
                }}
              >
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontWeight: "bold",
                    color: "#3F51B5",
                  }}
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

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    flex: 1,
    gap: 12,
  },

  imagecontainer: {
    alignItems: "center",
  },
  image: { height: hp(25), resizeMode: "contain" },
  inputtextcontainer: {
    flexDirection: "row",
    gap: wp(4),
    paddingHorizontal: wp(4),
    height: hp(7),
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    borderRadius: 20,
  },
  signinText: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    color: "#222222",
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
    textAlign: "right",
    color: "#888888",
  },
});
