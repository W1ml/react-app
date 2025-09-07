export const mockPosts = [
    {
        id: 1,
        title: "Пост номер один",
        body: "Описание первого поста.",
    },
    {
        id: 2,
        title: "Пост номер 2",
        body: "Описание второго.",
    },
    {
        id: 3,
        title: "Короткий",
        body: "Короткий пост.",
    },
    {
        id: 4,
        title: "Длинный заголовок для тестирования фильтров",
        body: "Съешь же ещё этих мягких французских булок, да выпей чаю",
    },
];

export const mockComments = [
    {
        id: 1,
        postId: 1,
        name: "Иван Иванов",
        email: "example@example.com",
        body: "Комментарий Ивана"
    },
    {
        id: 2,
        postId: 1,
        name: "Петр Петров",
        email: "example@example.com",
        body: "Комментарий Петра"
    },
    {
        id: 3,
        postId: 2,
        name: "Алексей Алексеев",
        email: "example@example.com",
        body: "Комментарий Алексея"
    },
    {
        id: 4,
        postId: 4,
        name: "Василий Васильев",
        email: "example@example.com",
        body: "Комментарий Василия"
    }
];
