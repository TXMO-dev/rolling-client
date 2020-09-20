import React from 'react';
import {Redirect, Route,Switch} from 'react-router-dom';
import FeedComponent from './../../components/Feed/feed.component';
import FollowingComponent from './../../components/following/following.component';
import FollowersComponent from './../../components/followers/followers.component';
import SettingsComponent from './../../components/settings/settings.component';
import PostComponent from '../../components/posts/post.component';
import ProfileComponent from './../../components/profile/profile.component';
import LikesComponent from './../../components/likes/likes.components';
import RecommendationComponent from './../../components/recommendations/recommendations.component';  
import MiniDrawer from './../../components/drawer/drawer.component';
import CartComponent from './../../components/cart/cart.component';  
import CarComponent from './../../components/car/car.components'; 
import CreatePostComponent from './../../components/posts/createpost.component';


const Dashboard = (props) => {
    return(
        <div>
            <MiniDrawer {...props}/>
            <Switch>
                <Route exact path={`${props.match.url}`} component = {FeedComponent} />
                <Route path={`${props.match.url}/settings`} component = {SettingsComponent} />
                <Route path={`${props.match.url}/profile`} component = {ProfileComponent} />
                {/* feed will follow in that order */}
                <Route path={`${props.match.url}/likes`} component = {LikesComponent} />
                <Route path={`${props.match.url}/following`} component = {FollowingComponent} />
                <Route path={`${props.match.url}/createPost`} component = {CreatePostComponent} />
                <Route path={`${props.match.url}/followers`} component = {FollowersComponent} />
                <Route path={`${props.match.url}/car/:carId`} component = {CarComponent} />
                <Route path={`${props.match.url}/mycars`} component = {PostComponent} />
                <Route path={`${props.match.url}/recommendations`} component = {RecommendationComponent} /> {/* recommendation is the get use by tags */}
                <Route path={`${props.match.url}/cart`} component = {CartComponent} />
                <Route path={`${props.match.url}/logout`} /> 
            </Switch>
        </div>
    )
}

export default Dashboard;