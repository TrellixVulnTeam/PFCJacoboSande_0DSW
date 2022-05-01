import React from 'react';
import { Link } from 'react-router-dom';
import Consts from '../Consts';
class ListaContent extends React.Component {
    constructor(props:any) {
        super(props);
        this.state = {
            content: [],
        };
    }
    async componentDidMount() {
        let content;
        try {
            const respuesta = await fetch(`http://localhost:8080/getAllContent.php`,{
                mode:'cors',
            });
             content = await respuesta.json();
        } catch (error) {
            console.log(error)
        }
       
        this.setState({
            content: content,
        });
        console.log(content);
    }


    render() {
        return (
            <><h2 className='text-white'>hola</h2></>
        );
    }
}

export default ListaContent;