
import React from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import ListaContent from "./ListaContent";

import Consts from "../Consts";
import commonStyles from "../common/common.module.scss";
import * as $ from 'jquery';
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
} from "office-ui-fabric-react";
import "datatables.net";

import "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";


interface IMainComponentProps {
  // dataFromParent: [];
}

interface IMainComponentState {
  isDataLoaded: boolean;
}

export default class MainComponent extends React.Component<
  IMainComponentProps,
  IMainComponentState
> {
  public dataContent: {
    [key: string]: Content;
  } = {};
  public userActual;
  public tableContent;

  constructor(props: IMainComponentProps, state: IMainComponentState) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
    // initializeIcons();

  }

  public componentDidMount() {
    // this.props.dataFromParent.map((item: Content) => {
    //   var content = new Content(item);
    //   this.dataContent[content.title] = content;
    // });
    // this.getUser();
    this.initContent();
    // this.mountTableContent();
    // $('#ContentTable').DataTable();

  }
public component
  public componentDidUpdate(
    prevProps: Readonly<IMainComponentProps>,
    prevState: Readonly<IMainComponentState>,
    snapshot?: any
  ): void { }

  public async getUser() {
    let usuario;

    return usuario;
  }
  public async initContent() {
    console.log("init");
    let content;
    try {
      const respuesta = await fetch(`http://localhost:8080/getAllContent.php`, {
        mode: "cors",
      });
      content = await respuesta.json();
    } catch (error) {
      console.log(error);
      // Manage error codes
    }
    content.map((item) => {
      var content = new Content(item);
      this.dataContent[content.title] = content;
      return true;
    });

    console.log(content);

    this.setState({ isDataLoaded: true });
  }



  render(): React.ReactElement<IMainComponentProps> {

    return (
        <div>
        <Router location={""} navigator={undefined}>
        <div className="container mt-5">
          <div className="btn-group">
            <Link to="/listaContent" className="btn btn-dark me-2 border border-3 border-white rounded mt-2" >Inicio</Link>
            <Link to="/favorites" className="btn btn-dark me-2 border border-3 border-white rounded mt-2" >Mis favoritos</Link>
            <Link to="/suggestion" className="btn btn-dark me-2 border border-3 border-white rounded mt-2" >Sugerir</Link>
          </div>
          <hr />
          <Routes>
            <Route path="/listaContent" element={<ListaContent/>}/>
            <Route path="/favorites">
              {/* <Bla /> */}
            </Route>
            <Route path="/suggestion">
              {/* <User /> */}
            </Route>
          </Routes>
        </div>
      </Router>
      </div>
    );
  }
}

