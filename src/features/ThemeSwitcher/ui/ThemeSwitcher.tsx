import React from "react";
import { useTheme } from "../../../shared/lib/theme/useTheme";
import { Button } from "../../../shared/ui/Button/Button";
import styles from "./ThemeSwitcher.module.css"

export const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} className={styles.switcher}>
            Сменить тему (сейчас: {theme})
        </Button>
    );
};
