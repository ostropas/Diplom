import React, { Component } from "react";

import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import { configureApi } from "./api/index";
import "./App.css";

import IndexScene from "./scene/IndexPageScene/index.jsx";
import PlayersScene from "./scene/player/PlayersPageScene/index.jsx";
import PlayerPage from "./scene/player/PlayerPageScene/index.jsx";
import OffersPage from "./scene/offer/OffersPageScene/index.jsx";
import OfferPage from "./scene/offer/OfferPageScene/index.jsx";
import NewOfferPage from "./scene/offer/NewOfferPageScene/index.jsx";
import PricesPageScene from "./scene/price/PricesPageScene/index.jsx";
import PricePageScene from "./scene/price/PricePageScene/index.jsx";
import NewPricePageScene from "./scene/price/NewPricePageScene/index.jsx";
import LoginPageScene from "./scene/LoginPageScene/index.jsx";
import TitlesPageScene from "./scene/title/TitlesPageScene/index.jsx";
import TitlePageScene from "./scene/title/TitlePageScene/index.jsx";
import NewTitlePageScene from "./scene/title/NewTitlePageScene/index.jsx";
import RedStickersPageScene from "./scene/redSticker/RedStickersPageScene/index.jsx";
import RedStickerPageScene from "./scene/redSticker/RedStickerPageScene/index.jsx";
import NewRedStickerPageScene from "./scene/redSticker/NewRedStickerPageScene/index.jsx";
import IconsPageScene from "./scene/icon/IconsPageScene/index.jsx";
import IconPageScene from "./scene/icon/IconPageScene/index.jsx";
import NewIconPageScene from "./scene/icon/NewIconPageScene/index.jsx";
import SocialImagesPageScene from "./scene/socialImage/SocialImagesPageScene/index.jsx";
import SocialImagePageScene from "./scene/socialImage/SocialImagePageScene/index.jsx";
import NewSocialImagePageScene from "./scene/socialImage/NewSocialImagePageScene/index.jsx";
import PurchaseAdditionalDatasPageScene from "./scene/purchaseAdditionalData/PurchaseAdditionalDatasPageScene/index.jsx";
import PurchaseAdditionalDataPageScene from "./scene/purchaseAdditionalData/PurchaseAdditionalDataPageScene/index.jsx";
import NewPurchaseAdditionalDataPageScene from "./scene/purchaseAdditionalData/NewPurchaseAdditionalDataPageScene/index.jsx";
import BackGroundsPageScene from "./scene/background/BackgroundsPageScene/index.jsx";
import BackGroundPageScene from "./scene/background/BackgroundPageScene/index.jsx";
import NewBackGroundPageScene from "./scene/background/NewBackgroundPageScene/index.jsx";

export const api = configureApi();

class App extends Component {
    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <div>
                <div>
                    <Switch onUpdate={() => window.scrollTo(0, 0)}>
                        <Route exact path='/' component={IndexScene}/>
                        <Route exact path='/players' component={PlayersScene}/>
                        <Route exact path='/players/:id' component={PlayerPage}/>
                        <Route exact path='/offers' component={OffersPage}/>
                        <Route exact path='/offers/new' component={NewOfferPage}/>
                        <Route exact path='/offers/new/:id' component={NewOfferPage}/>
                        <Route exact path='/offers/:id' component={OfferPage}/>
                        <Route exact path='/prices' component={PricesPageScene}/>
                        <Route exact path='/prices/new' component={NewPricePageScene}/>
                        <Route exact path='/prices/:id' component={PricePageScene}/>
                        <Route exact path='/auth/login' component={LoginPageScene}/>
                        <Route exact path='/titles' component={TitlesPageScene}/>
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
                        <Route exact path='/backgrounds/:id' component={BackGroundPageScene}/>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
