import { useState } from "react";
import { MainLayout } from "../shared/layouts/MainLayout.tsx";
import { ThemeProvider } from "../shared/lib/theme/ThemeProvider";
import { Modal } from "../shared/ui/Modal/Modal";
import { Demo } from "./Demo";
import styles from "./App.module.css"
import modalStyles from "../shared/ui/Modal/Modal.module.css"

export const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(prev => !prev);

    return (
        <ThemeProvider>
            <MainLayout onAboutClick={handleModalOpen}>
                <main className={styles.main}>
                    <Demo />
                </main>

                <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
                    <Modal.Header onClose={handleModalOpen}>
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
                        <button className={modalStyles.button} onClick={handleModalOpen}>
                            Понятно
                        </button>
                    </Modal.Footer>
                </Modal>
            </MainLayout>
        </ThemeProvider>
    );
};
