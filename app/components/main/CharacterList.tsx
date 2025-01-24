import { FlatList, ActivityIndicator } from "react-native";
import CharacterItem from "./CharacterItem";
import { Character } from "../../models/character";
import styles from "./styles";

interface CharacterListProps {
  data: Character[];
  onEndReached: () => void;
  router: any;
  isLoading: boolean;
}

export default function CharacterList({
  data,
  onEndReached,
  router,
  isLoading,
}: CharacterListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CharacterItem
          item={item}
          onPress={() => router.push(`/tabs/charDetail?id=${item.id}`)}
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
    />
  );
}
