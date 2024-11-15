import { toast } from "@/hooks/use-toast";

export class LocalStorage {
    // Get a value from local storage by key
    static get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (err) {
                return null;
            }
        }
        return null;
    }

    // Set a value in local storage by key
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Remove a value from local storage by key
    static remove(key) {
        localStorage.removeItem(key);
    }

    // Clear all items from local storage
    static clear() {
        localStorage.clear();
    }
}

export const requestHandler = async (
    api,
    onSuccess,
    onError,
    message,
    errorMessage
) => {
    try {
        // Make the API request
        const response = await api();
        const { data } = response;
        if (data?.success) {
            // Call the onSuccess callback with the response data
            onSuccess(data.data ? data.data : data);
            message && toast({ title: message });
        }
    } catch (error) {
        // Handle error cases, including unauthorized and forbidden cases
        console.error("requestHandler :: Error ::", error);
        if ([401, 403].includes(error?.response?.data?.statusCode)) {
            localStorage.clear(); // Clear local storage on authentication issues
            window.location.href = "/login"; // Redirect to login page
        }

        toast({
            variant: "destructive",
            title: `Uh oh! ${
                errorMessage ? errorMessage : "SomeThing went wrong!"
            }.`,
        });

        onError && onError(error);
    }
};
