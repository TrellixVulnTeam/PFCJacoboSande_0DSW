import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import Consts from "../Consts";
import commonStyles from "../common/common.module.scss";
import * as $ from "jquery";
import {
  Stack,
  PrimaryButton,
  TextField,
  IIconProps,
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
  RatingSize,
  DefaultButton,
  mergeStyleSets,
} from "office-ui-fabric-react";
import { Helmet } from "react-helmet";

import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-select";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import ReactDOM from "react-dom";
import ContentCard from "./ContentCard";
import { getLeadingCommentRanges } from "typescript";
import { common } from "@material-ui/core/colors";
import { Box, Typography, Modal, Button } from "@material-ui/core";

function FormSugg(props) {
  const [title, setTitle] = useState(props.sugg ? props.sugg.title : "");
  const [year, setYear] = useState(props.sugg ? props.sugg.year : "");
  const [platform, setPlatform] = useState(
    props.sugg ? props.sugg.platform : ""
  );
  const [director, setDirector] = useState("");
  const [leading_actors, setLeading_actors] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [content_type, setContent_type] = useState("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [errorPlatform, setErrorPlatform] = useState("");

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkValues = () => {
    // Metodo para validar los campos sel formulario de sugerencia
    let isOk = true;
    if (title.trim() === "") {
      setErrorTitle("Rellene el campo");
      isOk = false;
    } else {
      setErrorTitle("");
    }
    if (year === "") {
      setErrorYear("Rellene el campo");
      isOk = false;
    } else {
      setErrorYear("");
    }
    if (platform.trim() === "") {
      setErrorPlatform("Rellene el campo");
      isOk = false;
    } else {
      setErrorPlatform("");
    }
    return isOk;
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-year"
      >
        <Box sx={style}>
          <h3 id="modal-modal-title">Crear sugerencia</h3>
          <div id="modal-modal-year">
            <Stack>
              <Stack>
                <TextField
                  label={"Titulo"}
                  onChange={(
                    ev: React.SyntheticEvent<HTMLElement, Event>,
                    title: string
                  ) => {
                    setTitle(title);
                  }}
                  value={title ? title : ""}
                  required={true}
                  autoAdjustHeight
                />
                <span
                  className={commonStyles.errorSpan}
                  style={{ display: errorTitle ? "block" : "none" }}
                >
                  {errorTitle}
                </span>
              </Stack>
              <Stack>
                <TextField
                  label={"Plataforma"}
                  onChange={(
                    ev: React.SyntheticEvent<HTMLElement, Event>,
                    platform: string
                  ) => {
                    setPlatform(platform);
                  }}
                  value={platform ? platform : ""}
                  required={true}
                  autoAdjustHeight
                />
                <span
                  className={commonStyles.errorSpan}
                  style={{ display: errorPlatform ? "block" : "none" }}
                >
                  {errorPlatform}
                </span>
              </Stack>
              <Stack>
                <TextField
                  label={"Año"}
                  onChange={(
                    ev: React.SyntheticEvent<HTMLElement, Event>,
                    year: string
                  ) => {
                    setYear(year);
                  }}
                  value={year ? year : ""}
                  autoAdjustHeight
                />
                <span
                  className={commonStyles.errorSpan}
                  style={{ display: errorYear ? "block" : "none" }}
                >
                  {errorYear}
                </span>
              </Stack>
              {props.admin && (
                <Stack>
                  <Stack>
                    <TextField
                      label={"ImagenUrl"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        imageUrl: string
                      ) => {
                        setImageUrl(imageUrl);
                      }}
                      value={imageUrl ? imageUrl : ""}
                      required={true}
                      autoAdjustHeight
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      label={"Géneros"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        genre: string
                      ) => {
                        setGenre(genre);
                      }}
                      value={genre ? genre : ""}
                      required={true}
                      autoAdjustHeight
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      label={"Director"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        director: string
                      ) => {
                        setDirector(director);
                      }}
                      value={director ? director : ""}
                      required={true}
                      autoAdjustHeight
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      label={"Actores principales"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        leading_actors: string
                      ) => {
                        setLeading_actors(leading_actors);
                      }}
                      value={leading_actors ? leading_actors : ""}
                      required={true}
                      autoAdjustHeight
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      label={"Tipo de contenido"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        content_type: string
                      ) => {
                        setContent_type(content_type);
                      }}
                      value={content_type ? content_type : ""}
                      required={true}
                      autoAdjustHeight
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      label={"Sinopsis"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        sinopsis: string
                      ) => {
                        setSinopsis(sinopsis);
                      }}
                      value={sinopsis ? sinopsis : ""}
                      required={true}
                      multiline
                      autoAdjustHeight
                    />
                  </Stack>
                </Stack>
              )}
              <Stack
                horizontal
                style={{ marginTop: "20px" }}
                horizontalAlign="space-around"
              >
                <Button
                  style={{
                    width: "20%",
                    border: "1px solid black",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onClick={async () => {
                    if (checkValues()) {
                      let suggest = {
                        year: year,
                        title: title,
                        sinopsis: sinopsis,
                        platform: platform,
                        director: director,
                        leading_cast: leading_actors,
                        genre: genre,
                        content_type: content_type,
                        image: imageUrl,
                      };
                      let TodoOk: boolean = await props.submit(suggest);
                      setOpen(false);
                    }
                  }}
                >
                  Enviar
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  style={{ width: "20%", border: "1px solid black" }}
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </div>
        </Box>
      </Modal>
    </>
  );
}
export default FormSugg;
