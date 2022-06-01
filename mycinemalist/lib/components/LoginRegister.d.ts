import React from "react";
import { User } from "../common/User";
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
interface ILoginRegisterProps {
    submit: (userLogged: User) => Promise<boolean>;
}
interface ILoginRegisterState {
    email: string;
    password: string;
    loggin: boolean;
    loadingCambio: boolean;
    confpassword: string;
    name: string;
    surname: string;
    description: string;
    errorName: string;
    errorSurname: string;
    errorDesc: string;
    errorPass: string;
    errorEmail: string;
    errorConf: string;
}
export default class LoginRegister extends React.Component<ILoginRegisterProps, ILoginRegisterState> {
    userActual: any;
    tableContent: any;
    constructor(props: ILoginRegisterProps, state: ILoginRegisterState);
    checkForm(submit?: boolean): boolean;
    componentDidMount(): void;
    component: any;
    componentDidUpdate(prevProps: Readonly<ILoginRegisterProps>, prevState: Readonly<ILoginRegisterState>, snapshot?: any): void;
    render(): React.ReactElement<ILoginRegisterProps>;
}
export {};
