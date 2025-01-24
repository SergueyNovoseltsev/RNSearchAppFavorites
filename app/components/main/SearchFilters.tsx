import { TouchableOpacity, View, Text } from "react-native";
import TextField from "react-native-ui-lib/src/components/textField";
import Picker from "react-native-ui-lib/src/components/picker";
import Button from "react-native-ui-lib/src/components/button";
import styles from "./styles";
import { genderArr, statusArr } from "@/app/models/character";

interface SearchFiltersProps {
  name: string | undefined;
  setName: (name: string | undefined) => void;
  species: string | undefined;
  setSpecies: (species: string | undefined) => void;
  type: string | undefined;
  setType: (type: string | undefined) => void;
  status: string | undefined;
  setStatus: (status: string | undefined) => void;
  gender: string | undefined;
  setGender: (gender: string | undefined) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

export default function SearchFilters({
  name,
  setName,
  species,
  setSpecies,
  type,
  setType,
  status,
  setStatus,
  gender,
  setGender,
  handleSearch,
  isLoading,
}: SearchFiltersProps) {
  return (
    <View>
      <TextField
        style={styles.searchInput}
        placeholder="Filter by name"
        value={name}
        onChangeText={(text) => setName(text || undefined)}
        onSubmitEditing={handleSearch}
      />
      <TextField
        style={styles.searchInput}
        placeholder="Filter by species"
        value={species}
        onChangeText={(text) => setSpecies(text || undefined)}
        onSubmitEditing={handleSearch}
      />
      <TextField
        style={styles.searchInput}
        placeholder="Filter by type"
        value={type}
        onChangeText={(text) => setType(text || undefined)}
        onSubmitEditing={handleSearch}
      />
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            style={[styles.picker]}
            placeholder="Filter by status"
            value={status}
            onChange={(items) => setStatus(items?.toString())}
            mode={Picker.modes.SINGLE}
            items={statusArr}
          />
          {status && (
            <TouchableOpacity onPress={() => setStatus(undefined)}>
              <Text style={{ color: "#6200EE", marginLeft: 8 }}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            style={[styles.picker]}
            placeholder="Filter by gender"
            value={gender}
            onChange={(items) => setGender(items?.toString())}
            mode={Picker.modes.SINGLE}
            items={genderArr}
          />
          {gender && (
            <TouchableOpacity onPress={() => setGender(undefined)}>
              <Text style={{ color: "#6200EE", marginLeft: 8 }}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Button
        style={styles.searchButton}
        label="Rechercher"
        onPress={handleSearch}
        disabled={isLoading}
      />
    </View>
  );
}
