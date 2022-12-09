import { useEffect, useState } from "react";

export const useDebouncedValue = <T>(inputValue: T) => {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(inputValue);
    }, 275);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);
};
