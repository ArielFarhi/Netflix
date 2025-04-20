import React, { createContext, useContext, useState, useMemo } from "react";

const Context = createContext(null);

export const useSearchContext = () => useContext(Context);

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const value = useMemo(() => ({
    searchQuery: query,
    updateSearchQuery: setQuery,
  }), [query]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};