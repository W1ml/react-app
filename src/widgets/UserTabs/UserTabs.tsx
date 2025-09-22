import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import styles from './UserTabs.module.css';

interface UserTabsProps {
    userId: number;
    userName: string;
}

const UserTabsComponent = ({ userId, userName }: UserTabsProps) => {
    return (
        <div className={styles.userTabs}>
            <h2 className={styles.userName}>{userName}</h2>
            
            <nav className={styles.nav}>
                <NavLink 
                    to={`/users/${userId}/posts`} 
                    className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
                >
                    Посты
                </NavLink>
                
                <NavLink 
                    to={`/users/${userId}/albums`} 
                    className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
                >
                    Альбомы
                </NavLink>
                
                <NavLink 
                    to={`/users/${userId}/todos`} 
                    className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
                >
                    Задачи
                </NavLink>
            </nav>
        </div>
    );
};

export const UserTabs = memo(UserTabsComponent);
