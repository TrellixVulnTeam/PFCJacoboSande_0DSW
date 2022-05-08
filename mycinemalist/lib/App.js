import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import ListaContent from "./components/ListaContent";
function App() {
    return (React.createElement(Router, null,
        React.createElement("div", { className: "container mt-5" },
            React.createElement("div", { className: "btn-group" },
                React.createElement(Link, { to: "/listaContent", className: "btn btn-dark me-2 border border-3 border-white rounded mt-2" }, "Inicio"),
                React.createElement(Link, { to: "/favorites", className: "btn btn-dark me-2 border border-3 border-white rounded mt-2" }, "Mis favoritos"),
                React.createElement(Link, { to: "/suggestion", className: "btn btn-dark me-2 border border-3 border-white rounded mt-2" }, "Sugerir")),
            React.createElement("hr", null),
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/listaContent", element: React.createElement(ListaContent, null) }),
                React.createElement(Route, { path: "/favorites" }),
                React.createElement(Route, { path: "/suggestion" })))));
}
export default App;
//# sourceMappingURL=App.js.map