import Header from "../components/header";

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div >
            <Header />
            <div >
                <div >{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;