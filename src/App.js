import {BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
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
      </ChannelContextProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
