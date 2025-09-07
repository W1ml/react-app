import type {FC} from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLinks.module.css';

interface NavLink {
    to: string;
    label: string;
}

interface NavLinksProps {
    title: string;
    links: NavLink[];
}

export const NavLinks: FC<NavLinksProps> = ({ title, links }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.links}>
                {links.map((link) => (
                    <Link key={link.to} to={link.to} className={styles.link}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};
