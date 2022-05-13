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


interface IContentCardProps {
  item:Content;
}

interface IContentCardState {
}

export default class ContentCard extends React.Component<
  IContentCardProps,
  IContentCardState
> {

  public userActual;
  public tableContent;
  constructor(props: IContentCardProps, state: IContentCardState) {
    super(props);
    this.state = {
    };
    initializeIcons();

  }

  public componentDidMount() {
    console.log()
  }
public component
  public componentDidUpdate(
    prevProps: Readonly<IContentCardProps>,
    prevState: Readonly<IContentCardState>,
    snapshot?: any
  ): void { }



  render(): React.ReactElement<IContentCardProps> {

    return (
        <Stack style={{maxWidth:"24%",display:"flex",border:"1px solid black",padding:"10px"}}
        horizontal
        horizontalAlign="space-between" >
          <img  style={{maxWidth:"45%", objectFit: "cover"}}src={this.props.item.image}  alt="" />
          <Stack
          style={{maxWidth:"50%"}}>
          <span>{this.props.item.title}</span>
          <span>{this.props.item.genre}</span>
          <span>{this.props.item.year}</span>
          <span>{this.props.item.platform}</span>
          

          </Stack>
        </Stack>
      
    );
  }
}

