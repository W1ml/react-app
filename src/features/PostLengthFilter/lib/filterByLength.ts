import type { Post } from '../../../entities/post/PostTypes';

export interface FilterOptions {
    minLength: number;
    maxLength: number;
}

export const filterByLength = (posts: Post[], options: FilterOptions): Post[] => {
    return posts.filter(post => {
        const titleLength = post.title.length;
        return titleLength >= options.minLength && titleLength <= options.maxLength;
    });
};

export const getPostTitleLengths = (posts: Post[]): number[] => {
    return posts.map(post => post.title.length);
};

export const getMinMaxLengths = (posts: Post[]): { min: number; max: number } => {
    if (posts.length === 0) {
        return { min: 0, max: 100 };
    }
    
    const lengths = getPostTitleLengths(posts);
    return {
        min: Math.min(...lengths),
        max: Math.max(...lengths)
    };
};
