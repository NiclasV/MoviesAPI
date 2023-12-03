import { useEffect, useRef } from "react";
import { useState } from "react";

const bearerToken = process.env.REACT_APP_API_BEARER_TOKEN;

type UseFetch<T> = [T | null, boolean];

export function useFetch<T>(url: string): UseFetch<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        async function fetchData() {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            await fetch(url, {
                method: "GET",
                signal: abortControllerRef.current?.signal,
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer ' + bearerToken
              }
            })
            .then((res) => {
                if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`);
                }
                return res.json();
              })
              .then((data) => {
                setData(data);
              })
              .then(() => {
                setLoading(false);
              })
              .catch((error) => {
                if (error.name === 'AbortError') {
                  console.log('Fetch aborted');
                } else {
                  console.error('Error:', error);
                }
              });
        }

        fetchData();

    }, [url])

    return [data, loading]
}