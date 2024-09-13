import React, {useEffect, useState} from "react";

const Metadata: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [isBottom, setIsBottom] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;

        const isBottom = currentScrollPos >= windowHeight;
        const isScrollingUp = prevScrollPos > currentScrollPos;

        setIsBottom(isBottom);
        setIsScrollingUp(isScrollingUp);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return <>
        {children}
        <footer
            style={{
                position: isScrollingUp ? "fixed" : "inherit",
                visibility: isBottom || isScrollingUp ? "visible" : "collapse",
                bottom: isScrollingUp ? "0" : isBottom ? "inherit" : "-100px", // moves footer up or down
                right: isScrollingUp ? 0 : "inherit",
                left: isScrollingUp ? 0 : "inherit",
                backgroundColor: "#242424",
                transition: "bottom 0.3s ease-in-out, opacity 0.3s ease-in-out",
                opacity: isScrollingUp || isBottom ? 0.97 : 0,
                padding: "10px 16px 10px 16px",
                display: "flex",
                justifyContent: "center",
                gap: "1em",
                alignItems: "center",
                whiteSpace: "nowrap",
            }}
        >
            <span style={{textAlign: "left"}}>Created By Tal Sitton</span>
            <a href="https://github.com/tal-sitton/Movie-Time-Web" target={"_blank"} style={{display: "inline-flex"}}>
                <img alt="Github" style={{width: "100%"}}
                     src={"https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"}></img>
            </a>
            <a href={"https://www.paypal.com/donate/?hosted_button_id=QFJWKB7U7Y8VL"} target={"_blank"}
               style={{display: "inline-flex"}}>
                <img alt="Paypal" style={{width: "100%"}}
                     src={"https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white"}></img>
            </a>
        </footer>
    </>
}

export default Metadata