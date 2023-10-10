import GetData from "./GetData";

export const FetchData = async (fetchUrl: string, abortControllerRef: React.MutableRefObject<AbortController | null>) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    
    try {
        const result = await GetData(fetchUrl, {
            signal: abortControllerRef.current?.signal,
        });
        return (result)
    } catch (error: any) {
        console.error(error)
    }
}