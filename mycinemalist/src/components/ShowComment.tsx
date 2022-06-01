import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import Consts from "../Consts";
import commonStyles from "../common/common.module.scss";
import * as $ from 'jquery';
import emptypicture from "../images/notpicture.png"

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
    Persona,
    IPersonaSharedProps,
    PersonaSize,
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



function ShowComment(props) {

    // const [rating, setRating] = useState(props.location.state.item.rating);

    const [user, setUser] = useState(props.users[props.item.user_id]);



  
    if (props.content_id != props.item.content_id)
        return (<></>);


    return (

        <>
            <div
                className={commonStyles.contentCard}
                style={{ width: "100%", minHeight:"100px", padding: "5px",marginBottom:"20px" }}

            >
                <Stack
                    horizontal
                    horizontalAlign="space-between"
                >
                    <div
                        style={{ width: "15%", padding: "5px" }}
                    >

                        {/* AÑADIR PERSONA O PARA MOSTRAR EL USUARIO, FOTO REDONDA Y NOMBRE CON CLICK PROPS.CLICKUSER(ID) */}
                        <DefaultButton
                            style={{ width: "100%",height:"100%",border:"0px",margin:"2px auto"}}
                            onClick={() => {
                                props.clickUser(user.id);
                            }}>
                                <Stack
                                verticalAlign="center"
                                horizontalAlign="center">

                                {/* <div> */}
                                <img  style={{height:"30px",width:"30px",borderRadius:"100%",display:"block",marginBottom:"10px"} }src={user.profileImage?user.profileImage:emptypicture} alt="" />

                                {/* </div> */}
                                <div>
                                <p>{user.name+" "+user.surname}</p>

                                </div>
                                </Stack>

                        </DefaultButton>

                    </div>
                    <div
                        style={{ width: "65%", padding: "10px",marginTop:"5px",border:"1px solid #ccc",borderRadius:"5px"}}

                    >
                        {props.item.comment}
                    </div>
                    <div
                        style={{ width: "15%",marginTop:"30px" }}
                    >
                        <Rating
                            min={0}
                            max={5}
                            size={RatingSize.Large}
                            rating={props.item.rating}

                            readOnly
                            // value={2}

                            ariaLabelFormat="{0} of {1} stars"
                        />

                    </div>


                </Stack>
            </div>

        </>

    );
}


export default ShowComment;