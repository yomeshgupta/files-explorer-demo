import React, { useContext } from 'react';

export const DirectoryContext = React.createContext(null);

export function useDirectoryContext() {
  const context = useContext(DirectoryContext);

  if (context === undefined) {
    throw new Error('useDirectoryContext can only be used within DirectoryContext');
  }

  return context;
}