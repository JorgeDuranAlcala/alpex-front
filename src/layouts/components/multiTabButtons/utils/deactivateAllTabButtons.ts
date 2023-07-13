import { TabButton } from "../interfaces/types";

export const deactivateAllTabButtons = (tabButtons: TabButton[], index: number | null = null) => {
  return tabButtons.map((tabButton) => ({
    ...tabButton,
    isActive: index !== null ? index === tabButtons.indexOf(tabButton) ? true : false : false,
  }));
}
