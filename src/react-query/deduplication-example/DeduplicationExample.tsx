import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

const queryClient = new QueryClient();

function fetchData() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json());
}

const Todo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>Todo title: {data.title}</div>;
};

export const DeduplicationExample = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <h2>Deduplication Example</h2>
      <Todo />
      <Todo />
    </QueryClientProvider>
  );
}