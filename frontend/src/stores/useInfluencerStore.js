import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

// Renamed and tailored for managing influencers
export const useInfluencerStore = create((set) => ({
  influencers: [],
  loading: false,

  setInfluencers: (influencers) => set({ influencers }),

  addInfluencer: async (influencerData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/influencers", influencerData);
      set((prevState) => ({
        influencers: [...prevState.influencers, res.data],
        loading: false,
      }));
      toast.success("Influencer added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add influencer");
      set({ loading: false });
    }
  },

  fetchAllInfluencers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/influencers");
      set({ influencers: response.data.influencers, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch influencers", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch influencers");
    }
  },

  deleteInfluencer: async (influencerId) => {
    set({ loading: true });
    try {
      await axios.delete(`/influencers/${influencerId}`);
      set((prevInfluencers) => ({
        influencers: prevInfluencers.influencers.filter(
          (influencer) => influencer._id !== influencerId
        ),
        loading: false,
      }));
      toast.success("Influencer deleted successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.error || "Failed to delete influencer"
      );
    }
  },

  updateInfluencer: async (influencerId, updatedData) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/influencers/${influencerId}`, updatedData);
      set((prevInfluencers) => ({
        influencers: prevInfluencers.influencers.map((influencer) =>
          influencer._id === influencerId ? { ...influencer, ...res.data } : influencer
        ),
        loading: false,
      }));
      toast.success("Influencer updated successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.error || "Failed to update influencer"
      );
    }
  },
}));