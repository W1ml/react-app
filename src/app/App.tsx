import { MainLayout } from '../shared/layouts/MainLayout.tsx'
import { PostList } from '../widgets/PostList/PostList.tsx'

const mockPosts = [
  {
    id: 1,
    title: 'Пост номер один',
    body: 'Описание первого поста'
  },
  {
    id: 2,
    title: 'Пост номер 2',
    body: 'Описание второго поста'
  },
]

function App() {
  return (
    <MainLayout>
      <PostList posts={mockPosts} />
    </MainLayout>
  )
}

export default App