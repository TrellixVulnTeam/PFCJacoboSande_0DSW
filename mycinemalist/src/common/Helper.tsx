import * as React from "react";

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

const filterIcon: IIconProps = { iconName: "Filter" };
const filterSolidIcon: IIconProps = { iconName: "FilterSolid" };



const addIcon: IIconProps = { iconName: "Add" };
interface IContextualClienteProps {
  disabled?: boolean;
  checked?: boolean;
  nuevaBolsa: ()=>void;
  nuevoRegistro:()=>void;
}
const examplePersona: IPersonaSharedProps = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  text: 'Annie Lindqvist',

};

interface IContextualClienteState {}

export class ContextualCliente extends React.Component<
  IContextualClienteProps,
  IContextualClienteState
> {
  constructor(props: IContextualClienteProps, state: IContextualClienteState) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    var MenuProps: IContextualMenuProps = {
      items: [
        {
          key: "Bolsa de horas",
          text: "Bolsa de horas",
          iconProps: { iconName: "AllCurrency" },
          onClick: () => {
            this.props.nuevaBolsa()
          }
        },
        {
          key: "Registro de aplicacion",
          text: "Registro de aplicación",
          iconProps: { iconName: "Puzzle" },
          onClick: () => {
            this.props.nuevoRegistro()
          }
        },
      ],
    };

    return (
      <DefaultButton
        // text="Nuevo"
        // iconProps={addIcon}
        menuProps={MenuProps}
        // onMenuClick={_onMenuClick}
        // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
        // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
        // persistMenu={true}
        allowDisabledFocus
        // disabled={disabled}
        // checked={checked}
      >
        <Persona
        {...examplePersona}
        text="Annie Lindqvist"
        size={PersonaSize.size32}
        hidePersonaDetails={false}
        imageAlt="Annie Lindqvist, status is online"
      />
      </DefaultButton>
    );
  }
}