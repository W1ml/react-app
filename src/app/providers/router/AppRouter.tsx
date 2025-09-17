import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage/MainPage';
import { PostsPage } from '../../../pages/PostsPage/PostsPage';
import { PostDetailPage } from '../../../pages/PostDetailPage/PostDetailPage';
import { UserAlbumsPage } from '../../../pages/UserAlbumsPage/UserAlbumsPage';
import { AlbumPhotosPage } from '../../../pages/AlbumPhotosPage/AlbumPhotosPage';
import { UserTodosPage } from '../../../pages/UserTodosPage/UserTodosPage';
import { UserPostsPage } from '../../../pages/UserPostsPage/UserPostsPage';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/users/:id/albums" element={<UserAlbumsPage />} />
            <Route path="/albums/:id/photos" element={<AlbumPhotosPage />} />
            <Route path="/users/:id/todos" element={<UserTodosPage />} />
            <Route path="/users/:id/posts" element={<UserPostsPage />} />
        </Routes>
    );
};
