import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsConnected } from "react-native-offline";
import useRequest, { GetRequest, getCacheKey } from "../helpers/fetcher";

export function useCachedData<Data>(
  requestConfig: GetRequest
): [Data | undefined] {
  const [cachedData, setCachedData] = useState<Data | undefined>();
  const cacheKey = getCacheKey(requestConfig);

  useEffect(() => {
    const getCachedData = async () => {
      try {
        const value = await AsyncStorage.getItem(cacheKey);
        if (value) {
          // If cached data exists, parse it and set it in the state
          const parsedData = JSON.parse(value) as Data;
          setCachedData(parsedData);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getCachedData();
  }, [cacheKey]);

  return [cachedData];
}
