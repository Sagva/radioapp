import {BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ChannelDetails from './pages/ChannelDetails'
import Navbar from './components/Navbar'
import ChannelContextProvider from './contexts/ChannelContext'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <ChannelContextProvider>
        <Navbar></Navbar>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/channels/:channelId' component={ChannelDetails}/>
      </ChannelContextProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
