
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Home/HomePage'
import AuthCallbackPage from './Pages/Auth/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './layout/MainLayout'
import ChatPage from './Pages/chat/ChatPage'
import AlbumPage from './Pages/album/AlbumPage'
import AdminPage from './Pages/admin/AdminPage'
import {Toaster} from 'react-hot-toast';
import ErrorPage from './Pages/404/ErrorPage'
import SongsPage from './Pages/Song/SongsPage'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"} />} />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/songs' element={<SongsPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
