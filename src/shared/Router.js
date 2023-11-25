import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Board from '../pages/Board';
import AppLayout from '../layouts/AppLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='/studies' element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
