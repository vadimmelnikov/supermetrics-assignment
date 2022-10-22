import { Routes, Route } from 'react-router-dom';

import Auth from 'page/Auth';
import Error from 'page/Error';
import Home from 'page/Home';

import s from './Main.module.scss';

const Main = () => (
  <main className={s.main}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </main>
);

export default Main;
