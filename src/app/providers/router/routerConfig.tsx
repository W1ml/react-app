import { createBrowserRouter } from 'react-router-dom';
import { 
    Posts, 
    PostDetail, 
    UserAlbums, 
    AlbumPhotos, 
    UserTodos, 
    UserPosts 
} from '../../../pages';
import { Demo } from '../../Demo';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Demo />,
    },
    {
        path: '/posts',
        element: <Posts />,
    },
    {
        path: '/posts/:id',
        element: <PostDetail />,
    },
    {
        path: '/users/:id/albums',
        element: <UserAlbums />,
    },
    {
        path: '/albums/:id/photos',
        element: <AlbumPhotos />,
    },
    {
        path: '/users/:id/todos',
        element: <UserTodos />,
    },
    {
        path: '/users/:id/posts',
        element: <UserPosts />,
    },
]);
