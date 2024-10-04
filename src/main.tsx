import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {MobileApp, Redirect, Root} from "./routes.tsx";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Root/>}/>
                    <Route path="redirect" element={<Redirect/>}/>
                    <Route path="app" element={<MobileApp/>}/>
                </Routes>
            </Router>
        </QueryClientProvider>
    </React.StrictMode>,
)
