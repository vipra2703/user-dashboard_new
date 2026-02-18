import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    sortField: 'name',
    sortOrder: 'asc',
    currentPage: 1,
    pageSize: 5
  });

  const toggleUserSelection = useCallback((userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedUsers([]);
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      sortField: 'name',
      sortOrder: 'asc',
      currentPage: 1,
      pageSize: 5
    });
  }, []);

  const value = useMemo(() => ({
    selectedUsers,
    filters,
    toggleUserSelection,
    clearSelection,
    updateFilters,
    resetFilters
  }), [selectedUsers, filters, toggleUserSelection, clearSelection, updateFilters, resetFilters]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
