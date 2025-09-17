import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../shared/ui/Button/Button.tsx";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher.tsx";
import { Modal } from "../../shared/ui/Modal/Modal";
import styles from "./Header.module.css";
import modalStyles from "../../shared/ui/Modal/Modal.module.css";

export const Header = () => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAboutModalToggle = useCallback(() => {
        setIsAboutModalOpen(prev => !prev);
    }, []);

    const handleGoHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.navigationButtons}>
                    <Button onClick={handleGoHome}>Главная</Button>
                    {location.pathname !== '/' && (
                        <Button onClick={handleGoBack}>Назад</Button>
                    )}
                    <Button onClick={handleAboutModalToggle}>О проекте</Button>
                </div>
                <ThemeSwitcher />
            </header>

            <Modal isOpen={isAboutModalOpen} onClose={handleAboutModalToggle}>
                <Modal.Header onClose={handleAboutModalToggle}>
                    <h2 style={{ margin: 0 }}>О проекте</h2>
                </Modal.Header>
                <Modal.Body>
                    <h3>Реализованные компоненты:</h3>
                    <ul>
                        <li><strong>Compound Components Modal</strong> - модальное окно с подкомпонентами Header, Body, Footer</li>
                        <li><strong>HOC withLoading</strong> - высший компонент для отображения состояния загрузки</li>
                        <li><strong>CommentList</strong> - список комментариев с возможностью разворота</li>
                        <li><strong>PostLengthFilter</strong> - фильтр постов по длине заголовка</li>
                        <li><strong>Оптимизированный PostList</strong> - использовал useMemo и useCallback</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button className={modalStyles.button} onClick={handleAboutModalToggle}>
                        Понятно
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
