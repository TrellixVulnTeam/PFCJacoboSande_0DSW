import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ListaContent from "./components/ListaContent";
import { Content } from "./common/Content";
import { Comment } from "./common/Comment";
import { Helmet } from "react-helmet";

import LoginRegister from "./components/LoginRegister";
import Detail from "./components/Detail";
import {
  DefaultButton,
  initializeIcons,
  PrimaryButton,
  Stack,
} from "office-ui-fabric-react";
import { ContextualCliente } from "./common/Helper";
import { User } from "./common/User";
import { CircularProgress, Snackbar } from "@material-ui/core";
import { setTimeout } from "timers/promises";
import Profile from "./components/Profile";
import Suggestions from "./components/Suggestions";
// import MuiAlert, { AlertProps } from '@material-ui/Alert';
// import { ThemeProvider, PartialTheme } from '@fluentui/react';
import { loadTheme } from "office-ui-fabric-react";

function App(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dataContent: {
    [key: string]: Content;
  } = {};
  const dataUsers: {
    [key: number]: User;
  } = {};

  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [commentData, setCommentData] = useState({});

  const [selectedKey, setSelectedKey] = useState("0");
  const [snackMessage, setSnackMessage] = useState("");

  const [loadingFav, setLoadingFav] = useState(false);
  const [SnackOpen, setSnackOpen] = useState(false);

  const [loadingComment, setLoadingComment] = useState(false);

  const [usersLoaded, setUsersLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    // Inicializamos iconos y los usuarios de l abbdd
    initializeIcons();
    getUsers();
  }, []);

  useEffect(() => {
    // Reiniciamos el loadingFav para recargar la página
    window.setTimeout(() => {
      setLoadingFav(false);
    }, 500);
  }, [loadingFav]);

  useEffect(() => {
    // Cuando cambie el usuario loggeado lo mandamos a la pantalla main si es != null
    if (userLogged != null) {
      window.setTimeout(() => {
        navigate("/main");
        setLoading(false);
      }, 500);
    }
  }, [userLogged]);

  useEffect(() => {
    // Despues de cargar los usuarios si hay una sesion iniciada iniciamos la página
    if (usersLoaded) {
      if (checkLogged()) {
        startPage();
      } else {
        setLoading(false);
      }
    }
  }, [usersLoaded]);

  const startPage = () => {
    // Iniciamos la página , iniciando el contenido y seteando el usuario loggeado en un state
    setLoading(true);
    initContent();
    setIsUserLogged(true);
    setUserLogged(userData[parseInt(window.localStorage.getItem("id"))]);
  };

  const getUsers = async () => {
    // Llamamos a los usuarios en base de datos y los mapeamos en User
    const usersfetch = await fetch(`http://localhost:8080/getAllUsers.php`, {
      mode: "cors",
    });
    let users = await usersfetch.json();
    console.log(users);
    users.map((item) => {
      console.log(typeof item.is_admin);
      console.log(item.is_admin);

      var user = new User(item);
      console.log(user);
      dataUsers[user.id] = user;
      return true;
    });
    setUserData(dataUsers);

    setUsersLoaded(true);
    console.log(dataUsers);
  };

  const checkLogged = () => {
    // Comprobamos si existe un usuario logeado en la página.
    // TODO :Cambiar el sistema de gestion de sesiones
    let id = window.localStorage.getItem("id");
    console.log(id);
    return id !== "null";
  };

  const initContent = async () => {
    // Iniciamos el contenido
    let content;
    let favs;
    let favArray = [];
    try {
      // Cargamos los content
      const contenido = await fetch(`http://localhost:8080/getAllContent.php`, {
        mode: "cors",
      });
      // Cargamos todos los favoritos
      const favoritos = await fetch(
        `http://localhost:8080/getFavsUser.php?id=${window.localStorage.getItem(
          "id"
        )}`,
        {
          mode: "cors",
        }
      );

      content = await contenido.json();
      favs = await favoritos.json();
    } catch (error) {
      console.log(error);
    }
    // Llenamos el array de favoritos
    favs.map((item) => {
      favArray.push(item.content_id);
    });
    content.map((item) => {
      // Generamos los contenidos segun lo que nos ha venido de base de datos comprobando si es favorito o no del usuario loggeado
      var content = new Content(item, isFav(item, favArray));
      dataContent[content.title] = content;
      return true;
    });
    setData(dataContent);
    setIsDataLoaded(true);
  };

  const isFav = (item, favs) => {
    return favs.includes(item.id);
  };
  const LoggedUser = (id: number) => {
    // Loggeado el usuario seteamos la variable en el localStorage
    // TODO :Cambiar el sistema de gestion de sesiones

    window.localStorage.setItem("id", id.toString());
    startPage();
  };

  const goDetails = (title) => {
    // Metodo para gestionar el click del boton de ir a detalles
    // Navegamos a la pagina de detalle y enviamos el Content
    navigate("/detail", {
      state: {
        item: data[title],
        comments: null,
      },
    });
  };

  const changeFav = async (title, pivot) => {
    // Metodo para cambiar el favorito, borramos o añadimos en base de datos segun el cambio
    if (data[title].isFav) {
      try {
        const respuesta = await fetch(
          `http://localhost:8080/delFav.php?user_id=${userLogged.id}&content_id=${data[title].id}`,
          {
            method: "DELETE",
          }
        );
        const succes = await respuesta.json();
        setSnackMessage("Favorito eliminado");
        setSnackOpen(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      let fav = {
        user_id: userLogged.id,
        content_id: data[title].id,
      };
      const util = JSON.stringify(fav);

      const respuesta = await fetch(`http://localhost:8080/newFav.php`, {
        mode: "cors",
        method: "POST",
        body: util,
      });

      const succes = await respuesta.json();
      setSnackMessage("Favorito añadido");
      setSnackOpen(true);
      if (succes) {
      }
    }
    // Al recargar el componente seteamos en un state la pestaña en la que nos encontramos para no cambiarle la interfazo al usuario
    setSelectedKey(pivot.toString());
    setLoadingFav(true);

    data[title].isFav = !data[title].isFav;
  };

  const goConfig = () => {
    // Metodo para la gestión de ir al perfil del usuario desde el botón de configuración
    navigate("/profile", {
      state: {
        user: userData[window.localStorage.getItem("id")],
      },
    });
  };

  const goLogout = async () => {
    // Metodo para cerrar sesión, y reenviar al usuario a la página de login
    window.localStorage.setItem("id", "null");
    setIsUserLogged(false);
    setUserLogged(null);
    navigate("/");
  };

  const submitComment = async (comment, rating, content_id, user_id, title) => {
    // Gestionamos la creación de un nuevo comentario
    // Creamos el json del comentario y lo enviamos al servidor
    let Comment = {
      content_id: content_id,
      user_id: user_id,
      comment: comment,
      rating: rating,
    };

    const util = JSON.stringify(Comment);
    const respuesta = await fetch(`http://localhost:8080/newComment.php`, {
      mode: "cors",
      method: "POST",
      body: util,
    });
    const exitoso = await respuesta.json();
    // Calculamos el rating
    let calcrating = (
      Math.round(((data[title].rating + rating) / 2) * 2) / 2
    ).toFixed(1);
    let newrating = {
      id: content_id,
      rating: calcrating,
    };
    const cargaUtil = JSON.stringify(newrating);
    // Updateamos el rating del contenido segun el comentario
    const resp = await fetch(`http://localhost:8080/updateRating.php`, {
      method: "PUT",
      body: cargaUtil,
    });
    const exito = await resp.json();

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      // Volvemos a la pagina de detalle
      navigate("/detail", {
        state: {
          item: data[title],
          comments: null,
        },
      });
    }, 300);

    // validar respuesta
  };

  const updateProfile = async (name, surname, description, image, id) => {
    // Actualizamos el perfil despues de modificarlo
    // Creamos el objeto json de usuario con los datos nuevos
    let user = {
      id: id,
      name: name,
      surname: surname,
      description: description,
    };
    const cargaUtil = JSON.stringify(user);
    const respuesta = await fetch(`http://localhost:8080/updateUser.php`, {
      method: "PUT",
      body: cargaUtil,
    });
    // Modificamos también ls datos del usuario que maneja la aplicación para no volver a pedirlos a bbdd
    userData[id].name = name;
    userData[id].surname = surname;
    userData[id].description = description;
    goUserProfile(id);
  };

  const goUserProfile = (id) => {
    // Gestión de los botones de ir a perfil del usario
    console.log(id);
    navigate("/profile", {
      state: {
        user: userData[id],
      },
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  if (loading)
    return (
      <Stack
        style={{ width: "100%", marginTop: "150px" }}
        horizontal
        horizontalAlign="center"
      >
        <CircularProgress color="inherit" size="100px" />
      </Stack>
    );
  return (
    <>
      <div className="container mt-5">
        {isUserLogged && (
          <>
            <Stack horizontal horizontalAlign="space-between">
              <div className="btn-group">
                <PrimaryButton
                  style={{ marginRight: "20px", marginTop: "20px" }}
                >
                  <Link
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    to="/main"
                  >
                    Inicio
                  </Link>
                </PrimaryButton>
                <PrimaryButton
                  style={{ marginRight: "20px", marginTop: "20px" }}
                >
                  <Link
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    to="/suggestion"
                  >
                    Sugerir
                  </Link>
                </PrimaryButton>
              </div>
              {userLogged != null && (
                <Stack style={{ marginTop: "12px" }}>
                  <ContextualCliente
                    goConfig={() => {
                      goConfig();
                    }}
                    goLogout={() => {
                      goLogout();
                    }}
                    user={userLogged}
                  />
                </Stack>
              )}
            </Stack>
            <hr />
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={<LoginRegister submit={LoggedUser.bind(this)} />}
          />
          {!loadingFav ? (
            <Route
              path="/main"
              element={
                <ListaContent
                  details={(title) => {
                    goDetails(title);
                  }}
                  data={data}
                  selectedKey={selectedKey}
                  changeFav={(title, pivot) => {
                    changeFav(title, pivot);
                  }}
                />
              }
            />
          ) : (
            <Route
              path="/main"
              element={
                <Stack
                  style={{ width: "100%", marginTop: "150px" }}
                  horizontal
                  horizontalAlign="center"
                >
                  <CircularProgress color="inherit" size="100px" />
                </Stack>
              }
            />
          )}
          <Route
            path="/profile"
            element={
              <Profile
                updateProfile={(name, surname, description, image, id) => {
                  updateProfile(name, surname, description, image, id);
                }}
                location={location}
              />
            }
          />

          <Route
            path="/detail"
            element={
              <Detail
                location={location}
                submit={(comment, rating, content_id, user_id, title) => {
                  submitComment(comment, rating, content_id, user_id, title);
                }}
                users={userData}
                clickUser={(id) => {
                  goUserProfile(id);
                }}
              />
            }
          />

          <Route
            path="/suggestion"
            element={
              <Suggestions user={userData[window.localStorage.getItem("id")]} />
            }
          />
        </Routes>
        <Snackbar
          open={SnackOpen}
          autoHideDuration={2000}
          onClose={handleClose}
          message={snackMessage}
        />
      </div>
    </>
  );
}

export default App;
