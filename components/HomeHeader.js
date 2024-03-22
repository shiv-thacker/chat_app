import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "../Context/authContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItems";
import { Feather, AntDesign } from "@expo/vector-icons";

const ios = Platform.OS == "ios";

const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  const { logout, user } = useAuth();

  const handleProfile = () => {};
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-semibold text-white">
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          {/* wrap toggle component here */}
          <MenuTrigger>
            <Image
              style={{ height: hp(5.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </MenuTrigger>

          {/* for pop-up dialogue box */}
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                marginLeft: -30,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: wp(40),
              },
            }}
          >
            {/* from custommenu components */}
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200" />;
};
