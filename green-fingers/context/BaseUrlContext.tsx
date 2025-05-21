import React, { createContext, useContext, useEffect, useState } from "react";
import { getBaseUrl, setBaseUrl } from "@/utils/baseUrl";

const BaseUrlContext = createContext<{
  baseUrl: string | null;
  updateBaseUrl: (url: string) => Promise<void>;
}>({
  baseUrl: null,
  updateBaseUrl: async () => { },
});

export const BaseUrlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [baseUrl, setBaseUrlState] = useState<string | null>(null);

  useEffect(() => {
    getBaseUrl().then(setBaseUrlState);
  }, []);

  const updateBaseUrl = async (url: string) => {
    await setBaseUrl(url);
    setBaseUrlState(url);
  };

  return (
    <BaseUrlContext.Provider value={{ baseUrl, updateBaseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
};

export const useBaseUrl = () => useContext(BaseUrlContext);
