import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import Consts from "../Consts";
import commonStyles from "../common/common.module.scss";
import * as $ from "jquery";
import { Helmet } from "react-helmet";
import logo from "../images/logoproject.png"; // with import

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
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-select";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import ReactDOM from "react-dom";
import { Button, CircularProgress } from "@material-ui/core";

interface ILoginRegisterProps {
  submit: (userLogged: User) => Promise<boolean>;
}
var showErrors = false;
interface RegisterUser {
  name: string;
  surname: string;
  description: string;
  password: string;
  email: string;
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
  errorName: string;
  errorSurname: string;
  errorDesc: string;
  errorPass: string;
  errorEmail: string;
  errorConf: string;
}

export default class LoginRegister extends React.Component<
  ILoginRegisterProps,
  ILoginRegisterState
> {
  public userActual: RegisterUser;
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
      description: "",
      errorName: "",
      errorSurname: "",
      errorDesc: "",
      errorPass: "",
      errorEmail: "",
      errorConf: "",
    };
    initializeIcons();
  }

  public checkForm(submit?: boolean) {
    // Método para validar los campos del registro
    let allOK = true;
    if (showErrors) {
      if (this.state.name.trim()) {
        this.setState({ errorName: "" });
      } else {
        this.setState({ errorName: "Rellene este campo" });
        allOK = false;
      }
      if (this.state.surname.trim()) {
        this.setState({ errorSurname: "" });
      } else {
        this.setState({ errorSurname: "Rellene este campo" });
        allOK = false;
      }
      if (this.state.description.trim()) {
        this.setState({ errorDesc: "" });
      } else {
        this.setState({ errorDesc: "Rellene este campo" });
        allOK = false;
      }
      if (this.state.password.trim()) {
        this.setState({ errorPass: "" });
      } else {
        this.setState({ errorPass: "Rellene este campo" });
        allOK = false;
      }
      if (this.state.password === this.state.confpassword) {
        this.setState({ errorConf: "" });
      } else {
        this.setState({ errorConf: "Las contraseñas no coinciden" });
        allOK = false;
      }
      if (this.state.email.trim()) {
        this.setState({ errorEmail: "" });
      } else {
        this.setState({ errorEmail: "Rellene este campo" });
        allOK = false;
      }
    }
    if (submit) {
      return allOK;
    }
  }
  public componentDidMount() {
    showErrors = false;
  }
  public component;
  public componentDidUpdate(
    prevProps: Readonly<ILoginRegisterProps>,
    prevState: Readonly<ILoginRegisterState>,
    snapshot?: any
  ): void {
    if (this.state.loadingCambio) {
      setTimeout(() => {
        this.setState({
          loggin: !this.state.loggin,
          loadingCambio: false,
        });
      }, 1000);
    }
    if (
      prevState.name != this.state.name ||
      prevState.surname != this.state.surname ||
      prevState.description != this.state.description ||
      prevState.password != this.state.password ||
      prevState.confpassword != this.state.confpassword ||
      prevState.email != this.state.email
    ) {
      this.checkForm(false);
    }
  }
  public async login() {
    // Metodo para hacer login al usuario
    let content;
    let TodoOk: boolean;
    this.userActual = {
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      description: this.state.description,
      password: this.state.password,
    };

    const util = JSON.stringify(this.userActual);
    const contenido = await fetch(`http://localhost:8080/logUser.php`, {
      mode: "cors",
      method: "POST",
      body: util,
    });

    content = await contenido.json();
    if (content === "pwd") {
      this.setState({ errorPass: "Contraseña incorrecta" });
    } else {
      TodoOk = await this.props.submit(content);
    }
    if (TodoOk) {
    }
  }
  public async registerUser() {
    // Metodo para registro de usuarios
    // Construimos el json de usuario y lo mandamos al servidor
    this.userActual = {
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      description: this.state.description,
      password: this.state.password,
    };

    const util = JSON.stringify(this.userActual);
    const respuesta = await fetch(`http://localhost:8080/registerUser.php`, {
      mode: "cors",
      method: "POST",
      body: util,
    });
    const exitoso = await respuesta.json();
    this.setState({
      loadingCambio: true,
      loggin: true,
      email: "",
      password: "",
      errorEmail: "",
      errorPass: "",
      errorConf: "",
      errorDesc: "",
      errorName: "",
      errorSurname: "",
    });
  }

  render(): React.ReactElement<ILoginRegisterProps> {
    return (
      <div className={commonStyles.logginRgister}>
        <Helmet>
          <style>{"body { background-color: #ccc; }"}</style>
        </Helmet>
        <Stack style={{ marginTop: "10%" }} horizontalAlign="center">
          <Stack id="logoEmpresa" style={{}}>
            <img
              style={{
                objectFit: "cover",
                maxWidth: "335px",
              }}
              src={logo}
            ></img>
          </Stack>
          {this.state.loadingCambio ? (
            <div
              className={commonStyles.formLoggin}
              style={{ minHeight: "400px", padding: "150px" }}
            >
              <CircularProgress color="inherit" size="200px" />
            </div>
          ) : (
            <>
              {this.state.loggin && (
                <>
                  <Stack
                    padding={10}
                    horizontal
                    horizontalAlign="center"
                    style={{ width: "100%" }}
                    tokens={{ childrenGap: 10 }}
                  >
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
                        autoAdjustHeight
                      />
                      <span
                        className={commonStyles.errorSpan}
                        style={{
                          display: this.state.errorEmail ? "block" : "none",
                        }}
                      >
                        {this.state.errorEmail}
                      </span>
                      <span
                        className={commonStyles.errorSpan}
                        style={{
                          display: this.state.errorEmail ? "block" : "none",
                        }}
                      >
                        {this.state.errorEmail}
                      </span>
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
                        canRevealPassword
                      />
                      <span
                        className={commonStyles.errorSpan}
                        style={{
                          display: this.state.errorPass ? "block" : "none",
                        }}
                      >
                        {this.state.errorPass}
                      </span>
                      <Stack
                        tokens={{ childrenGap: 10 }}
                        grow={1}
                        horizontal
                        horizontalAlign="center"
                      >
                        <PrimaryButton
                          style={{
                            margin: "20px auto",
                          }}
                          text="Iniciar sesión"
                          onClick={async () => {
                            this.login();
                          }}
                          allowDisabledFocus
                        />
                      </Stack>
                    </div>
                  </Stack>
                </>
              )}
              {!this.state.loggin && (
                <>
                  <Stack
                    padding={10}
                    horizontal
                    horizontalAlign="center"
                    style={{ width: "100%" }}
                    tokens={{ childrenGap: 10 }}
                  >
                    <div className={commonStyles.formLoggin}>
                      <Stack>
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
                          autoAdjustHeight
                        />
                        <span
                          className={commonStyles.errorSpan}
                          style={{
                            display: this.state.errorName ? "block" : "none",
                          }}
                        >
                          {this.state.errorName}
                        </span>
                      </Stack>
                      <Stack>
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
                          autoAdjustHeight
                        />
                        <span
                          className={commonStyles.errorSpan}
                          style={{
                            display: this.state.errorSurname ? "block" : "none",
                          }}
                        >
                          {this.state.errorSurname}
                        </span>
                      </Stack>
                      <Stack>
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
                          value={
                            this.state.description ? this.state.description : ""
                          }
                          multiline
                          autoAdjustHeight
                        />
                        <span
                          className={commonStyles.errorSpan}
                          style={{
                            display: this.state.errorDesc ? "block" : "none",
                          }}
                        >
                          {this.state.errorDesc}
                        </span>
                      </Stack>

                      <Stack>
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
                          autoAdjustHeight
                        />
                        <span
                          className={commonStyles.errorSpan}
                          style={{
                            display: this.state.errorEmail ? "block" : "none",
                          }}
                        >
                          {this.state.errorEmail}
                        </span>
                      </Stack>
                      <Stack>
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
                          canRevealPassword
                        />
                        <span
                          className={commonStyles.errorSpan}
                          style={{
                            display: this.state.errorPass ? "block" : "none",
                          }}
                        >
                          {this.state.errorPass}
                        </span>
                      </Stack>
                      <Stack>
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
                          value={
                            this.state.confpassword
                              ? this.state.confpassword
                              : ""
                          }
                          canRevealPassword
                        />
                        <span
                          className={commonStyles.errorSpan}
                          style={{
                            display: this.state.errorConf ? "block" : "none",
                          }}
                        >
                          {this.state.errorConf}
                        </span>
                      </Stack>
                      <Stack
                        tokens={{ childrenGap: 10 }}
                        grow={1}
                        style={{
                          margin: "20px auto",
                        }}
                        horizontal
                        horizontalAlign="center"
                      >
                        <PrimaryButton
                          text="Registrarse"
                          onClick={async () => {
                            showErrors = true;
                            if (this.checkForm(true)) {
                              this.registerUser();
                              showErrors = false;
                            }
                          }}
                          allowDisabledFocus
                        />
                      </Stack>
                    </div>
                  </Stack>
                </>
              )}
            </>
          )}

          <Stack horizontal horizontalAlign="space-between">
            <Label>Registro</Label>
            <Toggle
              style={{ margin: "20px", marginTop: "7px" }}
              label=""
              defaultChecked
              onText=""
              offText=""
              onChange={(
                ev: React.MouseEvent<HTMLElement>,
                checked?: boolean
              ) => {
                this.setState({
                  loadingCambio: true,
                  email: "",
                  password: "",
                  description: "",
                  confpassword: "",
                  name: "",
                  surname: "",
                  errorConf: "",
                  errorDesc: "",
                  errorEmail: "",
                  errorName: "",
                  errorPass: "",
                  errorSurname: "",
                });
              }}
            />
            <Label>Inicio sesión</Label>
          </Stack>
        </Stack>
      </div>
    );
  }
}
