import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

const queryClient = new QueryClient();

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Math.random() * 1000,
                title: "Learn React Query",
                completed: false
            });
        }, 1000);
    })
        .then((data) => {
            console.log("Fetched data:", data);
            return data;
        }).catch((error) => {
            console.error("Error fetching data:", error);
            throw error;
        });
}

const Todo = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["todo"],
        queryFn: getData,
        staleTime: 10000, // 10 seconds
    });

    if (isLoading) return <div>Loading...</div>;
    return (
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <p>ID: {(data as any).id}</p>
            <p>Title: {(data as any).title}</p>
            <p>Completed: {(data as any).completed ? "Yes" : "No"}</p>
        </div>
    )
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