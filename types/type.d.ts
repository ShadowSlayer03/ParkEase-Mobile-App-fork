declare export interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: () => void;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "main" | "less-dark" | "dark" | "brown" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "main" | "secondary" | "danger" | "success" | "default";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  onPress : ()=>void

}
