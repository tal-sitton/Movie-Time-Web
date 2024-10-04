import React, {useEffect, useState} from "react";

const Metadata: React.FC<{ children: React.ReactNode }> = ({children}) => {


    const [isBottom, setIsBottom] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    const OS = /android/i.test(navigator.userAgent) ? 'android' : 'other';

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


    if (window.location.pathname === '/app') {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.talsitton.movietime'
        return <></>
    }
    if (window.location.pathname === '/redirect') {
        window.location.href = `https://code.sitton.dev/device-based-redirect?android=${window.location.origin}/app&other=${window.location.origin}`
        return <></>
    }

    return <>
        {children}
        <footer
            style={{
                position: isScrollingUp ? "fixed" : "inherit",
                visibility: isBottom || isScrollingUp ? "visible" : "collapse",
                bottom: isScrollingUp ? "0" : isBottom ? "inherit" : "-100px", // moves footer up or down
                right: isScrollingUp ? 0 : "inherit",
                left: isScrollingUp ? 0 : "inherit",
                opacity: isScrollingUp || isBottom ? 0.97 : 0
            }}
        >
            <span style={{textAlign: "left"}}>Created By Tal Sitton</span>
            {OS === "android" ?
                <a href="https://play.google.com/store/apps/details?id=com.talsitton.movietime"
                   style={{display: "inline-flex"}}>
                    <img alt="Play Store" style={{width: "100%"}}
                         src={"https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white"}></img>
                </a>
                :
                <a href="https://github.com/tal-sitton/Movie-Time-Web" target={"_blank"}
                   style={{display: "inline-flex"}}>
                    <img alt="Github" style={{width: "100%"}}
                         src={"https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"}></img>
                </a>
            }
            <a href={"https://www.paypal.com/donate/?hosted_button_id=QFJWKB7U7Y8VL"} target={"_blank"}
               style={{display: "inline-flex"}}>
                <img alt="Paypal" style={{width: "100%"}}
                     src={"https://img.shields.io/badge/Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white"}></img>
            </a>
        </footer>
    </>
}

export default Metadata