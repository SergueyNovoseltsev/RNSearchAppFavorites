import { View, Text, TouchableOpacity } from "react-native";
import Image from "react-native-ui-lib/src/components/image";
import { Character } from "../../models/character";
import styles from "./styles";

interface CharacterItemProps {
  item: Character;
  onPress: () => void;
}

export default function CharacterItem({ item, onPress }: CharacterItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
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
