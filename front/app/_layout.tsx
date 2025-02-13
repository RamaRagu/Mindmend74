import { Stack } from 'expo-router';
export default function RoootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack>
        <Stack.Screen name="(tabs)"/>   
        <Stack.Screen name="login"/> 
      </Stack>
    </Stack>
  );
}