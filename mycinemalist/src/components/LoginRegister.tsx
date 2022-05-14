import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import Consts from "../Consts";
import commonStyles from "../common/common.module.scss";
import * as $ from 'jquery';
import { Helmet } from "react-helmet";
import logo from '../images/logoproject.png'; // with import



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
  StackItem,
  Toggle,
  DefaultButton,
} from "office-ui-fabric-react";
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import ReactDOM from "react-dom";
import { Button, CircularProgress } from "@material-ui/core";


interface ILoginRegisterProps {
  submit: (
    userLogged: User
  ) => Promise<boolean>;
}

interface ILoginRegisterState {
  email: string;
  password: string;
  loggin: boolean;
  loadingCambio: boolean;
  confpassword: string;
  name: string;
  surname: string;
  description: string;
}

export default class LoginRegister extends React.Component<
  ILoginRegisterProps,
  ILoginRegisterState
> {

  public userActual;
  public tableContent;
  constructor(props: ILoginRegisterProps, state: ILoginRegisterState) {
    super(props);
    this.state = {
      email: "",
      loggin: true,
      password: "",
      confpassword: "",
      name: "",
      loadingCambio: false,
      surname: "",
      description: ""
    };
    initializeIcons();

  }

  public componentDidMount() {


  }
  public component
  public componentDidUpdate(
    prevProps: Readonly<ILoginRegisterProps>,
    prevState: Readonly<ILoginRegisterState>,
    snapshot?: any
  ): void {

    if (this.state.loadingCambio) {
      setTimeout(() => {
        this.setState({
          loggin: !this.state.loggin,
          loadingCambio: false
        })
      }, 1000);
    }
  }


  render(): React.ReactElement<ILoginRegisterProps> {

    return (
      <div
        className={commonStyles.logginRgister}
      >
        <Helmet>
          <style>{'body { background-color: #ccc; }'}</style>
        </Helmet>
        <Stack
          style={{ marginTop: "10%" }}

          horizontalAlign="center">
          <Stack id="logoEmpresa"

            style={{}}>
            <img
              style={{
                objectFit: "cover",
                maxWidth: "335px"
              }}
              src={logo}

            ></img>
          </Stack>
          {this.state.loadingCambio ? (
            <div className={commonStyles.formLoggin}
              style={{ minHeight: "400px", padding: "150px" }}>
              <CircularProgress color="inherit" size="200px" />
            </div>
          ) : (
            <>
              {this.state.loggin &&
                <><Stack padding={10}
                  horizontal
                  horizontalAlign="center"
                  style={{ width: "100%" }}
                  tokens={{ childrenGap: 10 }}>
                  <div className={commonStyles.formLoggin}>
                    <TextField
                      label={"Email"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        email: string
                      ) => {
                        this.setState({ email: email });
                      }}
                      value={this.state.email ? this.state.email : ""}
                      required={true}
                      autoAdjustHeight />
                    {/* <span
         className={commonStyles.errorEmail}
         style={{ display: this.state.errorEmail ? "block" : "none" }}
       >
         {this.state.errorEmail}
       </span> */}
                    <TextField
                      label="Contraseña"
                      type="password"
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        password: string
                      ) => {
                        this.setState({ password: password });
                      }}
                      required={true}

                      value={this.state.password ? this.state.password : ""}
                      canRevealPassword />
                    <Stack
                      tokens={{ childrenGap: 10 }}
                      grow={1}
                      horizontal
                      horizontalAlign="center"
                    >
                      <PrimaryButton
                        style={{
                          margin: "20px auto"
                        }}
                        text="Iniciar sesión"
                        onClick={async () => {

                        }}
                        allowDisabledFocus
                      />
                    </Stack>
                  </div>
                </Stack></>}
              {!this.state.loggin &&
                <><Stack padding={10}
                  horizontal
                  horizontalAlign="center"
                  style={{ width: "100%" }}
                  tokens={{ childrenGap: 10 }}>
                  <div className={commonStyles.formLoggin}>
                    <TextField
                      label={"Nombre"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        name: string
                      ) => {
                        this.setState({ name: name });
                      }}
                      value={this.state.name ? this.state.name : ""}
                      required={true}
                      autoAdjustHeight />
                    <TextField
                      label={"Apellidos"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        surname: string
                      ) => {
                        this.setState({ surname: surname });
                      }}
                      value={this.state.surname ? this.state.surname : ""}
                      required={true}
                      autoAdjustHeight />
                    <TextField
                      label={"Descripcion"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        description: string
                      ) => {
                        this.setState({
                          description: description,
                        });
                      }}
                      value={this.state.description ? this.state.description : ""}
                      multiline
                      autoAdjustHeight
                    />
                    <Label>Imagen de perfil</Label>
                    <Button
                      variant="contained"
                      component="label"
                      style={{ margin: "1px" }}
                    >
                      <input
                        type="file"
                        style={{ padding: "10px" }}
                      />
                    </Button>
                    <TextField
                      label={"Email"}
                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        email: string
                      ) => {
                        this.setState({ email: email });
                      }}
                      value={this.state.email ? this.state.email : ""}
                      required={true}
                      autoAdjustHeight />
                    {/* <span
         className={commonStyles.errorEmail}
         style={{ display: this.state.errorEmail ? "block" : "none" }}
       >
         {this.state.errorEmail}
       </span> */}
                    <TextField
                      label="Contraseña"
                      type="password"
                      required={true}

                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        password: string
                      ) => {
                        this.setState({ password: password });
                      }}
                      value={this.state.password ? this.state.password : ""}
                      canRevealPassword />
                    <TextField
                      label="Confirmar contraseña"
                      type="password"
                      required={true}

                      onChange={(
                        ev: React.SyntheticEvent<HTMLElement, Event>,
                        confpassword: string
                      ) => {
                        this.setState({ confpassword: confpassword });
                      }}
                      value={this.state.confpassword ? this.state.confpassword : ""}
                      canRevealPassword />
                    <Stack
                      tokens={{ childrenGap: 10 }}
                      grow={1}
                      style={{
                        margin: "20px auto"
                      }}
                      horizontal
                      horizontalAlign="center"
                    >
                      <PrimaryButton
                        text="Registrarse"
                        onClick={async () => {

                        }}
                        allowDisabledFocus
                      />
                    </Stack>
                  </div>
                </Stack></>}</>
          )}

          <Stack
            horizontal
            horizontalAlign="space-between"
          >
            <Label>Registro</Label>
            <Toggle
              style={{ margin: "20px", marginTop: "7px" }}
              label="" defaultChecked onText="" offText="" onChange={(
                ev: React.MouseEvent<HTMLElement>, checked?: boolean
              ) => {
                this.setState({ loadingCambio: true })

              }} />
            <Label>Inicio sesión</Label>
          </Stack>
        </Stack>
      </div>
    );
  }
}

