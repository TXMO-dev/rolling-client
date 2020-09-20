import React from 'react';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/client';
import App from './../App';
import {BrowserRouter as Router} from 'react-router-dom';
import {persistCache} from 'apollo-cache-persist'
import CssBaseline from '@material-ui/core/CssBaseline';
import typeDefs from './../graphql/typeDefs/typeDefs';
import resolvers from './../graphql/resolvers/resolvers';

const AppProvider = () => {
    const link = new createHttpLink({
        uri:'http://localhost:5000/',
        headers:{
            authorization: localStorage.getItem('token')
        }
    });
    
    const cache = new InMemoryCache();
    (async () => {
        await persistCache({  
            cache,
            storage:window.localStorage
        })
    })()
    const client = new ApolloClient({
        link,
        cache,
        typeDefs,
        resolvers
    })
    client.writeData({   
        data:{
            isLoggedin:!!localStorage.getItem('token'),  
        }      
    })
    return (
        <ApolloProvider client={client}>
            <React.Fragment>
                <CssBaseline/>
                <Router>
                    <App/>
                </Router>
            </React.Fragment>
        </ApolloProvider>
    )
};

export default AppProvider;


