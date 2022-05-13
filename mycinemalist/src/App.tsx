import React, { Component } from 'react'; import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ListaContent from "./components/ListaContent";
import { Content } from './common/Content';
import LoginRegister from './components/LoginRegister';
import { Stack } from 'office-ui-fabric-react';
import { ContextualCliente } from './common/Helper';


interface IAppProps {
  // dataFromParent: [];
}

interface IAppState {
  isDataLoaded: boolean;
  isUserLogged: boolean;
}


export default class App extends React.Component<
  IAppProps,
  IAppState
> {
  public dataContent: {
    [key: string]: Content;
  } = {};

  constructor(props: IAppProps, state: IAppState) {
    super(props);
    this.state = {
      isDataLoaded: false,
      isUserLogged: true,

    };

  }
  public componentDidMount() {
    console.log("se monto la app y la gozadera tambien")
    this.initContent();
  }
  public async initContent() {
    console.log("init");
    let content;
    let favs;
    try {
      const contenido = await fetch(`http://localhost:8080/getAllContent.php`, {
        mode: "cors",
      });

      // const favoritos = await fetch(`http://localhost:8080/getAllFavs.php`, {
      //   mode: "cors",
      // });
      content = await contenido.json();
      // favs = await favoritos.json();

    } catch (error) {
      console.log(error);
      // Manage error codes
    }
    content.map((item) => {
      var content = new Content(item, true);
      this.dataContent[content.title] = content;
      return true;
    });

    console.log(content);
    this.setState({ isDataLoaded: true });
  }

  public loggedUser() {

  }
  render() {
    return (
      <Router>
        <div className="container mt-5">
          {this.state.isUserLogged &&
            <><Stack
              horizontal
              horizontalAlign='space-between'
            >
              <div
                className="btn-group">
                <Link to="/listaContent" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Inicio</Link>
                <Link to="/favorites" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Mis favoritos</Link>
                <Link to="/suggestion" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Sugerir</Link>
              </div>
              <Stack>
              <ContextualCliente
                        nuevaBolsa={() => {
                          // this.CrearEditarBolsa();
                        }}
                        nuevoRegistro={() => {
                          // this.CrearEditarRegistro(null);
                        }}
                      />
              </Stack>

            </Stack><hr /></>}

          <Routes>
            {/* <Route path="/" element={<LoginRegister submit={this.loggedUser()} /> } /> */}
            {/* <FormCrear
        submit={SubmitFormulario.bind(this)}
        cliente={this.clienteActual}
        context={this.props.context}
      ></FormCrear> */}
            <Route path="/" element={<LoginRegister />} />

            {this.state.isDataLoaded ? (
              <Route path="/listaContent" element={<ListaContent dataContent={this.dataContent} />} />
            ) : (
              <></>
            )}


          </Routes>
        </div>
      </Router>
    );
  }
}

