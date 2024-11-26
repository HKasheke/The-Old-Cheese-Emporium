import { Outlet } from 'react-router-dom';
import Sidebar from './ui/Sidebar';

function App() {
  return (
    <>
    <h1>App parent page test</h1> 
    <div>
      <Sidebar />
    </div>
    <div>
      <Outlet />
    </div>
    </>
  )
}

export default App
