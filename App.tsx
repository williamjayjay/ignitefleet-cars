import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'react-native';
import { AppProvider, UserProvider } from '@realm/react'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import theme from './src/theme';
import { REALM_APP_ID } from '@env'

import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from './src/libs/realm';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })



  if (!fontsLoaded) {
    return (
      <>
        <Loading />
      </>

    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme} >

        <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
          <UserProvider fallback={SignIn} >
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        </SafeAreaProvider>

      </ThemeProvider>
    </AppProvider>

  );
}

