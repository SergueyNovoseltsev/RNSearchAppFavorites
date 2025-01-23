import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import TextField from "react-native-ui-lib/src/components/textField";
import Image from "react-native-ui-lib/src/components/image";
import { useGetCharList } from "./hooks/api/useGet";
import {
  Character,
  Gender,
  genderArr,
  Status,
  statusArr,
} from "./models/character";
import Picker from "react-native-ui-lib/src/components/picker";
import { useRouter } from "expo-router";
import Button from "react-native-ui-lib/src/components/button";

const { width } = Dimensions.get("window");

export default function Index() {
  const [name, setName] = useState<string>();
  const [status, setStatus] = useState<Status>();
  const [species, setSpecies] = useState<string>();
  const [gender, setGender] = useState<Gender>();
  const [type, setType] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allData, setAllData] = useState<Character[]>([]);

  const {
    callApi,
    data,
    isLoading: apiLoading,
  } = useGetCharList({
    name,
    status,
    type,
    species,
    gender,
    page,
  });

  const router = useRouter();

  const handleSearch = () => {
    setPage(1);
    setAllData([]);
    callApi();
  };

  useEffect(() => {
    if (page > 1) {
      callApi().finally(() => {
        setIsLoading(false); // Désactive le verrou une fois que l'API a terminé
      });
    }
  }, [page]);

  useEffect(() => {
    if (data && data?.results?.length > 0) {
      setTotalPages(data.info.pages || 1);
      setHasSearched(true);
      setAllData((prevData) => [...prevData, ...data.results]);
    }
  }, [data]);

  const handleEndReached = () => {
    if (!isLoading && page < totalPages) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (apiLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [apiLoading]);

  return (
    <View style={styles.container}>
      <TextField
        style={styles.searchInput}
        placeholder="Filter by name"
        value={name}
        onSubmitEditing={handleSearch}
        onChangeText={setName}
      />
      <TextField
        style={styles.searchInput}
        placeholder="Filter by species"
        value={species}
        onSubmitEditing={handleSearch}
        onChangeText={setSpecies}
      />
      <TextField
        style={styles.searchInput}
        placeholder="Filter by type"
        value={type}
        onSubmitEditing={handleSearch}
        onChangeText={setType}
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
        color="white"
        style={styles.searchButton}
        label="Rechercher"
        onPress={handleSearch}
        disabled={isLoading}
      />

      {hasSearched && (!allData || !allData || allData.length === 0) ? (
        <Text style={styles.noResultsText}>Aucun résultat trouvé</Text>
      ) : (
        <>
          <FlatList
            data={allData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/charDetail",
                    params: { id: item.id },
                  })
                }
              >
                {/* Character info */}
                <View style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Image
                      width={80}
                      height={80}
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                    />
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
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => setIsLoading(false)}
            initialNumToRender={10}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: width > 600 ? 32 : 16,
  },
  searchInput: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  pickerWrapper: {
    flex: 1,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    padding: 12,
    fontSize: 16,
    color: "#333",
    cursor: "pointer",
    height: 40,
  },
  pickerPlaceholder: {
    color: "#aaa",
    fontSize: 16,
  },
  pickerFocus: {
    borderColor: "#6200EE",
    shadowColor: "#6200EE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  searchButton: {
    backgroundColor: "#6200EE",
    color: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "column",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    width: width > 600 ? 100 : 60,
    height: width > 600 ? 100 : 60,
    borderRadius: 50,
    marginRight: 15,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  itemDetails: {
    marginTop: 8,
    paddingLeft: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  noResultsText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
