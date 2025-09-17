import { useParams } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import type { User } from '../../entities/user/UserTypes';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import { PostList } from '../../widgets/PostList/PostList';
import styles from './UserPostsPage.module.css';

const UserPostsPageComponent = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '0');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (!user) {
        return <div className={styles.error}>Пользователь не найден</div>;
    }

    return (
        <div className={styles.userPostsPage}>
            <UserTabs userId={userId} userName={user.name} />
            <PostList userId={userId} />
        </div>
    );
};

export const UserPostsPage = memo(UserPostsPageComponent);
