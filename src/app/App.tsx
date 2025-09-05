import { useState } from "react";
import { MainLayout } from "../shared/layouts/MainLayout.tsx";
import { ThemeProvider } from "../shared/lib/theme/ThemeProvider";
import { Modal } from "../shared/ui/Modal/Modal";
import { mockPosts } from "../lib/mocks/mocks.ts"
import styles from "./App.module.css"

export const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(prev => !prev);

    return (
        <ThemeProvider>
            <MainLayout onAboutClick={handleModalOpen}>
                <main className={styles.main}>
                    {mockPosts.map((item) => (
                        <article key={item.id} className={styles.post}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </article>
                    ))}
                </main>

                <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
                    <h2>Информация о проекте</h2>
                    <p>Это простое React-приложение с темами и модальным окном.</p>
                </Modal>
            </MainLayout>
        </ThemeProvider>
    );
};
