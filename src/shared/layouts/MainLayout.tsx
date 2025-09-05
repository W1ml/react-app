import { Header } from '../../widgets/LayoutHeader/Header.tsx'
import { Footer } from '../../widgets/LayoutFooter/Footer.tsx'
import React from "react";
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: React.ReactNode
    onAboutClick?: () => void;
}

export const MainLayout = ({ children, onAboutClick }: MainLayoutProps) =>  {
    return (
        <div className={styles.layout}>
            <Header onAboutClick={onAboutClick} />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}
