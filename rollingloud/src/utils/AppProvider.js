import React from 'react';

import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/client';
import App from './../App';
import {BrowserRouter as Router} from 'react-router-dom';
import {persistCache} from 'apollo-cache-persist'
import CssBaseline from '@material-ui/core/CssBaseline';
import typeDefs from './../graphql/typeDefs/typeDefs';
import resolvers from './../graphql/resolvers/resolvers';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";
import {cartItemsVar} from './../components/button/cartbutton/cache/cart.cache'

const AppProvider = () => {
    const httplink = createUploadLink({
        uri:'https://polar-lake-80964.herokuapp.com/',
    });
    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });
    const cache = new InMemoryCache({
        typePolicies: {
            Query: {
              fields: {
                getCars: {
                  read() {
                    return cartItemsVar();  
                  }
                }
              }
            }
          }
    });
    (async () => {
        await persistCache({  
            cache,
            storage:window.localStorage
        })
    })()
    const client = new ApolloClient({
        link:authLink.concat(httplink),   
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


