import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a 
                href="https://github.com/W1ml/react-app"
                className={styles.githubLink}
                title="Открыть GitHub репозиторий"
            >
                GitHub
            </a>
            <span>Footer</span>
        </footer>
    );
};
