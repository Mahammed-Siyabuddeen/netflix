import './app.css'
import Banner from './components/Banner/Banner';
import './components/Banner/Banner.css';
import NavBar from './components/NavBar/NavBar';
import './components/NavBar/NavBar.css';
import RowPost from './components/RowPost/RowPost';
import  './components/RowPost/RowPost.css';
import { action,originals } from './urls';

function App() {
  return(
    <div>

      <NavBar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Orginals' />
      <RowPost url={action} title='action' isSmall />
      <RowPost url={action} title='action' isSmall />

    </div>
  )
}

export default App;

