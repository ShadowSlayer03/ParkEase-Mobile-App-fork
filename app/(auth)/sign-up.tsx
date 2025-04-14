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
import { useAuth, useOAuth, useSignUp, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser'
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import AlertBanner from "@/components/Alert";
import { alertStore } from "@/store/alertStore";
import * as Linking from "expo-linking"

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  useWarmUpBrowser();

  const { isLoaded, signUp, setActive } = useSignUp();
  const user = useUser();
  const {isSignedIn} = useAuth();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  useEffect(()=>{
    if(isSignedIn){
      router.push("(screens)");
      return;
    }
  },[isSignedIn])

  // const [username, setUsername] = React.useState<string>("");
  const [emailAddress, setEmailAddress] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState<string>("");

  const { setStatusCode, setMsg, showAlert, setShowAlert } = alertStore();

  // Back button handler
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      setShowAlert();
      setStatusCode(400);
      setMsg("Fill all the fields");
      return;
    }

    try {
      await signUp.create({ emailAddress, password });
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
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("(screens)");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const onGoogleSignInPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive:setActiveGoogle } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/sign-up")
      });
      if (createdSessionId) {
        console.log("CreatedSessionId:",createdSessionId);
        await setActiveGoogle!({ session: createdSessionId });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  },[]);

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
            <Image source={images.parkingP} className="z-0 w-[170px] h-32 mt-20 mb-10 ml-5" />
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

              <CustomButton title="Sign up" onPress={onSignUpPress} className="mt-10" bgVariant="dark" textVariant="main" />

              {/* Google Sign-In Button */}
              <CustomButton
                title="Sign up with Google"
                onPress={onGoogleSignInPress}
                className="mt-5"
                bgVariant="less-dark"
                textVariant="primary"
              />
            </View>
          )}

          {pendingVerification && (
            <View className="p-5">
              <TextInput
                value={code}
                placeholder="Enter the code..."
                onChangeText={(text) => setCode(text)}
                style={{ borderWidth: 2, padding: 20, borderRadius: 30 }}
              />
              <CustomButton title="Verify Email" onPress={onPressVerify} className="mt-10" bgVariant="dark" textVariant="main" />
            </View>
          )}
        </View>
        <View>
          <Link href="/sign-in" className="font-FunnelSansSemiBold text-md text-center text-general-200 mt-2">
            Already have an account? <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
