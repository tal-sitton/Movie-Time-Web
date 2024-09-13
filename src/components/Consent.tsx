import React, {useEffect} from "react";
import Cookies from 'universal-cookie';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import background from "../assets/background.jpg";
import backgroundPhone from "../assets/background_phone.jpg";

const Consent: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const cookies = new Cookies();
    const [userConsent, setUserConsent] = React.useState(cookies.get('userConsent'));

    const [isPhoneScreen, setIsPhoneScreen] = React.useState(window.innerHeight > window.innerWidth);

    const consent = () => {
        setUserConsent(true);
        cookies.set('userConsent', 'true', {maxAge: 60 * 60 * 24}); // 1 day
    }

    useEffect(() => {
        const handleResize = () => {
            setIsPhoneScreen(window.innerHeight > window.innerWidth)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (userConsent) {
        return children;
    }
    return (
        <>
            <Dialog
                open={!userConsent}
                dir={"rtl"}
            >
                <DialogTitle>
                    {"תנאי שימוש"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        השימוש באתר הוא על אחריות המשתמש בלבד, לעיתים האתר מראה מידע שגוי או מוטעה.
                        <br/>
                        על המשתמש לשים לב שכל הפרטים נכונים לפני ביצוע ההזמנה באתר הרשמי של בית הקולנוע אליו הוא נלקח.
                        <br/>
                        האתר רק מראה מידע שנלקח מרשתות בתי הקולנוע, ולעיתים מעבד אותם לא נכון (שם הסרט שונה/ מידע על
                        ההקרנה
                        שגוי וכו)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={consent} autoFocus>
                        אישור
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{
                backgroundImage: `url('${isPhoneScreen ? backgroundPhone : background}')`,
                height: "100vh",
                width: "100vw",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>
            </div>
        </>
    )
}

export default Consent