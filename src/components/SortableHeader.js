import { memo } from 'react';

export const SortableHeader = memo(function SortableHeader({
  field,
  label,
  currentSortField,
  currentSortOrder,
  onSort
}) {
  const isActive = currentSortField === field;

  const handleClick = () => {
    const newOrder = isActive && currentSortOrder === 'asc' ? 'desc' : 'asc';
    onSort(field, newOrder);
  };

  return (
    <th
      onClick={handleClick}
      style={{ cursor: 'pointer', userSelect: 'none' }}
      // className="sortable-header"
    >
      {label}
      <span className="ms-1">
        {isActive ? (currentSortOrder === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}
      </span>
    </th>
  );
});
