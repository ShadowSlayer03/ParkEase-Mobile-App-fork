import * as React from "react";
import { useEffect } from "react";
import {
  TextInput,
  Button,
  View,
  Text,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useSignUp, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import AlertBanner from "@/components/Alert";
import { alertStore } from "@/store/alertStore";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const user = useUser();
  const router = useRouter();

  console.log(user);

  if (user?.isSignedIn) {
    router.push("(screens)");
    return;
  }

  const [emailAddress, setEmailAddress] = React.useState<null | string>(null);
  const [password, setPassword] = React.useState<null | string>(null);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState<string>("");
  const [username, setUsername] = React.useState<null | string>(null);

  const { setStatusCode, setMsg, showAlert, setShowAlert } = alertStore();

  //backpresshandler
  useEffect(() => {
    const backAction = () => {
      // You can modify this logic based on your app's needs.
      // You can either navigate to another screen or exit the app
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true; // Prevent default back action
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    // Cleanup the listener on unmount
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password || !username) {
      setShowAlert();
      setStatusCode(400);
      setMsg("Fill All the Fields");
      return;
    } else if (username && username?.length < 4) {
      setShowAlert();
      setStatusCode(400);
      setMsg("The username should contain atleast 4 characters");
      return;
    }

    try {
      await signUp.create({ emailAddress, password, username });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setStatusCode(422);
      setMsg(err?.errors[0]?.longMessage);
      setShowAlert();
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        console.log();
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFD602"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, paddingHorizontal: 5 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View>
          {showAlert && <AlertBanner />}
          <View className="relative w-full">
            <Image
              source={images.parkingP}
              className="z-0 w-[170px] h-32 mt-20 mb-10 ml-5"
            />
            <Text className="font-FunnelDisplayBold text-2xl text-black absolute bottom-5 left-5">
              Welcome Friend 👋
            </Text>
          </View>
          {!pendingVerification && (
            <View className="p-3">
              <InputField
                label="Email"
                placeholder="Enter email"
                icon={icons.email}
                textContentType="emailAddress"
                value={emailAddress}
                onChangeText={(email:string) => setEmailAddress(email)}
              />
              <InputField
                label="Password"
                placeholder="Enter password"
                icon={icons.lock}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(password:string) => setPassword(password)}
              />
              <InputField
                label="Username"
                placeholder="Username..."
                icon={icons.person}
                secureTextEntry={false}
                textContentType="text"
                value={username}
                onChangeText={(username:string) => setUsername(username)}
              />
              <CustomButton
                title="Sign up"
                onPress={onSignUpPress}
                className="mt-10"
                bgVariant="dark"
                textVariant="main"
              />
            </View>
          )}

          {pendingVerification && (
            <View className="p-5">
              <TextInput
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
              />
              <Button
                title="Verify Email"
                color="#1f2937"
                onPress={onPressVerify}
              />
            </View>
          )}
        </View>
        <View>
          <Link
            href="/sign-in"
            className="font-FunnelSansSemiBold text-md text-center text-general-200 mt-2"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
