import React, { useState, useMemo, useCallback } from 'react';
import { NavLinks } from '../shared/ui/NavLinks';
import { PostList } from '../widgets/PostList/PostList';
import { CommentList } from '../widgets/CommentList/ui/CommentList';
import { PostLengthFilter } from '../features/PostLengthFilter/ui/PostLengthFilter';
import { Modal } from '../shared/ui/Modal/Modal';
import { filterByLength } from '../features/PostLengthFilter/lib/filterByLength';
import { mockPosts, mockComments } from '../lib/mocks/mocks';
import styles from './Demo.module.css';

export const Demo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [filterOptions, setFilterOptions] = useState({ minLength: 0, maxLength: 100 });

    const filteredPosts = useMemo(() => {
        return filterByLength(mockPosts, filterOptions);
    }, [filterOptions]);

    const handlePostClick = useCallback((post) => {
        setSelectedPost(post);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedPost(null);
    }, []);

    const handleFilterChange = useCallback((options) => {
        setFilterOptions(options);
    }, []);

    const handleToggleLoading = useCallback(() => {
        setIsLoading(prev => {
            if (!prev) {
                setTimeout(() => setIsLoading(false), 2000);
            }
            return !prev;
        });
    }, []);

    const navLinks = [
        { to: '/posts', label: 'Все посты' },
        { to: '/posts/1', label: 'Пост #1' },
        { to: '/users/1/posts', label: 'Посты пользователя #1' },
        { to: '/users/1/albums', label: 'Альбомы пользователя #1' },
        { to: '/users/1/todos', label: 'Задачи пользователя #1' },
        { to: '/albums/1/photos', label: 'Фото альбома #1' }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Страница для теста</h1>
            
            <NavLinks
                title="Навигация"
                links={navLinks} 
            />
            
            <button className={styles.loadingButton} onClick={handleToggleLoading}>
                {isLoading ? 'Остановить' : 'Показать загрузку'}
            </button>

            <PostLengthFilter 
                posts={mockPosts} 
                onFilterChange={handleFilterChange} 
            />

            <PostList 
                posts={filteredPosts} 
                isLoading={isLoading} 
                onPostClick={handlePostClick}
            />

            <Modal isOpen={!!selectedPost} onClose={handleCloseModal}>
                {selectedPost && (
                    <>
                        <Modal.Header onClose={handleCloseModal}>
                            <h2 className={styles.modalTitle}>{selectedPost.title}</h2>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{selectedPost.body}</p>
                            <CommentList 
                                comments={mockComments} 
                                postId={selectedPost.id} 
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className={styles.modalButton} onClick={handleCloseModal}>
                                Закрыть
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
};
