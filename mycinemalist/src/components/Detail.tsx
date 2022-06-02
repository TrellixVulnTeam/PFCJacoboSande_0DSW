import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import { Comment } from "../common/Comment";

import Consts from "../Consts";
import commonStyles from "../common/common.module.scss";
import * as $ from "jquery";
import ReactDOM from "react-dom";
import "../../node_modules/jquery/dist/jquery.min.js";
import {
  Stack,
  PrimaryButton,
  TextField,
  IIconProps,
  Modal,
  IconButton,
  Label,
  DayOfWeek,
  DatePicker,
  ComboBox,
  IComboBoxOption,
  Spinner,
  SpinnerSize,
  PivotItem,
  Pivot,
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
  IContextualMenuItem,
  getIconClassName,
  initializeIcons,
  Rating,
} from "office-ui-fabric-react";
import { Helmet } from "react-helmet";

import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-select";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import ContentCard from "./ContentCard";
import { getLeadingCommentRanges } from "typescript";
import { common } from "@material-ui/core/colors";
import NewComment from "./NewComment";
import ShowComment from "./ShowComment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
} from "@material-ui/core";

function Detail(props) {
  const [rating, setRating] = useState(props.location.state.item.rating);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState({});

  const dataComment: {
    [key: number]: Comment;
  } = {};

  useEffect(() => {
    setLoading(true);
    loadComments();
  }, []);
  useEffect(() => {
    window.setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  const loadComments = async () => {
    let comments;
    // Mañana cambiar los comentarios de sitio.
    const comentarios = await fetch(
      `http://localhost:8080/getAllComments.php`,
      {
        mode: "cors",
      }
    );
    comments = await comentarios.json();
    comments.map((item) => {
      var comment = new Comment(item);
      dataComment[comment.id] = comment;
      return true;
    });
    setCommentData(dataComment);
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
      <Stack
        horizontal
        horizontalAlign="space-evenly"
        style={{ width: "90%", margin: "0 auto" }}
      >
        <div
          style={{
            padding: "30px",
            width: "30%",
            border: "1px solid black",
            margin: "5px",
          }}
          className={commonStyles.contentCard}
        >
          <img
            style={{
              width: "100%",
              minHeight: "350px",
              objectFit: "cover",
              display: "block",
            }}
            src={props.location.state.item.image}
            alt=""
          />
          <Stack
            horizontal
            horizontalAlign="center"
            style={{ marginTop: "30px" }}
          >
            <Rating
              min={0}
              max={5}
              rating={rating}
              readOnly
              ariaLabelFormat="{0} of {1} stars"
            />
          </Stack>
        </div>
        <div
          style={{
            padding: "30px",
            width: "70%",
            border: "1px solid black",
            margin: "5px",
          }}
          className={commonStyles.contentCard}
        >
          <span style={{ display: "block", marginBottom: "15px" }}>
            <span className={commonStyles.detailLabel}>Título:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.title}
            </span>
            <span className={commonStyles.detailLabel}>Plataforma:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.platform}
            </span>
          </span>
          <hr />
          <span style={{ display: "block", marginBottom: "15px" }}>
            <span className={commonStyles.detailLabel}>Géneros:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.genre}
            </span>
            <span className={commonStyles.detailLabel}>Año:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.year}
            </span>
          </span>
          <hr />

          <span style={{ display: "block", marginBottom: "15px" }}>
            <span className={commonStyles.detailLabel}>Director:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.director}
            </span>
            <span className={commonStyles.detailLabel}>Tipo de contenido:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.content_type}
            </span>
          </span>
          <hr />
          <span style={{ display: "block", marginBottom: "15px" }}>
            <span className={commonStyles.detailLabel}>
              Actores principales:
            </span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.leading_cast}
            </span>
          </span>
          <hr />
          <span style={{ display: "block" }}>
            <span className={commonStyles.detailLabel}>Sinopsis:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.item.sinopsis}
            </span>
          </span>
        </div>
      </Stack>

      <Stack style={{ width: "90%", margin: "0 auto", marginTop: "30px" }}>
        <h2>Comentarios</h2>

        <div
          style={{
            padding: "30px",
            width: "100%",
            border: "1px solid black",
            marginBottom: "20px",
          }}
          className={commonStyles.contentCard}
        >
          <NewComment
            submit={(comment, rating) => {
              props.submit(
                comment,
                rating,
                props.location.state.item.id,
                window.localStorage.getItem("id"),
                props.location.state.item.title
              );
              var aux = dataComment;
              let item = {
                id: 999999999,
                content_id: props.location.state.item.id,
                user_id: window.localStorage.getItem("id"),
                comment: comment,
                rating: rating,
              };
              let commentnew = new Comment(item);
              aux[commentnew.id] = commentnew;
              setCommentData(aux);
              setLoading(true);
            }}
          />
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Mostrar comentarios</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{ width: "100%", margin: "0 auto", marginTop: "30px" }}
              >
                {Object.entries(commentData).map(([key, value]) => (
                  <ShowComment
                    content_id={props.location.state.item.id}
                    key={key}
                    item={value}
                    clickUser={(id) => {
                      props.clickUser(id);
                    }}
                    users={props.users}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </Stack>
    </>
  );
}

export default Detail;
