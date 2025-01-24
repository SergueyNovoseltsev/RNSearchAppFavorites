import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Accueil",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="charDetail"
        options={{
          headerTitle: "Character Detail",
          tabBarLabel: "Details",
          href: null,
        }}
      />
      <Tabs.Screen
        name="+not-found"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  );
}
