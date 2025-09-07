import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { UserTabs } from '../widgets/UserTabs';
import { Button } from '../shared/ui/Button/Button';
import styles from './UserPage.module.css';

export const UserTodos: FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>Пользователь не найден</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Button to="/" variant="back">
                ← Назад
            </Button>
            
            <h1 className={styles.title}>Пользователь #{id}</h1>
            <UserTabs userId={id} />
            <h2 className={styles.subtitle}>Задачи</h2>
            <p className={styles.content}>Здесь будут задачи пользователя</p>
        </div>
    );
};
