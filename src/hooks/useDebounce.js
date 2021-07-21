import {useEffect, useState} from "react";

export const useDebounce = (value, delay) => {
  // Debounced value from parameter
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes
      return () => {
        clearTimeout(handler);
      };
    },
    // Don't call if one of value or delay are not changed
    [value, delay]
  );
  return debouncedValue;
}
