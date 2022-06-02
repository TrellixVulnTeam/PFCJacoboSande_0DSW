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

loadTheme({
  palette: {
    themePrimary: "#0078d4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#c2c2c2",
    neutralSecondary: "#858585",
    neutralPrimaryAlt: "#4b4b4b",
    neutralPrimary: "#333333",
    neutralDark: "#272727",
    black: "#1d1d1d",
    white: "#ffffff",
  },
});

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
    initializeIcons();
    getUsers();
  }, []);

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
    setUserLogged(userData[parseInt(window.localStorage.getItem("id"))]);
  };

  const getUsers = async () => {
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
    let id = window.localStorage.getItem("id");
    console.log(id);
    return id !== "null";
  };

  const initContent = async () => {
    console.log("init");
    let content;
    let favs;
    let favArray = [];
    try {
      const contenido = await fetch(`http://localhost:8080/getAllContent.php`, {
        mode: "cors",
      });

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
    favs.map((item) => {
      favArray.push(item.content_id);
    });
    content.map((item) => {
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
    console.log("loggeado");
    window.localStorage.setItem("id", id.toString());
    startPage();
  };

  const goDetails = (title) => {
    console.log(title);
    navigate("/detail", {
      state: {
        item: data[title],
        comments: null,
      },
    });
  };

  const changeFav = async (title, pivot) => {
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
    setSelectedKey(pivot.toString());
    setLoadingFav(true);

    data[title].isFav = !data[title].isFav;
  };

  const goConfig = () => {
    navigate("/profile", {
      state: {
        user: userData[window.localStorage.getItem("id")],
      },
    });
  };

  const goLogout = async () => {
    window.localStorage.setItem("id", "null");
    setIsUserLogged(false);
    setUserLogged(null);
    navigate("/");
  };
  const submitComment = async (comment, rating, content_id, user_id, title) => {
    let Comment = {
      content_id: content_id,
      user_id: user_id,
      comment: comment,
      rating: rating,
    };

    const util = JSON.stringify(Comment);
    console.log(util);
    // ¡Y enviarlo!
    const respuesta = await fetch(`http://localhost:8080/newComment.php`, {
      mode: "cors",
      method: "POST",
      body: util,
    });
    const exitoso = await respuesta.json();

    let calcrating = (
      Math.round(((data[title].rating + rating) / 2) * 2) / 2
    ).toFixed(1);
    let newrating = {
      id: content_id,
      rating: calcrating,
    };
    const cargaUtil = JSON.stringify(newrating);

    const resp = await fetch(`http://localhost:8080/updateRating.php`, {
      method: "PUT",
      body: cargaUtil,
    });
    const exito = await resp.json();

    console.log(respuesta);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);

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
    let user = {
      id: id,
      name: name,
      surname: surname,
      description: description,
    };
    console.log(user);
    const cargaUtil = JSON.stringify(user);
    // ¡Y enviarlo!
    const respuesta = await fetch(`http://localhost:8080/updateUser.php`, {
      method: "PUT",
      body: cargaUtil,
    });
    userData[id].name = name;
    userData[id].surname = surname;
    userData[id].description = description;
    goUserProfile(id);
  };

  const goUserProfile = (id) => {
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
      {/* <Helmet>
          <style>{'body { background-color: #FAFAD2;!important } *{background-color:rgb(131 215 243 / 74%);}'}</style>
        </Helmet> */}
      <div className="container mt-5">
        {isUserLogged && (
          <>
            <Stack
              horizontal
              // style={{display:isUserLogged?'block':'none'}}
              horizontalAlign="space-between"
            >
              <div className="btn-group">
                {/* <Link to="/main" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Inicio</Link> */}
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
                {/* <Link to="/suggestion" className="btn btn-dark me-2 border border-3 border-white rounded mt-2">Sugerir</Link> */}
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

          {/* <Route path="/detail" element={<Detail location={location} submit={(title, rating) => {
            submitComment(title, rating);
          }} />} /> */}

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
          // style={{backgroundColor:"red"}}
          autoHideDuration={2000}
          onClose={handleClose}
          message={snackMessage}
        />
      </div>
    </>
  );
}

export default App;
