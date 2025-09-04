import React, { useState } from "react";
import { ThemeProvider } from "../shared/lib/theme/ThemeProvider";
import { ThemeSwitcher } from "../features/ThemeSwitcher/ui/ThemeSwitcher";
import { Button } from "../shared/ui/Button/Button";
import { Modal } from "../shared/ui/Modal/Modal";
import { mockPosts } from "../lib/mocks/mocks.ts"
import styles from "./App.module.css"

export const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(prev => !prev);

    return (
        <ThemeProvider>
            <header className={styles.header}>
                <Button onClick={handleModalOpen}>О проекте</Button>
                <ThemeSwitcher />
            </header>

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
        </ThemeProvider>
    );
};
