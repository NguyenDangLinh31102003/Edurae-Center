# Hệ thống Tạp chí Khoa học - Đăng tải Bài báo & PDF

## 🎯 Mô tả dự án

Hệ thống web chuyên nghiệp để đăng tải và quản lý bài báo khoa học với khả năng upload file PDF. Được thiết kế theo phong cách tạp chí khoa học học thuật.

## 🚀 Tính năng chính

- ✅ Hiển thị danh sách bài báo với phân trang
- ✅ Xem chi tiết bài báo đầy đủ
- ✅ Đăng bài mới với thông tin tác giả, abstract, nội dung
- ✅ Upload file PDF kèm theo bài báo
- ✅ Upload hình ảnh minh họa
- ✅ Phân loại theo category (Nghiên cứu, Tổng quan, Kỹ thuật...)
- ✅ Quản lý từ khóa và tài liệu tham khảo
- ✅ Đếm lượt xem bài báo
- ✅ Giao diện responsive, chuyên nghiệp

## 📦 Công nghệ sử dụng

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Multer (upload files)
- CORS, dotenv

### Frontend
- React 18
- React Router DOM
- Axios
- TypeScript
- Vite

## 🔧 Cài đặt và chạy

### 1. Khởi động MongoDB

```powershell
# Đảm bảo MongoDB đang chạy trên localhost:27017
mongod
```

### 2. Backend

```powershell
cd backend
npm install
node server.js
```

Backend chạy tại: `http://localhost:9999`

### 3. Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:5173`

## 📁 Cấu trúc dự án

```
tintuc/
├── backend/
│   ├── models/
│   │   └── Article.js          # Schema MongoDB cho bài báo
│   ├── routes/
│   │   └── articles.js         # API routes
│   ├── middleware/
│   │   └── upload.js           # Multer config
│   ├── uploads/                # Thư mục lưu files
│   │   ├── pdfs/
│   │   └── images/
│   ├── .env                    # Config database
│   └── server.js               # Entry point
│
└── frontend/
    ├── src/
    │   ├── App.tsx             # Components chính
    │   ├── App.css             # Styling
    │   └── main.ts             # Entry point
    └── index.html
```

## 🔌 API Endpoints

### Articles

- `GET /api/articles` - Lấy danh sách bài báo (có phân trang, lọc)
- `GET /api/articles/:id` - Lấy chi tiết một bài báo
- `POST /api/articles` - Tạo bài báo mới (với upload PDF)
- `POST /api/articles/:id/images` - Upload hình ảnh cho bài báo
- `PUT /api/articles/:id` - Cập nhật bài báo
- `DELETE /api/articles/:id` - Xóa bài báo
- `GET /api/articles/meta/categories` - Lấy danh sách categories

### Query Parameters (GET /api/articles)

- `page` - Số trang (mặc định: 1)
- `limit` - Số bài/trang (mặc định: 10)
- `category` - Lọc theo category
- `status` - Lọc theo trạng thái (draft/published/archived)
- `search` - Tìm kiếm full-text

## 📝 Schema bài báo

```javascript
{
  title: String,              // Tiêu đề
  authors: [{                 // Danh sách tác giả
    name: String,
    affiliation: String,
    email: String
  }],
  abstract: String,           // Tóm tắt
  keywords: [String],         // Từ khóa
  content: String,            // Nội dung đầy đủ
  pdfFile: {                  // File PDF
    filename: String,
    path: String,
    size: Number
  },
  images: [{                  // Hình ảnh
    filename: String,
    path: String,
    caption: String
  }],
  category: String,           // Danh mục
  status: String,             // draft/published/archived
  publishDate: Date,          // Ngày đăng
  views: Number,              // Lượt xem
  references: [String]        // Tài liệu tham khảo
}
```

## 🎨 Giao diện

- **Trang chủ**: Grid layout hiển thị các bài báo với category badge, lượt xem, link PDF
- **Chi tiết bài báo**: Layout giống bài báo khoa học với abstract, nội dung, hình ảnh, references
- **Form đăng bài**: Multi-author support, upload PDF, textarea cho nội dung và references

## 📄 File mẫu

Bạn có thể thử đăng bài báo mẫu về "Ornamental Plant Health Index (OPHI)" với nội dung khoa học đầy đủ về đánh giá sức khỏe cây cảnh.

## 🔐 Bảo mật

- File upload được giới hạn kích thước (PDF: 10MB, Image: 5MB)
- Validate file type (chỉ chấp nhận PDF và hình ảnh)
- CORS được cấu hình cho local development

## 🚀 Phát triển tiếp

- [ ] Thêm authentication/authorization
- [ ] Editor WYSIWYG cho nội dung
- [ ] Hệ thống review và comments
- [ ] Export citation (BibTeX, APA...)
- [ ] Advanced search với filters
- [ ] Analytics và statistics
- [ ] Email notifications
- [ ] DOI integration

## 📧 Liên hệ

Nếu có vấn đề, hãy tạo issue hoặc liên hệ qua email.

---

**Happy Publishing! 📚🎓**
