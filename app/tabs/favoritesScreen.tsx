import { View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import CharacterItem from "@/app/components/main/CharacterItem";
import styles from "@/app/components/main/styles";
import { useGetCharacterByIds } from "../hooks/api/useGet";
import { router } from "expo-router";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function FavoritesScreen() {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFocused = useIsFocused();
  const {
    callApi: fetchCharacterByIds,
    data: charList,
    isLoading,
  } = useGetCharacterByIds(favorites.toString());

  useEffect(() => {
    console.log("TEST", charList);
    fetchCharacterByIds();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 || charList === null ? (
        <Text style={styles.noResultsText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={Array.isArray(charList) ? charList : [charList]}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <CharacterItem
              item={item}
              onPress={() => router.push(`/tabs/charDetail?id=${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );
}
