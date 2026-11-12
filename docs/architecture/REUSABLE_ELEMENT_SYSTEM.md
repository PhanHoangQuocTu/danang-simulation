# Reusable elements

Prefab là definition versioned chứa asset/material/LOD/collision/interaction profile IDs; element là placement có transform độc lập, zone và source reference. Factory registry theo ID, không switch theo tên thành phố. Zod validate trước runtime. Shared geometry/material immutable; highlight material của instance tương tác phải clone hoặc per-instance state.

Acceptance bắt buộc: nhiều instances khác transform/metadata dùng một prefab; shared assets không bị dispose bởi instance; nhiều zones dùng cùng prefab; thêm definition không sửa engine; unknown references và duplicate IDs phải lỗi. Pipeline chưa được chứng minh bằng rendering cho đến browser QA.
