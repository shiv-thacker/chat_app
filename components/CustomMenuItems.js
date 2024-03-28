import { View, Text } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const MenuItem = ({ text, action, value, icon }) => {
  return (
    // component for individual poop-up menu items
    <MenuOption onSelect={() => action(value)}>
      <View
        style={{
          paddingHorizontal: wp(3), // px-4
          paddingVertical: hp(1), // py-1
          flexDirection: "row", // flex-row
          justifyContent: "space-between", // justify-between
          alignItems: "center", // items-center
        }}
        // className="px-4 py-1 flex-row justify-between items-center"
      >
        <Text
          style={{
            fontSize: hp(1.7),
            fontWeight: "600", // font-semibold
            color: "#6B7280", // text-neutral-600
          }}
          // className="font-semibold text-neutral-600"
        >
          {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
};
