import * as React from 'react'
import { TextInput, Button, View, Text, ScrollView } from 'react-native'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { LinearGradient } from 'expo-linear-gradient';
import AlertBanner from '@/components/Alert';
import { alertStore } from '@/store/alertStore';

export default function ForgotPasswordPage() {
  const { isLoaded, signIn } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [code, setCode] = React.useState(null)
  const [pendingVerification, setPendingVerification] = React.useState(false)

  const { setStatusCode, setMsg, showAlert, setShowAlert } = alertStore();

  const onSendCodePress = async () => {
    if (!isLoaded) return;

    if (!emailAddress) {
      setShowAlert();
      setStatusCode(400);
      setMsg("Email is required");
      return;
    }

    try {
      await signIn.create({ strategy: 'reset_password_email_code', identifier: emailAddress });
      setPendingVerification(true);
      setShowAlert();
      setStatusCode(200);
      setMsg("Password reset code sent to your email.");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setStatusCode(422);
      setMsg(err?.errors[0]?.longMessage || "Error sending code.");
      setShowAlert();
    }
  };

  const onResetPasswordPress = async () => {
    if (!isLoaded) return;

    if (!code || !password) {
      setShowAlert();
      setStatusCode(400);
      setMsg("Code and password are required");
      return;
    }

    try {
      const result = await signIn.attemptFirstFactor({ strategy: 'reset_password_email_code', code, password });
      if (result.status === 'complete') {
        router.replace('/sign-in');
      } else {
        console.error(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setStatusCode(422);
      setMsg(err?.errors[0]?.longMessage || "Error resetting password.");
      setShowAlert();
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFD602']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View>
          {showAlert && <AlertBanner />}
          <View className="relative w-full mt-20 mb-10">
            <Text className="text-2xl text-black text-center">Forgot Password?</Text>
          </View>
          {!pendingVerification && (
            <View className="p-4">
              <InputField
                label="Email"
                placeholder="Enter email"
                textContentType="emailAddress"
                value={emailAddress}
                onChangeText={(email) => setEmailAddress(email)}
              />
              <CustomButton
                title="Send Code"
                onPress={onSendCodePress}
                className="mt-10"
                bgVariant="brown"
              />
            </View>
          )}

          {pendingVerification && (
            <View className="p-4">
              <InputField
                label="Code"
                placeholder="Enter reset code"
                textContentType="oneTimeCode"
                value={code}
                onChangeText={(text) => setCode(text)}
              />
              <InputField
                label="New Password"
                placeholder="Enter new password"
                secureTextEntry
                textContentType="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <CustomButton
                title="Reset Password"
                onPress={onResetPasswordPress}
                className="mt-10"
                bgVariant="brown"
              />
            </View>
          )}
        </View>
        <View className="text-center mt-5">
          <Link href="/sign-in" className="text-md text-general-200 text-center">
            Remembered your password? <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
