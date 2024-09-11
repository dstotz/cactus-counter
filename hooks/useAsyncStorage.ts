import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export const useAsyncStorage = <T>(
  key: string,
  initialValue: T
): [data: T, set: (newData: T) => void] => {
  const [hasLoad, setHasLoad] = useState(false);
  const [data, setData] = useState<T>(initialValue);

  const set = async (newData: T) => {
    setData(newData);
    return newData!!
      ? AsyncStorage.setItem(key, JSON.stringify(newData))
      : AsyncStorage.removeItem(key);
  };

  useEffect(() => {
    setHasLoad(false);
  }, [key]);

  useEffect(() => {
    if (!hasLoad) {
      AsyncStorage.getItem(key).then((res) => {
        if (res === null) {
          AsyncStorage.setItem(key, JSON.stringify(data));
          setData(data);
        } else {
          setData(JSON.parse(res));
        }
        setHasLoad(true);
      });
    }
  }, [key, hasLoad, data]);

  return [data, set];
};
