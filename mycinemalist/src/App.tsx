import React, { Component, useEffect, useState } from 'react'; import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,

} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ListaContent from "./components/ListaContent";
import { Content } from './common/Content';
import LoginRegister from './components/LoginRegister';
import Detail from './components/Detail';
import { initializeIcons, Stack } from 'office-ui-fabric-react';
import { ContextualCliente } from './common/Helper';
import { User } from './common/User';
import { CircularProgress } from '@material-ui/core';
import { setTimeout } from 'timers/promises';



function App(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dataContent: {
    [key: string]: Content;
  } = {};
  const dataUsers: {
    [key: number]: User;
  } = {};

  const [data, setData] = useState({})
  const [userData, setUserData] = useState({})
  const [selectedKey, setSelectedKey] = useState("0")

  const [loadingFav, setLoadingFav] = useState(false);

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
    window.setTimeout(() => {
      setLoadingFav(false);

    }, 500);

  }, [loadingFav]);



  useEffect(() => {
    if (userLogged != null) {
      window.setTimeout(() => {
        navigate("/main");
        setLoading(false);
      }, 500);
    }

  }, [userLogged]);


  useEffect(() => {
    if (usersLoaded) {
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
    favs.map((item) => {
      favArray.push(item.content_id)
    });
    content.map((item) => {
      var content = new Content(item, isFav(item, favArray));
      dataContent[content.title] = content;
      return true;
    });

    setData(dataContent)
    console.log(dataContent);
    setIsDataLoaded(true);
  }
  const isFav = (item, favs) => {
    return (favs.includes(item.id));
  }
  const LoggedUser = (id: number) => {
    console.log("loggeado");
    window.localStorage.setItem('id', id.toString());
    startPage();
  }

  const goDetails = (title) => {
    console.log(title);
    navigate("/detail", {
      state: {
        item: data[title],
        comments: null
      }
    });
  }

  const changeFav = async (title, pivot) => {
    if (data[title].isFav) {
      const respuesta = await fetch(`http://localhost:8080/delFav.php?user_id=${userLogged.id}&content_id=${data[title].id}`, {
        method: "DELETE",
      });
      const succes = await respuesta.json();

    } else {
      let fav = {
        user_id: userLogged.id,
        content_id: data[title].id
      }
      const util = JSON.stringify(fav);

      const respuesta = await fetch(`http://localhost:8080/newFav.php`, {
        mode: 'cors',
        method: "POST",
        body: util,
      });

      const succes = await respuesta.json();
      if (succes) {

      }
    }
    setSelectedKey(pivot.toString());
    setLoadingFav(true);

    data[title].isFav = !data[title].isFav;
    console.log(data[title].isFav);

    console.log(title);
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
  const submitComment = (text, rating) => {

  }
  if (loading) return <Stack
    style={{ width: "100%", marginTop: "150px" }}
    horizontal
    horizontalAlign='center'><CircularProgress color="inherit" size="100px" /></Stack>
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

          <Route path="/" element={<LoginRegister submit={LoggedUser.bind(this)}
          />} />
          {!loadingFav ? (
            <Route path="/main"
              element={<ListaContent
                details={(title) => {
                  goDetails(title);
                }}
                data={data}
                selectedKey={selectedKey}
                changeFav={(title, pivot) => {
                  changeFav(title, pivot);
                }} />} />) : (

            <Route path="/main"
              element={<Stack
                style={{ width: "100%", marginTop: "150px" }}
                horizontal
                horizontalAlign='center'><CircularProgress color="inherit" size="100px" /></Stack>} />
          )}

          <Route path="/detail" element={<Detail location={location} submit={(title, rating) => {
            submitComment(title, rating);
          }} />} />




        </Routes>
      </div>
    </>
  );
}


export default App;


