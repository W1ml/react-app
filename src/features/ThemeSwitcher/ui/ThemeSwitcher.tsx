import { useTheme } from "../../../shared/lib/theme/useTheme";
import { Button } from "../../../shared/ui/Button/Button";
import type { MouseEventHandler } from "../../../shared/types";
import styles from "./ThemeSwitcher.module.css";

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    const handleToggle: MouseEventHandler<HTMLButtonElement> = () => {
        toggleTheme();
    };

    return (
        <Button 
            onClick={handleToggle} 
            className={styles.switcher}
            variant="secondary"
            size="small"
        >
            Сменить тему (сейчас: {theme})
        </Button>
    );
};
