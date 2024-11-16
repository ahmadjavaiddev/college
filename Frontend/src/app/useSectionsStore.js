import { create } from "zustand";
import { getSections } from "../api";
import { requestHandler } from "../utils";

const useSectionsStore = create((set, get) => ({
    sections: [],
    loading: true,
    searchQuery: "",
    searchError: "",
    noResults: false,
    searchedSections: [],

    // Actions
    fetchSections: async () => {
        try {
            set({ loading: true });
            const state = get();

            if (state.sections.length > 0) {
                console.log("Sections already in state...");
                set({ loading: false });
                return;
            }

            console.log("Fetching section data from API...");

            requestHandler(
                async () => await getSections(),
                (res) => {
                    set({ sections: res.sections, loading: false });
                },
                () => set({ loading: false }),
                null,
                "No sections found!"
            );
        } catch (error) {
            console.error("Error fetching section data:", error);
            set({ loading: false });
        }
    },

    searchSections: (query) => {
        const state = get();
        if (!query || !state.sections?.length) return;

        const searchResults = state.sections.filter((section) =>
            section.name.toLowerCase().includes(query.toLowerCase())
        );

        if (searchResults.length === 0) {
            set({ noResults: true, searchError: "No sections found!" });
            return;
        }
        console.log("Search Results ::", searchResults);

        set({ searchedSections: searchResults, noResults: false });
    },
}));

export default useSectionsStore;
