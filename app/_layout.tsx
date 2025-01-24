import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/configureStore";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (segments.length === 1) {
      router.replace("/tabs");
    }
  }, [segments]);

  return (
    <Provider store={store}>
      <Stack initialRouteName="tabs">
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
