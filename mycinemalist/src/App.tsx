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
import { setTimeout } from 'timers/promises';

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
  const [userData, setUserData] = useState({})

  const [usersLoaded, setUsersLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    console.log("se monto la app y la gozadera tambien")
    initializeIcons();
    getUsers();
    
    // window.setTimeout(() => {

    // }, 400);


  }, [])



  useEffect(() => {
    if (userLogged != null) {
      window.setTimeout(() => {
        navigate("/main");
        setLoading(false);
      }, 500);
    }

  }, [userLogged]);


  useEffect(() => {
    if(usersLoaded){
    if (checkLogged()) {
      startPage();
    } else {
      setLoading(false);
    }
  }
  }, [usersLoaded]);


  const startPage = () => {

    setLoading(true);
    initContent();
    setIsUserLogged(true);
    console.log(userLogged);
    console.log(userData);
    setUserLogged(userData[parseInt(window.localStorage.getItem('id'))]);


  }

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
    setUserData(dataUsers);

    setUsersLoaded(true);
    console.log(dataUsers);
  }

  const checkLogged = () => {
    let id = window.localStorage.getItem('id');
    console.log(id);
    return (id !== "null");
    // if (id != "null") {
    //   console.log(userLogged);
    //   console.log(dataUsers[id]);
    //   setUserLogged(dataUsers[id])
    //   console.log("entre " + id);
    //   setIsUserLogged(true);
    // }

  }
  const initContent = async () => {
    console.log("init");
    let content;
    let favs;
    let favArray = [];
    try {
      const contenido = await fetch(`http://localhost:8080/getAllContent.php`, {
        mode: "cors",
      });

      const favoritos = await fetch(`http://localhost:8080/getFavsUser.php?id=${window.localStorage.getItem('id')}`, {
        mode: "cors",
      });
      content = await contenido.json();
      favs = await favoritos.json();

    } catch (error) {
      console.log(error);
      // Manage error codes
    }
    favs.map((item) =>{
      favArray.push(item.content_id)
    });
    content.map((item) => {
      var content = new Content(item, isFav(item,favArray));
      dataContent[content.title] = content;
      return true;
    });
    
    setData(dataContent)
    console.log(dataContent);
    setIsDataLoaded(true);
  }
  const isFav = (item,favs) =>{
    return (favs.includes(item.id));
  }
  const LoggedUser = (id: number) => {
    console.log("loggeado");
    window.localStorage.setItem('id', id.toString());
    startPage();
  }

  const goConfig = () => {

  }

  const test = async () => {
    console.log(window.localStorage.getItem('id'));
    console.log("isuser" + isUserLogged + " user:+" + userLogged.name);
  }
  const goLogout = async () => {
    window.localStorage.setItem('id', "null");
    setIsUserLogged(false);
    setUserLogged(null);
    navigate("/");
  }

  if (loading) return <CircularProgress color="inherit" size="200px" />
    ;
  return (
    <>
      <div className="container mt-5">
        <button onClick={test}>TEST</button>
        {isUserLogged &&
          <><Stack
            horizontal
            // style={{display:isUserLogged?'block':'none'}}
            horizontalAlign='space-between'
          >
            <div
              className="btn-group">
              <Link to="/main" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Inicio</Link>
              <Link to="/favorites" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Mis favoritos</Link>
              <Link to="/suggestion" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Sugerir</Link>
            </div>
            {userLogged != null &&
              <Stack
                style={{ marginBottom: "10px" }}>
                <ContextualCliente
                  goConfig={() => {
                    // goToConfig();
                  }}
                  goLogout={() => {
                    goLogout();
                  }}
                  user={userLogged} />
              </Stack>}


          </Stack><hr /></>

        }

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
          <Route path="/main" element={<ListaContent data={data} />} />
          {/* } */}


        </Routes>
      </div>
    </>
  );
}


export default App;


