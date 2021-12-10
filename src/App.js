import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import Trainers from './components/pages/trainers/Trainers';
import Footer from './components/footer/Footer'
import './App.css'
import Products from './components/pages/products/Products';
import TrainerDetails from './components/pages/trainerDetails/TrainerDetails';
import { Provider } from 'react-redux';
import store from './state/state';
import Users from './components/pages/users/Users';
import Profile from './components/pages/profile/Profile';
import EditTrainers from './components/pages/editTrainers/EditTrainers';
import EditTrainer from './components/pages/editTrainer/EditTrainer';
import CreateTrainer from './components/pages/createTrainer/CreateTrainer';

export const DEFAULT_BACKEND_PATH = 'https://cosmic-quarter-326513.appspot.com/api/'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/trainers' exact component={Trainers} />
            <Route path='/create-trainer' exact component={CreateTrainer} />
            <Route path='/edit-trainers' exact component={EditTrainers} />
            <Route path='/edit-trainer/:id' exact component={EditTrainer} />
            <Route path='/trainers/:id' exact component={TrainerDetails} />
            <Route path='/products' exact component={Products} />
            <Route path='/users' exact component={Users} />
            <Route path='/profile' exact component={Profile} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
