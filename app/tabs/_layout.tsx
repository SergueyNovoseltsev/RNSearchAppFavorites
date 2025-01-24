import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ headerTitle: "Accueil", tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="charDetail"
        options={{ headerTitle: "Character Detail", tabBarLabel: "Details" }}
      />
      <Tabs.Screen name="+not-found" options={{ headerShown: false }} />
    </Tabs>
  );
}
