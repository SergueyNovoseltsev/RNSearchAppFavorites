import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritesScreen"
        options={{
          tabBarActiveTintColor: "red",
          headerTitle: "Favorites Characters",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="heart" color={color} />
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
