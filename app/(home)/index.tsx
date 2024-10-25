import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()
  const {signOut} = useAuth()
  const router = useRouter()

  const handleSignOut =async ()=>{
    try{
      await signOut();
      router.replace('./')
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <View className="h-screen">
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <View>
          <Button title='Jiidsf' onPress={handleSignOut}/>
        </View>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}