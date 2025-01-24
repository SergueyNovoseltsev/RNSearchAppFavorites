import { View, Text, TouchableOpacity } from "react-native";
import Image from "react-native-ui-lib/src/components/image";
import { Character } from "../../models/character";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CharacterItemProps {
  item: Character;
  onPress: () => void;
}

export default function CharacterItem({ item, onPress }: CharacterItemProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((favorite) => favorite === item.id);
  console.log(favorites);
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item.id));
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleFavoriteToggle}
            style={styles.favoriteButton}
          >
            <FontAwesome
              size={28}
              name="star"
              color={isFavorite ? "yellow" : "gray"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.itemDetails}>
          <Text style={styles.itemText}>Status: {item.status}</Text>
          <Text style={styles.itemText}>Type: {item.type}</Text>
          <Text style={styles.itemText}>Species: {item.species}</Text>
          <Text style={styles.itemText}>Gender: {item.gender}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
