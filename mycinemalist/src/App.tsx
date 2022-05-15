import React, { Component, useEffect, useState } from 'react'; import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,

} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ListaContent from "./components/ListaContent";
import { Content } from './common/Content';
import LoginRegister from './components/LoginRegister';
import { initializeIcons, Stack } from 'office-ui-fabric-react';
import { ContextualCliente } from './common/Helper';
import { User } from './common/User';
import { CircularProgress } from '@material-ui/core';

interface IAppProps {
  // dataFromParent: [];
}

interface IAppState {
  isDataLoaded: boolean;
  isUserLogged: boolean;
  userLogged: User;
}


function App(props) {
  const navigate = useNavigate();

  const dataContent: {
    [key: string]: Content;
  } = {};
  const dataUsers: {
    [key: number]: User;
  } = {};

  const [data, setData] = useState({})
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    console.log("se monto la app y la gozadera tambien")
    initializeIcons();
    getUsers();
    checkLogged();

  }, [])

  useEffect(() => {
    if (userLogged != null)
      initContent();

  }, [userLogged]); // <- add the count variable here

  const getUsers = async () => {
    const usersfetch = await fetch(`http://localhost:8080/getAllUsers.php`, {
      mode: "cors",
    });
    let users = await usersfetch.json();

    users.map((item) => {
      var user = new User(item);
      console.log(user);
      dataUsers[user.id] = user;
      return true;

    });
    console.log(dataUsers);
  }
  const checkLogged = async () => {

    const user = await fetch(`http://localhost:8080/getLoggedUser.php`, {
      mode: "cors",
    });
    let userid = await user.json();
    console.log(userid);
    if (userid != 0) {
      setUserLogged(dataUsers[userid])
      console.log("entre");
      setIsUserLogged(true);
    }


  }
  const initContent = async () => {

    console.log("init");
    let content;
    let favs;
    try {
      const contenido = await fetch(`http://localhost:8080/getAllContent.php`, {
        mode: "cors",
      });

      // const favoritos = await fetch(`http://localhost:8080/getFavsUser.php`, {
      //   mode: "cors",
      //   method: 'POST',
      //   body: userLogged.id
      // });
      content = await contenido.json();
      // favs = await favoritos.json();

    } catch (error) {
      console.log(error);
      // Manage error codes
    }
    content.map((item) => {
      var content = new Content(item, true);
      dataContent[content.title] = content;
      return true;
    });
    setData(dataContent)

    console.log(dataContent);
    setIsDataLoaded(true);
    navigate("/listaContent");

  }
  const LoggedUser = (id: number) => {

    setIsUserLogged(true);
    setUserLogged(dataUsers[id]);

    console.log("loggeado");
  }
  const goConfig = () =>{

  }

  const goLogout = async () =>{
    const contenido = await fetch(`http://localhost:8080/goLogout.php`, {
      mode: "cors",
    });
    setIsUserLogged(false);
    setUserLogged(null);
    navigate("/");
  }
  if (!isDataLoaded && isUserLogged) return <CircularProgress color="inherit" size="200px" />
    ;
  return (
    <>
      <div className="container mt-5">
        {isUserLogged &&
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
                goConfig={() => {
                  // goToConfig();
                }}
                goLogout={() => {
                  goLogout();
                }}
                user={userLogged}
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
          <Route path="/" element={<LoginRegister submit={LoggedUser.bind(this)}
          />} />

          {/* {isDataLoaded && */}
          <Route path="/listaContent" element={<ListaContent data={data} />} />
          {/* } */}


        </Routes>
      </div>
    </>
  );
}


export default App;


