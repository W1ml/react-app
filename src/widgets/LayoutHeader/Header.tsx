import {Button} from "../../shared/ui/Button/Button.tsx";
import {ThemeSwitcher} from "../../features/ThemeSwitcher/ui/ThemeSwitcher.tsx";
import styles from "./Header.module.css"

interface HeaderProps {
    onAboutClick?: () => void;
}

export const Header = ({ onAboutClick }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <Button onClick={onAboutClick}>О проекте</Button>
            <ThemeSwitcher />
        </header>
    )
}