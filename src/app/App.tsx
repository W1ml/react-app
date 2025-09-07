import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "../shared/lib/theme/ThemeProvider";
import { MainLayout } from "../shared/layouts/MainLayout";
import { Modal } from "../shared/ui/Modal/Modal";
import { router } from "./providers/router";
import modalStyles from "../shared/ui/Modal/Modal.module.css";

export const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(prev => !prev);

    return (
        <ThemeProvider>
            <MainLayout onAboutClick={handleModalOpen}>
                <RouterProvider router={router} />
                
                <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
                    <Modal.Header onClose={handleModalOpen}>
                        <h2>О проекте</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Реализованные компоненты:</h3>
                        <ul>
                            <li><strong>Compound Components Modal</strong> - модальное окно с подкомпонентами Header, Body, Footer</li>
                            <li><strong>HOC withLoading</strong> - высший компонент для отображения состояния загрузки</li>
                            <li><strong>CommentList</strong> - список комментариев с возможностью разворота</li>
                            <li><strong>PostLengthFilter</strong> - фильтр постов по длине заголовка</li>
                            <li><strong>Оптимизированный PostList</strong> - использовал useMemo и useCallback</li>
                            <li><strong>Новые роуты и навигация</strong> - добавлены страницы для постов, альбомов, задач</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={modalStyles.button} onClick={handleModalOpen}>
                            Понятно
                        </button>
                    </Modal.Footer>
                </Modal>
            </MainLayout>
        </ThemeProvider>
    );
};
