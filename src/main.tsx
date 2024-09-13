import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import App from './App.tsx'
import Consent from "./components/Consent.tsx";
import Metadata from "./components/Metadata.tsx";

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Metadata>
                <Consent>
                    <App/>
                </Consent>
            </Metadata>

        </QueryClientProvider>
    </React.StrictMode>,
)
