import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetRequest } from "../helpers/fetcher";
import { useCachedDataStore } from "../stores/cachedDataStore";

export function useCachedData<Data>(
  requestConfig: GetRequest
): [Data | undefined, boolean] {
  const { cachedData, isFetching, setCachedData, setIsFetching } =
    useCachedDataStore();
  const cacheKey = JSON.stringify(requestConfig);

  useEffect(() => {
    const getCachedData = async () => {
      try {
        const value = await AsyncStorage.getItem(cacheKey);
        if (value) {
          // If cached data exists, parse it and set it in the Zustand store
          const parsedData = JSON.parse(value) as Data;
          setCachedData(cacheKey, parsedData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    getCachedData();
  }, [cacheKey, setCachedData, setIsFetching]);

  return [cachedData[cacheKey], isFetching];
}
