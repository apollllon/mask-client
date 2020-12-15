import { useState } from "react";
import { axios } from "./axios";
import { isArray, isObject, mapValues, mapKeys, camelCase } from "lodash";

const fCamelToSnake = (p: string) => {
  //大文字を_+小文字にする(例:A を _a)
  return (
    p.charAt(0).toLowerCase() +
    p
      .substr(1)
      .replace(/([A-Z])/g, (s: string) => "_" + s.charAt(0).toLowerCase())
  );
};

const snakeCase = fCamelToSnake;

// @ts-ignore
const mapKeysDeep = (
  data: any,
  callback: (value: string, key: string) => {}
) => {
  if (isArray(data)) {
    return data.map((innerData: object) => mapKeysDeep(innerData, callback));
  } else if (isObject(data)) {
    return mapValues(mapKeys(data, callback), (val: any) =>
      mapKeysDeep(val, callback)
    );
  } else {
    return data;
  }
};

export const mapKeysCamelCase = (data: any) => {
  return mapKeysDeep(data, (_: string, key: string) => camelCase(key));
};

export const mapKeysSnakeCase = (data: any) => {
  return mapKeysDeep(data, (_: string, key: string) => snakeCase(key));
};

export const useApi = <T, U>() => {
  const [response, setResponse] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(false);
  const f = async (url: string, params?: U) => {
    setLoading(true);
    const res = await axios.get<T>(url, { params: mapKeysSnakeCase(params) });
    setResponse(mapKeysCamelCase(res.data) as T);
    setLoading(false);
  };

  const execute = (url: string, params?: U) => {
    try {
      f(url, params);
    } catch (error) {
      console.error(error);
    }
  };

  return { response, loading, execute };
};
