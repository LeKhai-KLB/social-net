import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";

function useParamState({ key, defaultValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);
  const [state, setState] = useState(() => {
    if (paramValue === null) {
      return defaultValue;
    }
    if (/^\d+$/.test(paramValue)) {
      return paramValue;
    }
    try {
      return JSON.parse(paramValue);
    } catch {
      return paramValue;
    }
  });

  const setParamState = useCallback(
    (newValue) => {
      const updatedValue = newValue;

      setState(updatedValue);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSON.stringify(updatedValue));
      setSearchParams(newSearchParams);
    },
    [key, searchParams, setSearchParams, state],
  );

  return [state, setParamState];
}

export default useParamState;
