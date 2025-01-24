import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useGetCharList } from "../hooks/api/useGet";
import { Character } from "../models/character";
import SearchFilters from "../components/main/SearchFilters";
import CharacterList from "../components/main/CharacterList";
import styles from "../components/main/styles";

export default function HomeScreen() {
  const [name, setName] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [species, setSpecies] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [allData, setAllData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

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

  const handleEndReached = () => {
    if (!isLoading && page < totalPages) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) callApi().finally(() => setIsLoading(false));
  }, [page]);

  useEffect(() => {
    if (data && data?.results?.length > 0) {
      setTotalPages(data.info.pages);
      setAllData((prev) => [...prev, ...data.results]);
      setHasSearched(true);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <SearchFilters
        name={name}
        setName={setName}
        species={species}
        setSpecies={setSpecies}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        gender={gender}
        setGender={setGender}
        handleSearch={handleSearch}
        isLoading={apiLoading}
      />
      {hasSearched && (!allData || allData.length === 0) ? (
        <Text style={styles.noResultsText}>Aucun résultat trouvé</Text>
      ) : (
        <CharacterList
          data={allData}
          onEndReached={handleEndReached}
          router={router}
          isLoading={isLoading}
        />
      )}
    </View>
  );
}
