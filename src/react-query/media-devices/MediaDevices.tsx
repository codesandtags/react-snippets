import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const MediaDevices = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['mediaDevices'],
        queryFn: async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices;
        },
        staleTime: 60000, // 1 minute
    });

    return (
        <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <h2>Media Devices Example</h2>
            <p>This is a placeholder for the Media Devices example component.</p>
            
            {isLoading && <p>Loading media devices...</p>}
            {error && <p>Error fetching media devices: {(error as Error).message}</p>}
            
            {data && (<ul>
                {data.map((device) => (
                    <li key={device.deviceId}>
                        {device.kind}: {device.label || 'Label not available'}
                    </li>
                ))}
            </ul>)}
        </div>
    );
}

export const MediaContainer = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MediaDevices />
        </QueryClientProvider>
    );
}