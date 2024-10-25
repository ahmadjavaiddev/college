import { create } from "zustand";

export const useSectionsStore = create((set, get) => ({
    sections: [],

    addSections: (sectionsData) =>
        set(() => ({
            sections: sectionsData,
        })),

    getSectionDetails: (sectionName) => {
        const { sections } = get();
        const filteredSection = sections.filter(
            (section) => section.name?.toLowerCase() === sectionName?.toLowerCase()
        );
        return filteredSection[0];
    },
}));
