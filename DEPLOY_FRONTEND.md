# Hướng dẫn Deploy Frontend lên Render

## Vấn đề hiện tại
Render đang chạy backend server (`node server.js`) thay vì frontend. Để deploy frontend, bạn cần tạo một Web Service mới trên Render.

## Các bước cấu hình trên Render

### 1. Tạo Web Service mới cho Frontend
- Vào Render Dashboard → New → Web Service
- Kết nối với repository GitHub của bạn

### 2. Cấu hình Build & Deploy
- **Root Directory**: `frontend`
- **Environment**: `Node`
- **Build Command**: `yarn build` (hoặc `npm run build`)
- **Start Command**: `yarn start` (hoặc `npm start`)

### 3. Environment Variables
Thêm các biến môi trường sau:
- `VITE_API_URL`: URL của backend API (ví dụ: `https://your-backend.onrender.com/api`)
- `PORT`: Render sẽ tự động set, không cần config

### 4. Node Version
- Chọn Node.js version: `22.x` hoặc `20.x`

## Lưu ý
- Frontend và Backend cần được deploy thành 2 Web Service riêng biệt
- Backend URL sẽ là: `https://your-backend.onrender.com`
- Frontend URL sẽ là: `https://your-frontend.onrender.com`
- Đảm bảo `VITE_API_URL` trong frontend trỏ đúng đến backend API

## Kiểm tra
Sau khi deploy thành công:
1. Frontend sẽ build và tạo thư mục `dist/`
2. Server Express sẽ serve các file static từ `dist/`
3. Truy cập URL của frontend service để xem ứng dụng

