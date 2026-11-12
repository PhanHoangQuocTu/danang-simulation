export type PanelDisplayMode = 'expanded' | 'compact' | 'hidden';
export type StatusWidgetMode = 'expanded' | 'compact';
export type CriticalPanelDisplayMode = StatusWidgetMode;
export type MovementGuideDisplayMode = 'expanded' | 'collapsed';
export type MiniMapDisplayMode = 'expanded' | 'compact';
export type MiniMapFollowMode = 'overview' | 'follow';
export type ControlInputType = 'keyboard' | 'mouse' | 'touch';
export type MiniDataChipVariant = 'metric' | 'status' | 'info';

export interface ControlInstruction {
  id: string;
  inputType: ControlInputType;
  action: string;
  description: string;
  keys?: string[];
  badgeText?: string;
}

export interface HUDPanelState {
  miniMap: MiniMapDisplayMode;
  statusWidget: StatusWidgetMode;
  movementGuide: MovementGuideDisplayMode;
  environmentPanel: PanelDisplayMode;
  secondaryInfo: PanelDisplayMode;
  playerStatus: CriticalPanelDisplayMode;
}
