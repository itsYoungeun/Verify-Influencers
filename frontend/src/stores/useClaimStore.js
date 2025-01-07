import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useClaimStore = create((set) => ({
  claims: [],
  loading: false,

  setClaims: (claims) => set({ claims }),

  addClaim: async (claimData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/claims", claimData);
      set((prevState) => ({
        claims: [...prevState.claims, res.data.claim],
        loading: false,
      }));
      toast.success("Claim added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add claim");
      set({ loading: false });
    }
  },

  fetchAllClaims: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/claims");
      set({ claims: response.data.claims, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch claims", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch claims");
    }
  },

  deleteClaim: async (claimId) => {
    set({ loading: true });
    try {
      await axios.delete(`/claims/${claimId}`);
      set((prevClaims) => ({
        claims: prevClaims.claims.filter((claim) => claim._id !== claimId),
        loading: false,
      }));
      toast.success("Claim deleted successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to delete claim");
    }
  },

  updateClaim: async (claimId, updatedData) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/claims/${claimId}`, updatedData);
      set((prevClaims) => ({
        claims: prevClaims.claims.map((claim) =>
          claim._id === claimId ? { ...claim, ...res.data } : claim
        ),
        loading: false,
      }));
      toast.success("Claim updated successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to update claim");
    }
  },
}));
