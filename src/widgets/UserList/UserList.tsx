import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import type {User} from '../../entities/user/UserTypes';
import styles from './UserList.module.css';
import { useGetUsersQuery } from '../../entities/user/api/usersApi';

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
    const { data: users = [], isLoading: loading, isError, error } = useGetUsersQuery();

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

    if (isError) {
        return <div className={styles.error}>Ошибка: {(error as any)?.message ?? 'Ошибка'}</div>;
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
