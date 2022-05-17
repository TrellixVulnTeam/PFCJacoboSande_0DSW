import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    Rating,
} from "office-ui-fabric-react";
import { Helmet } from "react-helmet";

import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import ReactDOM from "react-dom";
import ContentCard from "./ContentCard";
import { getLeadingCommentRanges } from "typescript";
import { common } from "@material-ui/core/colors";
import NewComment from "./NewComment";



function Detail(props) {

    const [rating, setRating] = useState(props.location.state.item.rating);



    return (
        <>
            <Stack
                horizontal
                horizontalAlign="space-evenly"
                style={{ width: "90%", margin: "0 auto" }}
            >
                <div
                    style={{ padding: "30px", width: "30%", border: "1px solid black", margin: "5px" }}
                    className={commonStyles.contentCard}>
                    <img style={{ width: "100%", minHeight: "350px", objectFit: "cover", display: "block" }} src={props.location.state.item.image} alt="" />
                    <Stack
                        horizontal
                        horizontalAlign="center"
                        style={{ marginTop: "30px" }}
                    >
                        <Rating
                            min={0}
                            max={5}
                            rating={rating}
                            readOnly
                            ariaLabelFormat="{0} of {1} stars"
                        />
                    </Stack>
                </div>
                <div
                    style={{ padding: "30px", width: "70%", border: "1px solid black", margin: "5px" }}
                    className={commonStyles.contentCard}>
                    <span style={{ display: "block", marginBottom: "15px" }}>
                        <span className={commonStyles.detailLabel}>Título:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.title}</span>
                        <span className={commonStyles.detailLabel}>Plataforma:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.platform}</span>
                    </span>
                    <hr />
                    <span style={{ display: "block", marginBottom: "15px" }}>
                        <span className={commonStyles.detailLabel}>Géneros:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.genre}</span>
                        <span className={commonStyles.detailLabel}>Año:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.year}</span>
                    </span>
                    <hr />

                    <span style={{ display: "block", marginBottom: "15px" }}>
                        <span className={commonStyles.detailLabel}>Director:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.director}</span>
                        <span className={commonStyles.detailLabel}>Tipo de contenido:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.content_type}</span>
                    </span>
                    <hr />
                    <span style={{ display: "block", marginBottom: "15px" }}>
                        <span className={commonStyles.detailLabel}>Actores principales:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.leading_cast}</span>
                    </span>
                    <hr />
                    <span style={{ display: "block" }}>
                        <span className={commonStyles.detailLabel}>Sinopsis:</span> <span className={commonStyles.detailField}>{" " + props.location.state.item.sinopsis}</span>
                    </span>
                </div>


            </Stack>

            <Stack

                style={{ width: "90%", margin: "0 auto", marginTop: "30px" }}
            >
                <h2>Comentarios</h2>

                <div
                    style={{ padding: "30px", width: "100%", border: "1px solid black", margin: "5px" }}
                    className={commonStyles.contentCard}
                >
                    <NewComment submit={(title, rating) => {
                        props.submit(title, rating);
                    }} />
                </div>
            </Stack>


        </>


    );
}


export default Detail;
