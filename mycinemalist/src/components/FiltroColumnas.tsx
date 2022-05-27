import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

import {
  PrimaryButton, IContextualMenuProps, IconButton, Label, TextField,  DialogFooter,  DialogContent,  Dropdown,  IDropdownOption,
  Toggle, Spinner, Stack, IContextualMenuItem, StackItem
} from 'office-ui-fabric-react';


import styles from '../common/common.module.scss';

export const customIcons = {
    
    cancel: {
        iconName: 'Cancel',
        styles: {
          root: { color: 'red' }
        }
    },
    accept: {
        iconName: 'Accept',
        styles: {
          root: { color: 'green' }
        }
      },
    acceptCierre: {
        iconName: 'LockSolid',
        styles: {
          root: { color: 'green' }
        }
      },
    search: {
        iconName: 'Search',
    },
    sp: {
        iconName: 'SharepointLogo',
    },
    teams: {
        iconName: 'TeamsLogo',
        styles: {
            root: { color: '#464775' }
          }
    },
    cerrar: {
        iconName: 'Lock',
        styles: {
          root: { color: 'black'}
        }
    },
    filter: {
        iconName: 'Filter'
    },
    filterSolid:  {
        iconName: 'FilterSolid'
    }
};

export interface IFiltroColumnasOpcion{
    Titulo:string;
    Seleccionable?:boolean;
    SubOpcion?:IFiltroColumnasOpcion[]
}

interface IFiltroColumnasProps {
    onchange: (FiltroSeleccionado: string) => void;
    Opciones: IFiltroColumnasOpcion[];
    Titulo: string;
    value?: string;
   
}

interface IFiltroColumnasState {
    textoFiltro: string;
}

export class FiltroColumnas extends React.Component<IFiltroColumnasProps, IFiltroColumnasState> {  


    public componentDidUpdate(prevProps:IFiltroColumnasProps,prevState:IFiltroColumnasState){

        if(prevProps.value != null && prevProps.value != this.props.value && prevProps.value != this.state.textoFiltro){

            this.setState({textoFiltro : ""});
        }
        if(prevState.textoFiltro != this.state.textoFiltro ){

            this.props.onchange(this.state.textoFiltro);
        }

        
    }

    constructor(props: IFiltroColumnasProps, state: IFiltroColumnasState) {
        super(props);
        this.state = {
            textoFiltro: ""
        };

    }

    public render():JSX.Element{


        var MenuProps:IContextualMenuProps = {
            items : this.props.Opciones.map((IFiltroColumnasOpcion:IFiltroColumnasOpcion) :IContextualMenuItem =>{
                var Properties:IContextualMenuItem = {  
                    key: IFiltroColumnasOpcion.Titulo,
                    text: IFiltroColumnasOpcion.Titulo,
                    onClick : () =>{

                        this.setState({textoFiltro:IFiltroColumnasOpcion.Titulo});
                    }
                }
                if(IFiltroColumnasOpcion.SubOpcion){
                    var SubMenu = {
                        items: IFiltroColumnasOpcion.SubOpcion.map((SubIFiltroColumnasOpcion:IFiltroColumnasOpcion):IContextualMenuItem =>{
                            let Properties = {
                                key:SubIFiltroColumnasOpcion.Titulo,
                                text:SubIFiltroColumnasOpcion.Titulo,
                                title:SubIFiltroColumnasOpcion.Titulo,
                                onClick : () =>{

                                    this.setState({textoFiltro:SubIFiltroColumnasOpcion.Titulo});
                                }
                            }
                            return Properties
                        })
                    }

                    Properties.subMenuProps = SubMenu;
                }
                
                
                return Properties;
            })
        };

        return ( 
               
            <Stack horizontal horizontalAlign={"center"} gap={5} verticalAlign={"center"} >  
                <Stack>
                    <PrimaryButton
                        text={this.props.Titulo}
                        className={styles.button}
                        iconProps={this.state.textoFiltro != "" ? customIcons.filterSolid : customIcons.filter }
                        menuProps={MenuProps}
                        allowDisabledFocus
                        checked={this.state.textoFiltro != ""}
                        />
                </Stack>
                <Stack>
                    {this.state.textoFiltro != "" && 
                        <Stack horizontal horizontalAlign={"center"} verticalAlign={"center"} className={styles.notificacion} >
                            {"Filtrando: "} {this.state.textoFiltro}

                            <IconButton iconProps={customIcons.cancel} allowDisabledFocus onClick={
                                () =>{
                                    this.setState({textoFiltro : ""});
                                }
                            }/>
                        </Stack>
                    }
                </Stack>
                
            </Stack>
        );
    }
  
}