import { MainLayout } from '../shared/layouts/MainLayout.tsx'
import { PostList } from '../widgets/PostList/PostList.tsx'
import  { mockPosts } from '../lib/mocks/mocks.ts'

function App() {
  return (
    <MainLayout>
      <PostList posts={mockPosts} />
    </MainLayout>
  )
}

export default App