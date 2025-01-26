import React from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CharacterItem from "./CharacterItem";
import { Character } from "../../models/character";
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

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
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedItemStyle = useAnimatedStyle(() => {
    const opacity = withSpring(scrollY.value > 50 ? 1 : 0.5);
    const translateY = withSpring(scrollY.value > 50 ? 0 : 30);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CharacterItem
          item={item}
          onPress={() => router.push(`/tabs/charDetail?id=${item.id}`)}
          style={animatedItemStyle}
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    />
  );
}
