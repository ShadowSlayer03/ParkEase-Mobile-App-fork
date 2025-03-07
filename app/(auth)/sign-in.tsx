import React, { useEffect } from "react";
import { useSignIn, useUser, useOAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { alertStore } from "@/store/alertStore";
import AlertBanner from "@/components/Alert";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setStatusCode, setMsg, showAlert, setShowAlert } = alertStore();
  const user = useUser();

  useEffect(() => {
    if (user?.isSignedIn) {
      router.push("(screens)");
    }
  }, [user?.isSignedIn]);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      setShowAlert();
      setStatusCode(400);
      setMsg("Fill All the Fields");
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("(screens)");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setStatusCode(422);
      setMsg(err?.errors[0]?.longMessage);
      setShowAlert();
    }
  }, [isLoaded, emailAddress, password]);

  const onGoogleSignInPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive: setActiveGoogle } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/sign-in"),
        });
      if (createdSessionId) {
        await setActiveGoogle!({ session: createdSessionId });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  }, []);

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
              className="z-0 w-[170px] h-32 mt-24 mb-10 ml-5"
            />
            <Text className="font-FunnelDisplayBold text-2xl text-black absolute bottom-5 left-5 items-baseline">
              Welcome Back! 🙏
            </Text>
          </View>
          <View className="p-5">
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
              secureTextEntry
              textContentType="password"
              value={password}
              onChangeText={(password:string) => setPassword(password)}
            />
            <CustomButton
              title="Sign In"
              onPress={onSignInPress}
              className="mt-10"
              bgVariant="dark"
              textVariant="main"
            />
            <CustomButton
              title="Sign In with Google"
              onPress={onGoogleSignInPress}
              className="mt-5"
              bgVariant="less-dark"
              textVariant="primary"
            />
          </View>
        </View>
        <View>
          <Link
            href="/sign-up"
            className="font-FunnelSansSemiBold text-md text-center text-general-200 mt-2"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
