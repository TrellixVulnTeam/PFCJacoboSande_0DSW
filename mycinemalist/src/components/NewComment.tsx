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
  RatingSize,
  DefaultButton,
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

function NewComment(props) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <>
      <div
        className={commonStyles.contentCard}
        style={{ width: "100%", marginBottom: "15px" }}
      >
        <Stack horizontal horizontalAlign="space-between">
          <div style={{ width: "80%", padding: "5px" }}>
            <TextField
              placeholder="Añadir nuevo comentario..."
              style={{ minHeight: "70px" }}
              onChange={(
                ev: React.SyntheticEvent<HTMLElement, Event>,
                comment: string
              ) => {
                setComment(comment);
              }}
              label=""
              multiline
              autoAdjustHeight
            />
          </div>
          <div style={{ width: "15%" }}>
            <Rating
              min={0}
              max={5}
              size={RatingSize.Large}
              onChange={(
                event: React.FormEvent<HTMLElement>,
                ratingval?: number
              ) => {
                setRating(ratingval);
              }}
              ariaLabelFormat="{0} of {1} stars"
            />
            <PrimaryButton
              style={{ width: "70%" }}
              onClick={() => {
                props.submit(comment, rating);
              }}
            >
              Enviar
            </PrimaryButton>
          </div>
        </Stack>
      </div>
    </>
  );
}
export default NewComment;
