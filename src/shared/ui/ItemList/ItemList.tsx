import type {  PropsWithChildren, ReactNode } from 'react';
import styles from './ItemList.module.css';

export interface ItemListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
  loading?: boolean;
  error?: string | null;
  className?: string;
  itemClassName?: string;
  onItemClick?: (item: T, index: number) => void;
}

export function ItemList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'Список пуст',
  loading = false,
  error = null,
  className = '',
  itemClassName = '',
  onItemClick,
}: PropsWithChildren<ItemListProps<T>>) {
  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (items.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <ul className={`${styles.list} ${className}`}>
      {items.map((item, index) => (
        <li
          key={keyExtractor(item, index)}
          className={`${styles.listItem} ${itemClassName}`}
          onClick={() => onItemClick?.(item, index)}
          style={{ cursor: onItemClick ? 'pointer' : 'default' }}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
