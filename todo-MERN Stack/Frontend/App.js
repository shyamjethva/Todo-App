import { Routes, Route } from 'react-router-dom'
import Landing from "./pages/Landing/Landing"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ToDoList from "./pages/ToDos/ToDoList"
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/Home/HomePage';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/todoList' element={<ToDoList />} />
      </Routes>
      <Toaster />

    </div>
  );

}

export default App;
