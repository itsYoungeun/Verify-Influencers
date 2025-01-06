import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useResearchStore = create((set) => ({
  research: [],
  loading: false,

  setResearch: (researchData) => set({ research: researchData }),

  addResearch: async (researchData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/research", researchData);
      set((prevState) => ({
        research: [...prevState.research, res.data],
        loading: false,
      }));
      toast.success("Research added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add research");
      set({ loading: false });
    }
  },

  fetchAllResearch: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/research");
      set({ research: response.data.research, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch research", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch research");
    }
  },

  deleteResearch: async (researchId) => {
    set({ loading: true });
    try {
      await axios.delete(`/research/${researchId}`);
      set((prevResearch) => ({
        research: prevResearch.research.filter((research) => research._id !== researchId),
        loading: false,
      }));
      toast.success("Research deleted successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to delete research");
    }
  },

  updateResearch: async (researchId, updatedData) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/research/${researchId}`, updatedData);
      set((prevResearch) => ({
        research: prevResearch.research.map((research) =>
          research._id === researchId ? { ...research, ...res.data } : research
        ),
        loading: false,
      }));
      toast.success("Research updated successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to update research");
    }
  },
}));