import { useGetPostsByUserQuery, useGetPostsQuery } from '../../../../entities/post/api/postsApi';

interface UsePostsOptions {
    userId?: number;
}

export const usePosts = (options: UsePostsOptions = {}) => {
    const { userId } = options;

    const allPostsQuery = useGetPostsQuery();
    const userPostsQuery = useGetPostsByUserQuery(userId!, {
        skip: !userId,
    });

    const data = userId ? userPostsQuery.data : allPostsQuery.data;
    const isLoading = userId ? userPostsQuery.isLoading : allPostsQuery.isLoading;
    const isError = userId ? userPostsQuery.isError : allPostsQuery.isError;
    const error = userId ? userPostsQuery.error : allPostsQuery.error;

    return {
        posts: data ?? [],
        loading: isLoading,
        error: isError ? (error as any)?.message ?? 'Ошибка' : null,
    };
};
