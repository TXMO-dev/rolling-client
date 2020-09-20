import React from 'react';
import {Route,Switch} from 'react-router-dom';
import MyProfileComponent from './auth_user/getme.component';
import UserProfile from './user/getuser.component';
import MiniDrawer from './../../components/drawer/drawer.component';

const ProfileComponent = ({match}) => {

    return (
        <div>
        {/*<MiniDrawer {...match}/>*/}
            <Switch>
                <Route exact path={`${match.url}`} component={MyProfileComponent} />
                <Route path = {`${match.url}/:userId`} component={UserProfile} />   
            </Switch>
        </div>
    )
}

export default ProfileComponent;