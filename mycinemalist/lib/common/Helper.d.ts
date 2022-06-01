import * as React from "react";
import "moment/locale/es";
interface IContextualClienteProps {
    disabled?: boolean;
    checked?: boolean;
    nuevaBolsa: () => void;
    nuevoRegistro: () => void;
}
interface IContextualClienteState {
}
export declare class ContextualCliente extends React.Component<IContextualClienteProps, IContextualClienteState> {
    constructor(props: IContextualClienteProps, state: IContextualClienteState);
    render(): JSX.Element;
}
export {};
