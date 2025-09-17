import { useState, useEffect, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import type {User} from '../../entities/user/UserTypes';
import styles from './UserList.module.css';

const UserCard = memo(({ user }: { user: User }) => (
    <div className={styles.userCard}>
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
));

UserCard.displayName = 'UserCard';

const UserListComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке пользователей');
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const userElements = useMemo(() => {
        if (!users || users.length === 0) {
            return [];
        }
        return users.map((user) => {
            if (!user || !user.id || !user.name || !user.email) {
                return null;
            }
            return <UserCard key={user.id} user={user} />;
        }).filter(Boolean);
    }, [users]);

    if (loading) {
        return <div className={styles.loading}>Загрузка пользователей...</div>;
    }

    if (error) {
        return <div className={styles.error}>Ошибка: {error}</div>;
    }

    if (users.length === 0) {
        return <div className={styles.loading}>Пользователи не найдены</div>;
    }

    return (
        <div className={styles.userList}>
            {userElements}
        </div>
    );
};

export const UserList = memo(UserListComponent);
