import { useMemo, memo, type MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../../entities/user/model/types';
import styles from './UserList.module.css';
import { useGetUsersQuery } from '../../entities/user/api/usersApi';

export interface UserListProps {
    onUserClick?: (user: User) => void;
    className?: string;
}

interface UserCardProps {
    user: User;
    onUserClick?: (user: User) => void;
}

const UserCard = memo(({ user, onUserClick }: UserCardProps) => {
    const handleUserClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        onUserClick?.(user);
    };

    return (
        <div 
            className={styles.userCard}
            onClick={onUserClick ? handleUserClick : undefined}
            style={{ cursor: onUserClick ? 'pointer' : 'default' }}
        >
            <h3 className={styles.userName}>{user.name}</h3>
            <p className={styles.userEmail}>{user.email}</p>
            <div className={styles.userActions}>
                <Link to={`/users/${user.id}/posts`} className={styles.link}>
                    Посты
                </Link>
                <Link to={`/users/${user.id}/albums`} className={styles.link}>
                    Альбомы
                </Link>
                <Link to={`/users/${user.id}/todos`} className={styles.link}>
                    Задачи
                </Link>
            </div>
        </div>
    );
});

UserCard.displayName = 'UserCard';

const UserListComponent = ({ onUserClick, className = '' }: UserListProps) => {
    const { data: users = [], isLoading: loading, isError, error } = useGetUsersQuery();

    const userElements = useMemo(() => {
        if (!users || users.length === 0) {
            return [];
        }
        return users.map((user) => {
            if (!user || !user.id || !user.name || !user.email) {
                return null;
            }
            return (
                <UserCard 
                    key={user.id} 
                    user={user} 
                    onUserClick={onUserClick}
                />
            );
        }).filter(Boolean);
    }, [users, onUserClick]);

    if (loading) {
        return <div className={styles.loading}>Загрузка пользователей...</div>;
    }

    if (isError) {
        return <div className={styles.error}>Ошибка: {(error as any)?.message ?? 'Ошибка'}</div>;
    }

    if (users.length === 0) {
        return <div className={styles.loading}>Пользователи не найдены</div>;
    }

    return (
        <div className={`${styles.userList} ${className}`}>
            {userElements}
        </div>
    );
};

export const UserList = memo(UserListComponent);
