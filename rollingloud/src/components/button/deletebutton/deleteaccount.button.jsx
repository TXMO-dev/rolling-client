import React from 'react';
import {useMutation,useApolloClient} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlineSharp';  
const IS_LOGGED_IN = gql`
{
    isLoggedin @client
}
`


const DeleteButton = ({delete_post:{history}}) => {
    const client = useApolloClient();
    const [deleteAccount] = useMutation(DELETE_ACCOUNT,{
        update(_,__){
            localStorage.removeItem('token')
            const {isLoggedin} = client.readQuery({
                query:IS_LOGGED_IN
            })
            client.writeQuery({
                query:IS_LOGGED_IN,
                data:{isLoggedin:!isLoggedin}
            })
            history.push('/');
        },
        onerror(e){
            alert(`${e}`)
        },
        onCompleted(){

        }
    })
    return (
        <IconButton><DeleteIcon onClick = {() => {deleteAccount()}} color="secondary"/></IconButton>   
    )
}

export default DeleteButton;

const DELETE_ACCOUNT = gql`
    mutation{
        deleteAccount{
            id
            email
            username
        }
    }
`;