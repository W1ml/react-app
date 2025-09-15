import { MainLayout } from "../shared/layouts/MainLayout.tsx";
import { ThemeProvider } from "../shared/lib/theme/ThemeProvider";
import { Demo } from "./Demo";
import styles from "./App.module.css"

export const App = () => {
    return (
        <ThemeProvider>
            <MainLayout>
                <main className={styles.main}>
                    <Demo />
                </main>
            </MainLayout>
        </ThemeProvider>
    );
};
