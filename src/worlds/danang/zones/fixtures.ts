import type { InteractableDefinition } from '@/engine/core/type';
export const INITIAL_INTERACTABLE_FIXTURES: readonly InteractableDefinition[] = [
  {
    id: 'fixture-origin-monolith',
    type: 'inspect',
    label: 'Cột Mốc Tọa Độ Trung Tâm (Test Fixture)',
    actionLabelVi: 'Quan sát cột mốc',
    actionLabelEn: 'Inspect Survey Monolith',
    description:
      'Cột mốc chuẩn hệ trục thế giới cục bộ (-Z/+X) đặt tại rìa Quảng trường Xuất phát để kiểm thử Raycasting và khoảng cách tương tác.',
    detailPoints: [
      'Loại tương tác: INSPECT (Khảo sát đối tượng tại chỗ)',
      'Tọa độ thế giới cục bộ: X = -3.20m, Z = -4.50m',
      'Bán kính tương tác tối đa: 4.60m tính từ gốc nhân vật (Player Root)',
    ],
    maxDistance: 4.6,
    enabled: true,
    worldPosition: [-3.2, 0, -4.5],
    accentColorHex: 0x0ea5e9,
  },
  {
    id: 'fixture-weather-telemetry-post',
    type: 'information',
    label: 'Trạm Dữ Liệu Khí Tượng Thử Nghiệm',
    actionLabelVi: 'Xem thông tin trạm',
    actionLabelEn: 'Read Telemetry Station',
    description:
      'Trạm thu phát tín hiệu thời tiết và vị trí mặt trời thời gian thực (Asia/Ho_Chi_Minh GMT+7) phục vụ kiểm thử Contextual Information Panel.',
    detailPoints: [
      'Loại tương tác: INFORMATION (Mở bảng thông tin ngữ cảnh chi tiết)',
      'Đồng bộ trực tiếp với Open-Meteo API và bộ tính toán thiên văn Đà Nẵng',
      'Tọa độ thế giới cục bộ: X = +4.20m, Z = -4.20m',
    ],
    maxDistance: 4.8,
    enabled: true,
    worldPosition: [4.2, 0, -4.2],
    accentColorHex: 0x10b981,
  },
  {
    id: 'fixture-calibration-beacon',
    type: 'activate',
    label: 'Đèn Hiệu Chuẩn Tương Tác (Beacon)',
    actionLabelVi: 'Bật / Tắt đèn hiệu',
    actionLabelEn: 'Toggle Calibration Beacon',
    description:
      'Trụ đèn hiệu chuẩn năng lượng cho phép người chơi kích hoạt hoặc ngắt trạng thái hoạt động trực tiếp trong không gian 3D.',
    detailPoints: [
      'Loại tương tác: ACTIVATE (Chuyển đổi trạng thái vật thể 3D)',
      'Phản hồi trực quan: Thay đổi màu lõi năng lượng và tốc độ vòng xoay',
      'Tọa độ thế giới cục bộ: X = 0.00m, Z = -6.80m',
    ],
    maxDistance: 5.0,
    enabled: true,
    worldPosition: [0.0, 0, -6.8],
    accentColorHex: 0xf59e0b,
  },
] as const;
