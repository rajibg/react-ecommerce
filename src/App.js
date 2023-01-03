import 'bootstrap/dist/css/bootstrap.min.css'
import { Component, lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ContactUs from './screens/ContactUs';
import Home from './screens/Home';
import { fetchCarts } from './store/actions/productAction';

const Shop = lazy(() => import('./screens/Shop'))
const Cart = lazy(() => import('./screens/Cart'))

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.initCartData();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/contact-us' element={<ContactUs />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </Suspense>
        </Layout >
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  initCartData: () => dispatch(fetchCarts())
})


export default connect(null, mapDispatchToProps)(App);
