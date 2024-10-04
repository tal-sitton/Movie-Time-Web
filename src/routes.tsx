import React from "react";
import Metadata from "./components/Metadata.tsx";
import Consent from "./components/Consent.tsx";
import App from "./App.tsx";

export const Root: React.FC = () => {
    return <Metadata>
        <Consent>
            <App/>
        </Consent>
    </Metadata>
}


export const Redirect: React.FC = () => {
    window.location.href = `https://code.sitton.dev/device-based-redirect?android=${window.location.origin}/%23/app&other=${window.location.origin}`
    return <></>
}

export const MobileApp: React.FC = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.talsitton.movietime'
    return <></>
}
