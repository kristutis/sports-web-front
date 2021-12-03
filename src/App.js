import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import Trainers from './components/pages/trainers/Trainers';
import Footer from './components/footer/Footer'
import './App.css'
import Products from './components/pages/products/Products';

export const DEFAULT_BACKEND_PATH = 'http://localhost:3000/api/'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/trainers' exact component={Trainers}/>
          <Route path='/products' exact component={Products}/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
