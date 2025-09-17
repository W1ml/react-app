import { MainLayout } from "../shared/layouts/MainLayout.tsx";
import { ThemeProvider } from "../shared/lib/theme/ThemeProvider";
import { AppRouter } from "./providers/router";
import styles from "./App.module.css"
import { BrowserRouter } from "react-router-dom";

export const App = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <MainLayout>
                    <main className={styles.main}>
                        <AppRouter />
                    </main>
                </MainLayout>
            </BrowserRouter>
        </ThemeProvider>
    );
};
