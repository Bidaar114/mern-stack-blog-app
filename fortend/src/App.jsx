import {Outlet} from 'react-router-dom'
import Header from './components/Header'
import PrivateRoute from './hooks/PrivateRoute'

function App() {
 

  return (
    <>
      <Header/> 
      <Outlet/>
    </>
  )
}

export default App
