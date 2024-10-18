// import Header from "../components/header";
import { ModeToggle } from '@/components/mode-toggle.tsx'


function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div >
            {/* <Header /> */}
            <div >

                <div >{children}</div>
            </div>
        </div>
    );
}

export default AuthLayout;