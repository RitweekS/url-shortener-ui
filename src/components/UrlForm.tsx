import React, { useState } from "react";
import { Loader2, Link2 } from "lucide-react";
import { validateUrl } from "../utils/urlUtils";

interface UrlFormProps {
    onSubmit: (url: string) => void;
    loading: boolean;
    error: string | null;
}

const UrlForm: React.FC<UrlFormProps> = ({
    onSubmit,
    loading,
    error: serverError,
}) => {
    const [url, setUrl] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateUrl(url);
        if (!validation.isValid) {
            setValidationError(validation.error);
            return;
        }

        setValidationError(null);
        onSubmit(url);
        setUrl("");
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        setValidationError(null); // Clear validation error when input changes
    };

    const error = validationError || serverError;
    const isError = !!error;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 animate-scale-in hover:shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Shorten Your Link
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link2
                            size={20}
                            className={
                                isError ? "text-red-500" : "text-gray-400"
                            }
                        />
                    </div>

                    <input
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="Paste your long URL here"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isError
                                ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10"
                                : "border-gray-300 dark:border-gray-600 focus:ring-purple-500"
                        } focus:ring-2 outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-400 dark:hover:border-purple-500`}
                        aria-invalid={isError}
                        aria-describedby={isError ? "url-error" : undefined}
                    />
                </div>

                {error && (
                    <p
                        id="url-error"
                        className="text-red-500 text-sm mt-2 animate-fade-in flex items-center"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover-lift ${
                        loading ? "animate-shimmer" : ""
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin mr-2" />
                            Shortening...
                        </>
                    ) : (
                        "Shorten URL"
                    )}
                </button>
            </form>
        </div>
    );
};

export default UrlForm;
