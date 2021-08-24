import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router';
// import axios from 'axios';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import CreateWorkout from './components/CreateWorkout';
import Rewards from './components/Rewards';

function App() {
  return (
    <div>
      <Router>
        <SignIn path="/"/>
        <Dashboard path="/dashboard"/>
        <Workouts path="/workouts"/>
        <CreateWorkout path="/workouts/new"/>
        <Rewards path="/rewards"/>
      </Router>
    </div>
  );
}

export default App;
