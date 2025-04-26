import { useState, useEffect } from "react";
import axios from "axios";
import { UrlState, UrlMapping } from "../types";
import { generateShortCode, validateUrl, ensureHttps } from "../utils/urlUtils";

const STORAGE_KEY = "url_shortener_mappings";
const API_URL = "https://vocational-gay-ritweeks-79ef5b96.koyeb.app";

console.log(API_URL);

export const useUrlShortener = () => {
    const [state, setState] = useState<UrlState>({
        urls: [],
        loading: false,
        error: null,
    });

    useEffect(() => {
        try {
            const storedUrls = localStorage.getItem(STORAGE_KEY);
            if (storedUrls) {
                setState((prev) => ({
                    ...prev,
                    urls: JSON.parse(storedUrls),
                }));
            }
        } catch (error) {
            console.error("Failed to load URLs from localStorage:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.urls));
        } catch (error) {
            console.error("Failed to save URLs to localStorage:", error);
        }
    }, [state.urls]);

    const shortenUrl = async (originalUrl: string) => {
        const validation = validateUrl(originalUrl);
        if (!validation.isValid) {
            setState((prev) => ({ ...prev, error: validation.error }));
            return null;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const formattedUrl = ensureHttps(originalUrl);

            // Check if URL already exists
            const existingMapping = state.urls.find(
                (u) => u.originalUrl === formattedUrl
            );
            if (existingMapping) {
                setState((prev) => ({ ...prev, loading: false }));
                return existingMapping;
            }

            // Call the API to get shortened URL
            const response = await axios.post(
                API_URL,
                {
                    url: formattedUrl,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const shortUrl = response.data.message;
            const shortCode = shortUrl.split("/").pop() || generateShortCode();

            const newUrlMapping: UrlMapping = {
                id: crypto.randomUUID(),
                originalUrl: formattedUrl,
                shortCode,
                createdAt: Date.now(),
                clicks: 0,
            };

            setState((prev) => ({
                ...prev,
                urls: [newUrlMapping, ...prev.urls],
                loading: false,
            }));

            return newUrlMapping;
        } catch (error) {
            console.error("Error shortening URL:", error);
            setState((prev) => ({
                ...prev,
                loading: false,
                error: "Failed to shorten URL. Please try again.",
            }));
            return null;
        }
    };

    const incrementClicks = (id: string) => {
        setState((prev) => ({
            ...prev,
            urls: prev.urls.map((url) =>
                url.id === id ? { ...url, clicks: url.clicks + 1 } : url
            ),
        }));
    };

    const deleteUrl = (id: string) => {
        setState((prev) => ({
            ...prev,
            urls: prev.urls.filter((url) => url.id !== id),
        }));
    };

    const clearUrls = () => {
        setState((prev) => ({
            ...prev,
            urls: [],
        }));
    };

    return {
        urls: state.urls,
        loading: state.loading,
        error: state.error,
        shortenUrl,
        incrementClicks,
        deleteUrl,
        clearUrls,
    };
};
