// Общие типы для приложения
export type ID = number | string;

export interface BaseEntity {
  id: ID;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Типы для обработчиков событий
export type EventHandler<T = HTMLElement> = (event: React.SyntheticEvent<T>) => void;
export type MouseEventHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;
export type KeyboardEventHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;
export type ChangeEventHandler<T = HTMLElement> = (event: React.ChangeEvent<T>) => void;
export type FocusEventHandler<T = HTMLElement> = (event: React.FocusEvent<T>) => void;

// Типы для компонентов
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

// Утилитарные типы
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Типы для фильтрации и сортировки
export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'in' | 'nin';
  value: any;
}

export interface SearchConfig {
  query: string;
  fields: string[];
}
