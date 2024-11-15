import { useSignIn, useUser } from '@clerk/clerk-expo'
import { Link, useNavigation, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const user = useUser();
  const navigate = useNavigation().navigate;

  if(user?.isSignedIn){
    navigate('(screens)');
  }

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('(screens)')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

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
          <Text className="text-2xl text-black absolute bottom-5 left-5 items-baseline">Welcome back 🙏</Text>
      </View>
      <View className="p-5">
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
      <CustomButton
        title="Sign In"
        onPress={onSignInPress}
        className="mt-10"
        bgVariant="brown"
        />
      </View>
      <View>
          <Link
            href="/sign-up"
            className="text-md text-center text-general-200 mt-10"
          >
          Don't have an account?
          <Text className="text-primary-500"> Sign Up</Text>
        </Link>
      </View>
      <View>
          <Link
            href="/forget-password"
            className="text-md text-center text-general-200"
          >
          Forgot your password?
          <Text className="text-primary-500"> Click</Text>
        </Link>
      </View>
    </View>
    </ScrollView>
    </LinearGradient>
  )
}