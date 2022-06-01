import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
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
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import ReactDOM from "react-dom";


interface IListaContentProps {
  
}

interface IListaContentState {
}

export default class ListaContent extends React.Component<
  IListaContentProps,
  IListaContentState
> {

  public userActual;
  public tableContent;
  constructor(props: IListaContentProps, state: IListaContentState) {
    super(props);
    this.state = {
    };
    initializeIcons();

  }

  public componentDidMount() {
    

  }
public component
  public componentDidUpdate(
    prevProps: Readonly<IListaContentProps>,
    prevState: Readonly<IListaContentState>,
    snapshot?: any
  ): void { }



  render(): React.ReactElement<IListaContentProps> {

    return (
        <h2>hola</h2>
    );
  }
}

