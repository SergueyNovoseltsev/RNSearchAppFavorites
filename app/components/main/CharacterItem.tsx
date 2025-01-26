import { View, Text, TouchableOpacity } from "react-native";
import Image from "react-native-ui-lib/src/components/image";
import { Character } from "../../models/character";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

interface CharacterItemProps {
  item: Character;
  onPress: () => void;
  style?: {
    opacity: number;
    transform: {
      translateY: number;
    }[];
  };
}

export default function CharacterItem({
  item,
  onPress,
  style,
}: CharacterItemProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((favorite) => favorite === item.id);

  const scale = useSharedValue(1);

  const handleFavoriteToggle = () => {
    scale.value = withSequence(
      withTiming(1.4, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );

    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item.id));
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View>
          <View style={styles.favoriteButtonContainer}>
            <Animated.View style={[animatedStyle]}>
              <TouchableOpacity
                onPress={handleFavoriteToggle}
                style={styles.favoriteButton}
              >
                <FontAwesome
                  size={28}
                  name="heart"
                  color={isFavorite ? "red" : "gray"}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
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
