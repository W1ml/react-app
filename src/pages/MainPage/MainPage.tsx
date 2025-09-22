import { useState, memo, useCallback } from 'react';
import { PostList } from '../../widgets/PostList/PostList';
import { UserList } from '../../widgets/UserList/UserList';
import styles from './MainPage.module.css';

const MainPageComponent = () => {
    const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts');

    const handlePostsClick = useCallback(() => setActiveTab('posts'), []);
    const handleUsersClick = useCallback(() => setActiveTab('users'), []);

    return (
        <div className={styles.mainPage}>
            <h1>Главная страница</h1>
            
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
                    onClick={handlePostsClick}
                >
                    Все посты
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
                    onClick={handleUsersClick}
                >
                    Все пользователи
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === 'posts' && <PostList />}
                {activeTab === 'users' && <UserList />}
            </div>
        </div>
    );
};

export const MainPage = memo(MainPageComponent);
