import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

const useApi = (url: string) => {
  const [data, setData] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err instanceof Error ? err.message : "An error occurred");
        Alert.alert("Error", "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useApi;
