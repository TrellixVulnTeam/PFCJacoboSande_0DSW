import React from 'react';
import './App.css';
import { Content } from './common/Content';
interface IAppProps {
}
interface IAppState {
    isDataLoaded: boolean;
    isUserLogged: boolean;
}
export default class App extends React.Component<IAppProps, IAppState> {
    dataContent: {
        [key: string]: Content;
    };
    constructor(props: IAppProps, state: IAppState);
    componentDidMount(): void;
    initContent(): Promise<void>;
    private loggedUser;
    render(): JSX.Element;
}
export {};
