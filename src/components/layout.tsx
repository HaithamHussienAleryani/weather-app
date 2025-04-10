import {PropsWithChildren} from "react";

const Layout = ({children}: PropsWithChildren) => {
    return (
        <div className={'bg-g'}>
            header
            {children}
            footer
        </div>
    );
};

export default Layout;
