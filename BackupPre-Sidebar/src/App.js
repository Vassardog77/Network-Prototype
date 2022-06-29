import './App.css';
import FbLogin from './components/FbLogin';
import GcalDisplay from './components/GcalDisplay';
import SideBar from './components/SideBar';

function App() {
  return (
    <div>
      <FbLogin></FbLogin>
      <GcalDisplay></GcalDisplay>
      <SideBar id='sidebar'></SideBar>
    </div>
  );
}

export default App;
