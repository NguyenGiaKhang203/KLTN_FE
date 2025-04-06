// src/data/mockCourseDetail.js

const mockCourseDetail = {
  id: "course-001",
  title: "Khóa học bài tập cờ vua: Rèn luyện tư duy, làm chủ trận đấu! (Lưu hành nội bộ)",
  categories: ["Bài tập", "Chiến thuật", "Chiếu hết", "Tàn cuộc"],
  image: "/assets/banner.png", // hoặc import trực tiếp trong component
  description: "Bạn đã nắm vững các nguyên tắc cơ bản nhưng muốn cải thiện khả năng tính toán và chiến lược? Khóa học này sẽ cung cấp cho bạn hàng loạt bài tập thực chiến ở mọi giai đoạn:",
  highlights: [
    "Khai cuộc sáng tạo",
    "Trung cuộc phức tạp",
    "Tàn cuộc sắc bén",
  ],
  learnings: [
    "Bài tập cờ vua",
    "Chiến thuật, khai cuộc, trung cuộc, tàn cuộc",
    "Rèn luyện tư duy và kỹ năng chiến đấu",
    "Phối hợp chiếu hết, blindfold, bài tập thực chiến",
  ],
  lessons: [
    "Chiếu hết sau một nước",
    "Chiếu hết thẩm mỹ",
    "Chiến đấu với những câu đố 1",
    "Chiến đấu với những câu đố 2",
    "Vị trí Vancura",
    "Chiến thuật: Reloader",
    "Đe dọa chiếu hết (Hậu và Tượng)",
    "Blindfold",
    "Bài tập về tốt",
    "Chiến thuật",
    "Phối hợp chiếu hết",
    "Winning chess tactics for Junior",
    "Winning chess puzzles for kids volume 1: Bài tập dễ",
    "Cờ tàn",
    "Vương quốc cờ vua",
  ],
  price: 2500000,
  level: "Tất cả trình độ",
  studentsCount: 8,
  duration: "5 giờ 20 phút",
  lastUpdated: "10 Tháng Ba 2025",
  hasCertificate: true,
  materials: ["Bài tập"],
  requirements: ["Phù hợp cho giáo viên muốn tìm bài tập cho học viên"],
  targetAudience: ["Giáo viên", "Học sinh đã biết cơ bản", "Người yêu thích cờ vua"],
  
  classes: [
    {
      id: "class1",
      schedule: "Thứ 3 - 5 - 7 (19:00 - 21:00)",
      enrolled: 5,
      capacity: 8,
      teacher: "Thầy Nguyễn Văn A",
      address: "Phòng 101, Tòa A",
      startDate: "2025-04-10",
      endDate: "2025-06-10"
    },
    {
      id: "class2",
      schedule: "Thứ 2 - 4 - 6 (18:00 - 20:00)",
      enrolled: 8,
      capacity: 8,
      teacher: "Cô Trần Thị B",
      address: "Phòng 202, Tòa B",
      startDate: "2025-04-15",
      endDate: "2025-06-15"
    }
  ]
  
};

export default mockCourseDetail;
