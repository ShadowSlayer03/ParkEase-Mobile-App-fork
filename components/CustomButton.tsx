import { ButtonProps } from "@/types/type";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
      break;
    case "danger":
      return "bg-red-500";
      break;
    case "success":
      return "bg-green-500";
      break;
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
      break;
    case "main":
      return "bg-[#fcd904]";
      break;
    case "less-dark":
      return "bg-[#ebd231]";
      break;
    case "dark":
      return "bg-[#000]";
      break;
    case "brown":
      return "bg-[#b59801]"
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
      break;
    case "secondary":
      return "text-gray-100";
      break;
    case "danger":
      return "text-red-100";
      break;
    case "success":
      return "text-green-100";
      break;
    case "main":
      return "text-[#fcd904]";
      break;
    case "default":
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "main",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className={`w-full rounded-full p-4 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-[16px] px-1 font-FunnelDisplayMedium ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
