import React, { Component } from "react";

import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import { configureApi } from "./api/index";
import "./App.css";

import IndexScene from "./scene/IndexPageScene/index.jsx";
import MethodsScene from "./scene/method/MethodsPageScene/index.jsx";
import MethodPage from "./scene/method/MethodPageScene/index.jsx";
import NewMethodPage from "./scene/method/NewMethodPageScene/index.jsx";
import FieldsPage from "./scene/field/FieldsPageScene/index.jsx";
import NewFieldPage from "./scene/field/NewFieldPageScene/index.jsx";
import LoginPageScene from "./scene/LoginPageScene/index.jsx";

export const api = configureApi();

class App extends Component {
    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <div>
                <div>
                    <Switch onUpdate={() => window.scrollTo(0, 0)}>
                        <Route exact path='/' component={IndexScene}/>
                        <Route exact path='/methods' component={MethodsScene}/>
                        <Route exact path='/methods/new' component={NewMethodPage}/>
                        <Route exact path='/methods/:id' component={MethodPage}/>                        
                        <Route exact path='/fields' component={FieldsPage}/>
                        <Route exact path='/fields/new' component={NewFieldPage}/>
                        {/* <Route exact path='/offers/new/:id' component={NewFieldPage}/> */}
                        {/* <Route exact path='/offers/:id' component={OfferPage}/>
                        <Route exact path='/prices' component={PricesPageScene}/>
                        <Route exact path='/prices/new' component={NewPricePageScene}/>
                        <Route exact path='/prices/:id' component={PricePageScene}/> */}
                        <Route exact path='/auth/login' component={LoginPageScene}/>
                        {/* <Route exact path='/titles' component={TitlesPageScene}/>
                        <Route exact path='/titles/new' component={NewTitlePageScene}/>
                        <Route exact path='/titles/:id' component={TitlePageScene}/>
                        <Route exact path='/redStickers' component={RedStickersPageScene}/>
                        <Route exact path='/redStickers/new' component={NewRedStickerPageScene}/>
                        <Route exact path='/redStickers/:id' component={RedStickerPageScene}/>
                        <Route exact path='/icons' component={IconsPageScene}/>
                        <Route exact path='/icons/new' component={NewIconPageScene}/>
                        <Route exact path='/icons/:id' component={IconPageScene}/>
                        <Route exact path='/socialImages' component={SocialImagesPageScene}/>
                        <Route exact path='/socialImages/new' component={NewSocialImagePageScene}/>
                        <Route exact path='/socialImages/:id' component={SocialImagePageScene}/>
                        <Route exact path='/purchaseAdditionalDatas' component={PurchaseAdditionalDatasPageScene}/>
                        <Route exact path='/purchaseAdditionalDatas/new' component={NewPurchaseAdditionalDataPageScene}/>
                        <Route exact path='/purchaseAdditionalDatas/:id' component={PurchaseAdditionalDataPageScene}/>
                        <Route exact path='/backgrounds' component={BackGroundsPageScene}/>
                        <Route exact path='/backgrounds/new' component={NewBackGroundPageScene}/>
                        <Route exact path='/backgrounds/:id' component={BackGroundPageScene}/> */}
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
