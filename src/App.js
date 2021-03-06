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
import LikesProvider from "./contexts/LikesContext";
import PlayerProvider from "./contexts/PlayerContext";
import Favorites from './pages/Favorites'
import UserPage from './pages/UserPage'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <ChannelContextProvider>
        <UserProvider>
          <LikesProvider>
          <PlayerProvider>
            <Navbar></Navbar>
            <Route exact path='/' component={Home}/>
            <Route exact path='/channel/getbyid/:channelId' component={ChannelDetails}/>
            <Route exact path='/program/getbyid/:programId' component={ProgramPage}/>
            <Route exact path='/programs/getbycategoryid/:categoryId' component={ChosenPrograms}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/favorites' component={Favorites}/>
            <Route exact path='/user-page' component={UserPage}/>
          </PlayerProvider>
          </LikesProvider>
        </UserProvider>
      </ChannelContextProvider>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
