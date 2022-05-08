import React from "react";
import { User } from "../common/User";
import { Content } from "../common/Content";
interface IListaContentProps {
    dataFromParent: [];
}
interface IListaContentState {
    isDataLoaded: boolean;
}
export default class ListaContent extends React.Component<IListaContentProps, IListaContentState> {
    dataContent: {
        [key: string]: Content;
    };
    userActual: User | undefined;
    tableContent: any;
    constructor(props: IListaContentProps, state: IListaContentState);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<IListaContentProps>, prevState: Readonly<IListaContentState>, snapshot?: any): void;
    getUser(): Promise<any>;
    initContent(): Promise<void>;
    fillTableContent(): void;
    geticonoSiguiente(): string;
    geticonoAnterior(): string;
    mountTableContent(): void;
    render(): JSX.Element;
}
export {};
