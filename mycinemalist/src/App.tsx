import React, { Component } from 'react';import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ListaContent from "./components/ListaContent";
import MainComponent from "./components/MainComponent";

class App extends Component {

 public componentDidMount(){
   console.log("se monto la app y la gozadera tambien")
 }
  render() {
    return (
    <Router>
      <div className="container mt-5">
        <div className="btn-group">
          <Link to="/listaContent" className="btn btn-dark me-2 border border-3 border-white rounded mt-2" >Inicio</Link>
          <Link to="/favorites" className="btn btn-dark me-2 border border-3 border-white rounded mt-2" >Mis favoritos</Link>
          <Link to="/suggestion" className="btn btn-dark me-2 border border-3 border-white rounded mt-2" >Sugerir</Link>
        </div>
        <hr />
        <Routes>
          <Route path="/" element={<ListaContent />
          } />
          <Route path="/favorites"> 
            {/* <Bla /> */}
         </Route> 
         <Route path="/suggestion">
            {/* <User /> */}
           </Route>
        </Routes>
      </div>
    </Router>
  );
        }
}

export default App;
