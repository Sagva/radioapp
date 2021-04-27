import {BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import ChannelDetails from './pages/ChannelDetails'
import Navbar from './components/Navbar'
import ProgramPage from './pages/ProgramPage'
import ChannelContextProvider from './contexts/ChannelContext'
import ChosenPrograms from './pages/ChosenPrograms'
import Login from './pages/Login'
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <UserProvider>
      <ChannelContextProvider>
          <Navbar></Navbar>
          <Route exact path='/' component={Home}/>
          <Route exact path='/channel/getbyid/:channelId' component={ChannelDetails}/>
          <Route exact path='/program/getbyid/:programId' component={ProgramPage}/>
          <Route exact path='/programs/getbycategoryid/:categoryId' component={ChosenPrograms}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
      </ChannelContextProvider>
      </UserProvider>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
