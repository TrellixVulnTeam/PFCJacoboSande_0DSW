import React from "react";
import { Content } from "../common/Content";
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
interface IContentCardProps {
    item: Content;
}
interface IContentCardState {
}
export default class ContentCard extends React.Component<IContentCardProps, IContentCardState> {
    userActual: any;
    tableContent: any;
    constructor(props: IContentCardProps, state: IContentCardState);
    componentDidMount(): void;
    component: any;
    componentDidUpdate(prevProps: Readonly<IContentCardProps>, prevState: Readonly<IContentCardState>, snapshot?: any): void;
    render(): React.ReactElement<IContentCardProps>;
}
export {};
