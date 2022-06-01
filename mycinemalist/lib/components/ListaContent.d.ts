import React from "react";
import { Content } from "../common/Content";
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
interface IListaContentProps {
    dataContent: {
        [key: string]: Content;
    };
}
interface IListaContentState {
    isDataLoaded: boolean;
}
export default class ListaContent extends React.Component<IListaContentProps, IListaContentState> {
    userActual: any;
    tableContent: any;
    constructor(props: IListaContentProps, state: IListaContentState);
    componentDidMount(): void;
    component: any;
    componentDidUpdate(prevProps: Readonly<IListaContentProps>, prevState: Readonly<IListaContentState>, snapshot?: any): void;
    getUser(): Promise<any>;
    initContent(): Promise<void>;
    fillTableContent(): void;
    geticonoSiguiente(): string;
    geticonoAnterior(): string;
    renderButtons(ElementoDOM: any, col: any, ID: any): void;
    mountTableContent(): void;
    render(): React.ReactElement<IListaContentProps>;
}
export {};
