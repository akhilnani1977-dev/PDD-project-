import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DESTINATIONS_DATA, MOCK_USER_TRIPS } from "@/data/mockData";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  travelPreferences: string[];
  budgetPreference: "Backpacker" | "Budget" | "Comfort" | "Premium" | "Luxury";
  notificationsEnabled: boolean;
}

export interface PlannedTrip {
  id: string;
  destinationId: string;
  title: string;
  dates: string;
  travellersCount: number;
  budget: number;
  status: "Upcoming" | "Completed" | "Saved";
  progressPercentage: number;
  coverImage: string;
  daysCount: number;
  budgetBreakdown: {
    accommodation: number;
    transport: number;
    food: number;
    activities: number;
    miscellaneous: number;
  };
  itineraryDays?: {
    dayNumber: number;
    title: string;
    activities: {
      id: string;
      time: string;
      title: string;
      location: string;
      duration: string;
      estimatedCost: number;
      image: string;
      travelTime: string;
    }[];
  }[];
}

export interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "info" | "warning";
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface AppState {
  // User profile
  user: UserProfile;
  setUser: (user: Partial<UserProfile>) => void;

  // Saved destinations
  savedDestinationIds: string[];
  toggleSaveDestination: (id: string) => void;
  isDestinationSaved: (id: string) => boolean;

  // Trips management
  trips: PlannedTrip[];
  addTrip: (trip: PlannedTrip) => void;
  removeTrip: (tripId: string) => void;
  updateTripBudget: (tripId: string, breakdown: PlannedTrip["budgetBreakdown"]) => void;

  // Search modal state
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (text: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        name: "Aarav Sharma",
        email: "aarav.sharma@traverse.in",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
        travelPreferences: ["Adventure", "Culture", "Nature", "Photography"],
        budgetPreference: "Comfort",
        notificationsEnabled: true,
      },
      setUser: (userData) =>
        set((state) => ({ user: { ...state.user, ...userData } })),

      savedDestinationIds: ["jaipur", "kerala", "hampi"],

      toggleSaveDestination: (id: string) => {
        const isSaved = get().savedDestinationIds.includes(id);
        const newIds = isSaved
          ? get().savedDestinationIds.filter((dId) => dId !== id)
          : [...get().savedDestinationIds, id];
        
        set({ savedDestinationIds: newIds });

        const destName = DESTINATIONS_DATA.find((d) => d.id === id)?.name || "Destination";
        get().addToast(
          isSaved ? `Removed ${destName} from saved destinations` : `Saved ${destName} to your wishlist!`,
          isSaved ? "info" : "success"
        );
      },

      isDestinationSaved: (id: string) => get().savedDestinationIds.includes(id),

      trips: MOCK_USER_TRIPS,

      addTrip: (newTrip: PlannedTrip) => {
        set((state) => ({ trips: [newTrip, ...state.trips] }));
        get().addToast(`Trip "${newTrip.title}" created successfully!`, "success");
      },

      removeTrip: (tripId: string) => {
        set((state) => ({ trips: state.trips.filter((t) => t.id !== tripId) }));
        get().addToast("Trip removed from dashboard", "info");
      },

      updateTripBudget: (tripId: string, breakdown) => {
        const newTotal = Object.values(breakdown).reduce((a, b) => a + b, 0);
        set((state) => ({
          trips: state.trips.map((t) =>
            t.id === tripId ? { ...t, budgetBreakdown: breakdown, budget: newTotal } : t
          ),
        }));
        get().addToast("Trip budget updated!", "success");
      },

      isSearchOpen: false,
      setSearchOpen: (open: boolean) => set({ isSearchOpen: open }),
      searchQuery: "",
      setSearchQuery: (query: string) => set({ searchQuery: query }),

      notifications: [
        {
          id: "n1",
          title: "Kerala Escape Reminder",
          message: "Your trip to Kerala starts in 5 days! Check weather and pack sunscreen.",
          time: "2 hours ago",
          read: false,
        },
        {
          id: "n2",
          title: "Price Drop Alert",
          message: "Hotels in Jaipur have dropped by up to 25% for October travel.",
          time: "1 day ago",
          read: false,
        },
      ],

      markNotificationRead: (id: string) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      clearAllNotifications: () => set({ notifications: [] }),

      toasts: [],
      addToast: (text: string, type: ToastMessage["type"] = "success") => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({ toasts: [...state.toasts, { id, text, type }] }));
        setTimeout(() => get().removeToast(id), 3500);
      },
      removeToast: (id: string) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "traverse-app-storage",
      partialize: (state) => ({
        user: state.user,
        savedDestinationIds: state.savedDestinationIds,
        trips: state.trips,
      }),
    }
  )
);
