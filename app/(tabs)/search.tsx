import CartButton from "@/components/CartButton";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6,
    },
  });
  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  console.log(data);
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View className="flex-1 max-w-[48%]">
              <Text>Menu Card</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite flavors
                  </Text>
                </View>
              </View>

              <CartButton />
            </View>

            <Text>Search Input</Text>
            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
      />
    </SafeAreaView>
  );
};

// const Search = () => {
//   return (
//     <SafeAreaView className="bg-white h-full">
//       <Text>Search</Text>

//       <Button
//         title="SEED"
//         onPress={() => {
//           seed().catch((error) => console.log("Failed to seed DDBB", error));
//         }}
//       />
//     </SafeAreaView>
//   );
// };

export default Search;
