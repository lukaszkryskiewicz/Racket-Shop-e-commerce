import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import './styles/bootstrap.scss';
import './styles/global.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import ProductPage from './components/views/ProductPage/ProductPage';
import Blog from './components/views/Blog/Blog';
import Register from './components/views/Register/Register';
import Login from './components/views/Login/Login';
import Search from './components/views/Search/Search';
import Cart from './components/views/Cart/Cart';
import NotFound from './components/views/NotFound/NotFound';
import ProductsPage from './components/views/ProductsPage/ProductsPage';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path={'/'} component={Homepage} />
            <Route exact path={'/shop/:categoryId'} component={ProductsPage} />
            <Route exact path={'/product/:productId'} component={ProductPage} />
            <Route exact path={'/blog'} component={Blog} />
            <Route exact path={'/blog/:blogPostId'} component={Blog} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/search'} component={Search} />
            <Route exact path={'/cart'} component={Cart} />
            <Route path='*' component={NotFound} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
