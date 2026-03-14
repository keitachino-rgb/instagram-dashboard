import { create } from 'zustand';

export type DateRange = 7 | 14 | 30 | 60 | 90;
export type ComparisonType = 'none' | 'previous-month' | 'previous-year';

interface DashboardStore {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;

  comparisonType: ComparisonType;
  setComparisonType: (type: ComparisonType) => void;

  darkMode: boolean;
  toggleDarkMode: () => void;

  selectedMetrics: string[];
  toggleMetric: (metric: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dateRange: 30,
  setDateRange: (range) => set({ dateRange: range }),

  comparisonType: 'none',
  setComparisonType: (type) => set({ comparisonType: type }),

  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  selectedMetrics: [
    'followers',
    'engagement-rate',
    'reach',
    'impressions',
    'profile-visits',
  ],
  toggleMetric: (metric) =>
    set((state) => ({
      selectedMetrics: state.selectedMetrics.includes(metric)
        ? state.selectedMetrics.filter((m) => m !== metric)
        : [...state.selectedMetrics, metric],
    })),
}));
