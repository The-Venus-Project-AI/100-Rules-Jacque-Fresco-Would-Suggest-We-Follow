import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AppState, TabType, RegionType, TimeRangeType } from '../types';

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        activeTab: 'overview',
        selectedRegion: 'global',
        timeRange: 'year',
        expandedCategory: null,

        setActiveTab: (tab: TabType) => set({ activeTab: tab }),
        setSelectedRegion: (region: RegionType) => set({ selectedRegion: region }),
        setTimeRange: (range: TimeRangeType) => set({ timeRange: range }),
        setExpandedCategory: (category: string | null) => set({ expandedCategory: category }),
      }),
      {
        name: 'rbe-app-storage',
        partialize: (state) => ({
          selectedRegion: state.selectedRegion,
          timeRange: state.timeRange,
        }),
      }
    )
  )
);
