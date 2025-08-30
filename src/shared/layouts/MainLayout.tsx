import { Header } from '../../widgets/LayoutHeader/Header.tsx'
import { Footer } from '../../widgets/LayoutFooter/Footer.tsx'

interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}