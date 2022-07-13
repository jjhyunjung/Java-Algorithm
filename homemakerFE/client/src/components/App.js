import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// 페이지들
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import DetailProductPage from './views/DetailProductPage/DetailProductPage'
import DetailSearchpageCategory from './views/SearchPage/SearchCategory/DetailSearchpageCategory'
import DetailSearchNamePage from './views/SearchPage/SearchName/DetailSearchNamePage'

//권한
//null   아무나 접근
//true   로그인한사람
//false  로그인한사람은 못감

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          {/* null - 누구나 접근가능 */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/product/searchCategory" component={Auth(DetailSearchpageCategory, null)} />
          <Route exact path="/product/searchName" component={Auth(DetailSearchNamePage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
