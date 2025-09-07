import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserTabs.module.css';

interface UserTabsProps {
    userId: string;
}

export const UserTabs: FC<UserTabsProps> = ({ userId }) => {
    return (
        <nav className={styles.tabs}>
            <NavLink 
                to={`/users/${userId}/posts`} 
                className={({ isActive }) => 
                    isActive ? `${styles.tab} ${styles.active}` : styles.tab
                }
            >
                Посты
            </NavLink>
            <NavLink 
                to={`/users/${userId}/albums`} 
                className={({ isActive }) => 
                    isActive ? `${styles.tab} ${styles.active}` : styles.tab
                }
            >
                Альбомы
            </NavLink>
            <NavLink 
                to={`/users/${userId}/todos`} 
                className={({ isActive }) => 
                    isActive ? `${styles.tab} ${styles.active}` : styles.tab
                }
            >
                Задачи
            </NavLink>
        </nav>
    );
};
