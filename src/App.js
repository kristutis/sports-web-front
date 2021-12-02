import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import Trainers from './components/pages/trainers/Trainers';
import Footer from './components/footer/Footer'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/trainers' exact component={Trainers}/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
