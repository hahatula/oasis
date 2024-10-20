import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import { PostData } from '../../types/post';
import { openModal } from '../../redux/modalSlice';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import { Modals } from '../Modals/Modals';
import SingIn from '../SingIn/SigIn';
import SingUp from '../SignUp/SignUp';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getToken, removeToken } from '../../utils/token';
import { getUserInfo } from '../../utils/api';
import { setUser } from '../../redux/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUserInfo(token)
        .then((user) => {
          if (user) {
            dispatch(setUser(user));
          }
        })
        .catch((error) => {
          console.error('Failed to fetch user info:', error);
          removeToken();
        });
    }
  }, [dispatch]);

  const handlePostClick = (post: PostData): void => {
    setSelectedPost(post);
    dispatch(openModal('view-post'));
  };

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/signin" element={<SingIn />} />
        <Route path="/signup" element={<SingUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main handlePostClick={handlePostClick} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <Modals post={selectedPost} />
    </div>
  );
}

export default App;
