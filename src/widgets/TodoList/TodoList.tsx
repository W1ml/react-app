import { useMemo, memo } from 'react';
import type { Todo } from '../../entities/todo/TodoTypes';
import styles from './TodoList.module.css';
import { useGetTodosByUserQuery } from '../../entities/todo/api/todosApi';

interface TodoListProps {
    userId?: number;
}


const TodoItem = memo(({ todo }: { todo: Todo }) => (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
        <div className={styles.todoContent}>
            <span className={styles.todoTitle}>{todo.title}</span>
            <span className={`${styles.todoStatus} ${todo.completed ? styles.done : styles.pending}`}>
                {todo.completed ? 'Выполнено' : 'В процессе'}
            </span>
        </div>
    </div>
));

TodoItem.displayName = 'TodoItem';

const TodoListComponent = ({ userId }: TodoListProps) => {
    const { data: todos = [], isLoading: loading, isError, error } = useGetTodosByUserQuery(userId as number, { skip: !userId });

    const todoElements = useMemo(() => {
        return todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
        ))
    }, [todos]);


    const stats = useMemo(() => {
        const completed = todos.filter(todo => todo.completed).length;
        const total = todos.length;
        return { completed, total, pending: total - completed };
    }, [todos]);

    const isEmpty = useMemo(() => todos.length === 0, [todos.length]);

    if (loading) {
        return <div className={styles.loading}>Загрузка задач...</div>;
    }

    if (isError) {
        return <div className={styles.error}>Ошибка: {(error as any)?.message ?? 'Ошибка'}</div>;
    }

    if (isEmpty) {
        return <div className={styles.empty}>Задачи не найдены</div>;
    }

    return (
        <div className={styles.todoList}>
            <div className={styles.stats}>
                <span>Всего: {stats.total}</span>
                <span>Выполнено: {stats.completed}</span>
                <span>В процессе: {stats.pending}</span>
            </div>
            <div className={styles.todos}>
                {todoElements}
            </div>
        </div>
    );
};

export const TodoList = memo(TodoListComponent);
