import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../common/User';
import { Content } from '../common/Content';
import { Icon } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Consts from '../Consts';

interface IListaContentProps {

}

interface IListaContentState {
    isDataLoaded: boolean;
}

export default class ListaContent extends React.Component<IListaContentProps, IListaContentState>  {
    public dataContent: {
        [key: string]: Content;
    } = {};
    public userActual: User | undefined;

    constructor(props: IListaContentProps, state: IListaContentState) {
        super(props);
        this.state = {
            isDataLoaded: false,
        };
    }

    public componentDidMount() {

        this.getUser();


        this.initContent();
        // this.mountTableContent();
    }
    public componentDidUpdate(prevProps: Readonly<IListaContentProps>, prevState: Readonly<IListaContentState>, snapshot?: any): void {



    }

    public geticonoSiguiente() {
        // return `<i class="${getIconClassName("ChevronRightSmall")}" />`;
        return <ArrowForwardIosIcon />;
    }
    public geticonoAnterior() {
        // return `<i class="${getIconClassName("ChevronLeftSmall")}" />`;
        return <ArrowBackIosIcon />;

    }

    public async getUser() {
        let usuario;

        return usuario
    }
    public async initContent() {
        let content;
        try {
            const respuesta = await fetch(`http://localhost:8080/getAllContent.php`, {
                mode: 'cors',
            });
            content = await respuesta.json();
        } catch (error) {
            console.log(error)
            // Manage error codes
        }
        content.map((item: any) => {
            var content = new Content(item);
            this.dataContent[content.title] = content;
        });

        console.log(content);

        // this.fillContentTable();
        this.setState({ isDataLoaded: true });
    }




    render() {
        return (

            <h2>hola</h2>
        );
    }
}

