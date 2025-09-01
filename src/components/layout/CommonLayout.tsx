import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type TProps = {
    children: ReactNode;
};

const CommonLayout = ({ children }: TProps) => {
    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar></Navbar>
            <div className="grow-1 container mx-auto py-3 px-8">{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default CommonLayout;
