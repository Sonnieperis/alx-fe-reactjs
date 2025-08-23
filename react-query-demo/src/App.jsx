import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient();

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
        <header style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <h1 style={{ marginRight: "auto" }}>React Query Demo</h1>
          <button onClick={() => setShowPosts(true)}>Show Posts</button>
          <button onClick={() => setShowPosts(false)}>Hide Posts</button>
        </header>

        {showPosts ? (
          <PostsComponent />
        ) : (
          <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
            <p>Posts are hidden. Toggle back to see caching in action.</p>
          </div>
        )}
      </div>

      {/* Devtools to inspect query cache */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
