import type { ControlInstruction } from './type';
export const DESKTOP_CONTROL_INSTRUCTIONS: readonly ControlInstruction[] = [
  {
    id: 'kb-move-wasd',
    inputType: 'keyboard',
    action: 'Di chuyển 4 hướng',
    description: 'Tiến (W), Lùi (S), Trái (A), Phải (D) hoặc Phím Mũi Tên',
    keys: ['W', 'A', 'S', 'D'],
    badgeText: 'Arrows',
  },
  {
    id: 'kb-sprint-shift',
    inputType: 'keyboard',
    action: 'Chạy nhanh (Sprint)',
    description: 'Giữ phím Shift khi đang di chuyển để chạy bứt tốc',
    keys: ['SHIFT'],
  },
  {
    id: 'kb-jump-space',
    inputType: 'keyboard',
    action: 'Nhảy (Jump)',
    description: 'Nhấn Space để bật nhảy khi nhân vật đang đứng trên mặt đất',
    keys: ['SPACE'],
  },
  {
    id: 'mouse-look-orbit',
    inputType: 'mouse',
    action: 'Xoay góc nhìn 360°',
    description: 'Click vào vùng 3D để khóa chuột (Pointer Lock) hoặc giữ chuột trái kéo, nhấn ESC để nhả chuột',
    keys: ['MOUSE', 'ESC'],
  },
  {
    id: 'mouse-wheel-zoom',
    inputType: 'mouse',
    action: 'Thu phóng Camera',
    description: 'Lăn con lăn chuột (Scroll Wheel) để đổi khoảng cách góc nhìn',
    keys: ['SCROLL'],
  },
] as const;

export const TOUCH_CONTROL_INSTRUCTIONS: readonly ControlInstruction[] = [
  {
    id: 'touch-virtual-joystick',
    inputType: 'touch',
    action: 'Di chuyển nhân vật',
    description: 'Kéo Virtual Joystick bên trái màn hình (biên độ kéo điều chỉnh tốc độ)',
    badgeText: 'LEFT JOYSTICK',
  },
  {
    id: 'touch-camera-swipe',
    inputType: 'touch',
    action: 'Quan sát & Thu phóng',
    description: 'Vuốt 1 ngón trên vùng cảnh 3D để xoay camera, chụm 2 ngón để Zoom',
    badgeText: 'SWIPE / PINCH',
  },
  {
    id: 'touch-sprint-action',
    inputType: 'touch',
    action: 'Chạy nhanh (Sprint)',
    description: 'Nhấn giữ nút SPRINT bên phải hoặc chạm đúp để khóa chạy (RUN)',
    badgeText: 'HOLD / 2x TAP',
  },
  {
    id: 'touch-jump-action',
    inputType: 'touch',
    action: 'Nhảy (Jump)',
    description: 'Chạm nút JUMP bên phải để nhảy khi nhân vật đang trên mặt đất',
    badgeText: 'TAP JUMP',
  },
  {
    id: 'touch-multitouch-tip',
    inputType: 'touch',
    action: 'Điều khiển đa điểm',
    description: 'Một ngón tay kéo Joystick di chuyển, ngón tay khác vuốt xoay Camera cùng lúc',
    badgeText: 'MULTI-TOUCH',
  },
] as const;

export function getActiveControlGuideInstructions(isTouchGuideMode: boolean): readonly ControlInstruction[] {
  return isTouchGuideMode ? TOUCH_CONTROL_INSTRUCTIONS : DESKTOP_CONTROL_INSTRUCTIONS;
}
