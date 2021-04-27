import {BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ChannelDetails from './pages/ChannelDetails'
import Navbar from './components/Navbar'
import ProgramPage from './pages/ProgramPage'

import ChannelContextProvider from './contexts/ChannelContext'
import ChosenPrograms from './pages/ChosenPrograms'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <ChannelContextProvider>
          <Navbar></Navbar>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/channel/getbyid/:channelId' component={ChannelDetails}/>
          <Route exact path='/program/getbyid/:programId' component={ProgramPage}/>
          <Route exact path='/programs/getbycategoryid/:categoryId' component={ChosenPrograms}/>
      </ChannelContextProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
