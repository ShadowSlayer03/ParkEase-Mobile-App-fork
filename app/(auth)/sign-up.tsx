import * as React from 'react'
import { TextInput, Image, Button, View, Text, ScrollView } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [username, setUsername] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress, password, username });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFD602']} // white to primary-100 gradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }} // Allow gradient to fill the entire screen
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View>
          <View className="relative w-full">
            <Image source={images.parkingP} className="z-0 w-[170px] h-32 my-20 ml-5" />
            <Text className="text-2xl text-black absolute bottom-5 left-5">Welcome 👋</Text>
          </View>
          {!pendingVerification && (
            <View className="p-4">
              <InputField
                label="Email"
                placeholder="Enter email"
                icon={icons.email}
                textContentType="emailAddress"
                value={emailAddress}
                onChangeText={(email) => setEmailAddress(email)}
              />
              <InputField
                label="Password"
                placeholder="Enter password"
                icon={icons.lock}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
              <InputField
                label="Username"
                placeholder="Username..."
                icon={icons.lock}
                secureTextEntry={true}
                textContentType="text"
                value={username}
                onChangeText={(username) => setUsername(username)}
              />
              <CustomButton
                title="Sign up"
                onPress={onSignUpPress}
                className="mt-10"
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
              <Button title="Verify Email" color="#1f2937" onPress={onPressVerify} />
            </View>
          )}
        </View>
        <View>
          <Link
              href="/sign-in"
              className="text-md text-center text-general-200 mt-10"
            >
            Already have an account?{" "}
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
