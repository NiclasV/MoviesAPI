import { useState, useEffect } from "react";

interface UrlProps {
    url: string,
    searchParams: URLSearchParams,
}

export const useSearchParams = ({ url, searchParams }: UrlProps) => {
    const [params, setParams] = useState<URLSearchParams>(searchParams);
    const [fetchUrl, setFetchUrl] = useState<string>('');

    // useEffect for updating fetchUrl when params change
    // also setting the url based on the new params
    useEffect(() => {
        const generateFetchUrl = () => {
            const newurl = url + params.toString();
            setFetchUrl(newurl);
        };

        const setHistoryUrl = () => {
            var currentUrl = window.location.pathname + "?" +  params.toString();
           
            window.history.pushState("hejj", "str", currentUrl);
        }

        generateFetchUrl(); 
        setHistoryUrl();

    }, [params, url]);

    const updateSearchParams = (newParams: URLSearchParams) => {
        setParams(newParams);
    };

    return {
        params,
        fetchUrl,
        updateSearchParams,
    };
}