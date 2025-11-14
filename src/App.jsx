import './App.css'
import Landingpage from './Pages/Landingpage'
import Pnf from './Pages/Pnf'
import Form from './Components/Form'
import { Route,Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Protectedroute from './Pages/Protectedroute'
import { UserAuthContextProvider } from './context/Userauthcontext'
import Updatetask from './Pages/Updatetask'
import Update from './Pages/update/Update'
import Taskcalendar from './Components/Taskcalendar'
import NotificationList from './Pages/NotificationList'
import About from './Pages/About'
import ResetPass from './Pages/ResetPass'

function App() {


  return (
    <>
    
  
    <UserAuthContextProvider>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgotpassword' element={<ResetPass/>}/>
      <Route path='/register' element={ <Signup/>}/>
      <Route path='/home' element={<Protectedroute><Landingpage/></Protectedroute>}/>
      <Route path='/task-calendar' element={<Protectedroute><Taskcalendar/></Protectedroute>}/>
      <Route path='/form' element={<Protectedroute><Form/></Protectedroute>}/>
      <Route path='/notification' element={<Protectedroute><NotificationList/></Protectedroute>}/>
      <Route path='/about' element={<Protectedroute><About/></Protectedroute>}/>
      <Route path='/*' element={<Protectedroute><Pnf/></Protectedroute>}/>
      <Route path='/home/:id/edit' element={<Protectedroute><Updatetask/></Protectedroute>}/>
      <Route path='/home/:id/update' element={<Protectedroute><Update/></Protectedroute>}/>
      </Routes>
    </UserAuthContextProvider>
  
   
    
    </>
  )
}

export default App
