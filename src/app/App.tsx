import React, { useState, Fragment } from "react";
import { ThemeProvider } from "../shared/lib/theme/ThemeProvider";
import { ThemeSwitcher } from "../features/ThemeSwitcher/ui/ThemeSwitcher";
import { Button } from "../shared/ui/Button/Button";
import { Modal } from "../shared/ui/Modal/Modal";

export const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mockPosts = [
        {
            id: 1,
            title: "Пост номер один",
            body: "Описание первого поста",
        },
        {
            id: 2,
            title: "Пост номер 2",
            body: "Описание второго поста",
        },
    ];

    return (
        <ThemeProvider>
            <header style={{ padding: "10px", borderBottom: "1px solid gray" }}>
                <Button onClick={() => setIsModalOpen(true)}>О проекте</Button>
                <ThemeSwitcher />
            </header>

            <main style={{ padding: "20px" }}>
                {mockPosts.map((item) => (
                    <Fragment key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </Fragment>
                ))}
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Информация о проекте</h2>
                <p>Это простое React-приложение с темами и модальным окном.</p>
            </Modal>
        </ThemeProvider>
    );
};
