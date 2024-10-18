// import Header from "../components/header";
// import { ModeToggle } from '@/components/mode-toggle.tsx'
import Header from '@/components/header';
function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div >
            <Header />
            {/* <ModeToggle></ModeToggle> */}
            <div >
                <div >{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;