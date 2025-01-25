import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Eğer Tailwind veya başka bir CSS kullanıyorsanız

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
