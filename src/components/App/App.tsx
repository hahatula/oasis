import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
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

function App() {
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

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
