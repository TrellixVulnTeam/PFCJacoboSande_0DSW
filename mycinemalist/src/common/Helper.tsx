import * as React from "react";
import emptypicture from "../images/notpicture.png"
import {
  PrimaryButton,
  IContextualMenuProps,
  ContextualMenu,
  IconButton,
  IIconProps,
  Label,
  TextField,
  DialogFooter,
  DialogContent,
  Dropdown,
  IDropdownOption,
  Checkbox,
  Toggle,
  Spinner,
  Icon,
  Stack,
  TooltipHost,
  Callout,
  Slider,
  SpinnerSize,
  DatePicker,
  FontIcon,
  DefaultButton,
  IContextualMenuItem,
  IPersonaSharedProps,
  PersonaSize,
  Persona,
} from "office-ui-fabric-react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import { Moment, now } from "moment";
import "moment/locale/es";

import styles from "./common.module.scss";
import * as moment from "moment";
import { TestImages } from "@fluentui/example-data";
import { User } from "./User";

const filterIcon: IIconProps = { iconName: "Filter" };
const filterSolidIcon: IIconProps = { iconName: "FilterSolid" };



const addIcon: IIconProps = { iconName: "Add" };
interface IContextualClienteProps {
  disabled?: boolean;
  user:User;
  checked?: boolean;
  goConfig: ()=>void;
  goLogout:()=>void;
}

interface IContextualClienteState {}

export class ContextualCliente extends React.Component<
  IContextualClienteProps,
  IContextualClienteState
> {
  constructor(props: IContextualClienteProps, state: IContextualClienteState) {
    super(props);
    this.state = {};
  }
   persona: IPersonaSharedProps = {
    imageUrl: this.props.user.profileImage?this.props.user.profileImage:emptypicture,
    imageInitials: '',
    text: ""+this.props.user.name+" "+this.props.user.surname ,
  
  };
  
  public render(): JSX.Element {
    var MenuProps: IContextualMenuProps = {
      items: [
        {
          key: "Configuracion",
          text: "Configuración",
          iconProps: { iconName: "Settings" },
          onClick: () => {
            this.props.goConfig()
          }
        },
        {
          key: "Logout",
          text: "Logout",
          iconProps: { iconName: "UserRemove" },
          onClick: () => {
            this.props.goLogout()
          }
        },
      ],
    };

    return (
      <DefaultButton
        // text="Nuevo"
        // iconProps={addIcon}
        menuProps={MenuProps}
        style={{height:"40px"}}
        // onMenuClick={_onMenuClick}
        // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
        // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
        // persistMenu={true}
        allowDisabledFocus
        // disabled={disabled}
        // checked={checked}
      >
        <Persona
        {...this.persona}
        text={""+this.props.user.name+" "+this.props.user.surname }
        size={PersonaSize.size32}
        hidePersonaDetails={false}
        imageAlt={this.props.user.name}
      />
      </DefaultButton>
    );
  }
}