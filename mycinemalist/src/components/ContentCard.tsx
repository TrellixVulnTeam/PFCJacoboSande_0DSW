import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "office-ui-fabric-react";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-select";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import ReactDOM from "react-dom";

interface IContentCardProps {
  item: Content;
  details: (title) => void;
  changeFav: (title, pivot) => void;
}

interface IContentCardState {
  detailsVisible: boolean;
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
      detailsVisible: false,
    };
    initializeIcons();
  }

  public componentDidMount() {}
  public component;
  public componentDidUpdate(
    prevProps: Readonly<IContentCardProps>,
    prevState: Readonly<IContentCardState>,
    snapshot?: any
  ): void {}

  render(): React.ReactElement<IContentCardProps> {
    return (
      <>
        <div
          className={commonStyles.contentCard}
          style={{
            width: "18%",
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          <img
            style={{
              width: "100%",
              minHeight: "350px",
              objectFit: "cover",
              marginBottom: "-8px",
            }}
            src={this.props.item.image}
            alt=""
          />
          <hr />
          <Stack
            style={{ marginTop: "-15px", marginBottom: "-10px" }}
            horizontal
            horizontalAlign="center"
          >
            <IconButton
              iconProps={{ iconName: "Go" }}
              title="Abrir en nueva pestaña"
              ariaLabel="Abrir en nueva pestaña"
              disabled={false}
              checked={false}
              onClick={() => {
                this.props.details(this.props.item.title);
              }}
            />
            <IconButton
              iconProps={{
                iconName: this.props.item.isFav ? "HeartFill" : "Heart",
              }}
              title="Favorito"
              ariaLabel="Favorito"
              onClick={() => {
                this.props.changeFav(this.props.item.title, 1);
              }}
            />
          </Stack>
        </div>
      </>
    );
  }
}
