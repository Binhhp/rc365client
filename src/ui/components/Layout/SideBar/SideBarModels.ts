export interface ILeftSideBarProps {
  onGetCollapsedStatus: () => void;
  theme?: string;
}

export interface ILeftSideBarStates {
  isCollapsed: boolean;
  showLayer: boolean;
  layerHeight: number;
  crtKey: string;
}
