import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { UserTabs } from '../widgets/UserTabs';
import { Button } from '../shared/ui/Button/Button';
import styles from './UserPage.module.css';

export const UserAlbums: FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className={styles.container}>
                <div>Пользователь не найден</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Button to="/" variant="back">
                ← Назад
            </Button>
            
            <h1>Пользователь #{id}</h1>
            <UserTabs userId={id} />
            <h2>Альбомы</h2>
            <p>Здесь будут альбомы пользователя</p>
        </div>
    );
};
