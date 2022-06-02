import React, { useEffect, useState } from "react";
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
  DefaultButton,
  Panel,
  PanelType,
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
import NewComment from "./NewComment";
import emptypicture from "../images/notpicture.png";
import { Button } from "@material-ui/core";

function Profile(props) {
  // const [rating, setRating] = useState(props.location.state.item.rating);

  const buttonStyles = { root: { marginRight: 8 } };

  const [isOpen, setIsOpen] = useState(false);
  const [sameUser, setSameUser] = useState(
    window.localStorage.getItem("id") ===
      props.location.state.user.id.toString()
  );
  const [name, setName] = useState(props.location.state.user.name);
  const [surname, setSurname] = useState(props.location.state.user.surname);
  const [description, setDescription] = useState(
    props.location.state.user.description
  );
  const [image, setImage] = useState(props.location.state.user.profileImage);

  useEffect(() => {}, [description]);
  const onRenderFooterContent = (
    <div>
      <PrimaryButton
        onClick={() => {
          setTimeout(() => {
            props.updateProfile(
              name,
              surname,
              description,
              image,
              props.location.state.user.id
            );
            setName(name);
            setDescription(description);
            setSurname(surname);
            setIsOpen(false);
          }, 500);
        }}
        styles={buttonStyles}
      >
        Guardar
      </PrimaryButton>
      <DefaultButton
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Cancelar
      </DefaultButton>
    </div>
  );

  const checkValues = () => {
    return true;
  };
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
          {/* */}
          {/* Probamos imagen vacía o si nos deja subir foto guay */}
          <img
            style={{
              width: "100%",
              minHeight: "350px",
              objectFit: "cover",
              display: "block",
            }}
            src={
              props.location.state.user.profileImage
                ? props.location.state.user.profileImage
                : emptypicture
            }
            alt=""
          />
          <Stack
            horizontal
            horizontalAlign="center"
            style={{ marginTop: "30px" }}
          >
            {/* media de rating y numero comentarios? */}
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
            <h3>
              {props.location.state.user.name +
                " " +
                props.location.state.user.surname}
            </h3>
          </span>
          <hr />
          <span style={{ display: "block", marginBottom: "15px" }}>
            <span className={commonStyles.detailLabel}>Descripción:</span>{" "}
            <span className={commonStyles.detailField}>
              {" " + props.location.state.user.description}
            </span>
          </span>
          <hr />

          {/* if is same user boton de edición y abrimos el panel */}
          {sameUser && (
            <div>
              <DefaultButton
                text="Editar perfil"
                onClick={() => {
                  setIsOpen(true);
                }}
              />
              <Panel
                isOpen={isOpen}
                onDismiss={() => {
                  setIsOpen(false);
                }}
                headerText="Editar perifl"
                closeButtonAriaLabel="Close"
                type={PanelType.medium}
                onRenderFooterContent={() => {
                  return onRenderFooterContent;
                }}
                // Stretch panel content to fill the available height so the footer is positioned
                // at the bottom of the page
                isFooterAtBottom={true}
              >
                <Stack>
                  <Stack>
                    <TextField
                      label={"Nombre"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        name: string
                      ) => {
                        setName(name);
                      }}
                      value={name ? name : ""}
                      required={true}
                      autoAdjustHeight
                    />
                    {/* <span
                                            className={commonStyles.errorSpan}
                                            style={{ display: this.state.errorName ? "block" : "none" }}
                                        >
                                            {this.state.errorName}
                                        </span> */}
                  </Stack>
                  <Stack>
                    <TextField
                      label={"Apellidos"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        surname: string
                      ) => {
                        setSurname(surname);
                      }}
                      value={surname ? surname : ""}
                      required={true}
                      autoAdjustHeight
                    />
                    {/* <span
                                            className={commonStyles.errorSpan}
                                            style={{ display: this.state.errorSurname ? "block" : "none" }}
                                        >
                                            {this.state.errorSurname}
                                        </span> */}
                  </Stack>
                  <Stack>
                    <TextField
                      label={"Descripcion"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        description: string
                      ) => {
                        setDescription(description);
                      }}
                      value={description ? description : ""}
                      multiline
                      autoAdjustHeight
                    />
                    {/* <span
                                            className={commonStyles.errorSpan}
                                            style={{ display: this.state.errorDesc ? "block" : "none" }}
                                        >
                                            {this.state.errorDesc}
                                        </span> */}
                  </Stack>
                  {/* <Label>Imagen de perfil</Label>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{ margin: "1px" }}
                                    >
                                        <input
                                            type="file"
                                            style={{ padding: "10px" }}
                                        />
                                    </Button> */}
                </Stack>
              </Panel>
            </div>
          )}
        </div>
      </Stack>
    </>
  );
}

export default Profile;
