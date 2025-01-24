import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (segments.length === 1) {
      router.replace("/tabs");
    }
  }, [segments]);

  return (
    <Stack initialRouteName="tabs">
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}
