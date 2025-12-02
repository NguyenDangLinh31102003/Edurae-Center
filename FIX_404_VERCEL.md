# 🔧 Fix Lỗi 404 trên Vercel - Hướng dẫn nhanh

## Vấn đề
Bạn đang thấy lỗi **404: NOT_FOUND** khi truy cập `edurae-center.vercel.app`

## ✅ Giải pháp (Làm ngay!)

### Bước 1: Vào Settings của Project
1. Mở [Vercel Dashboard](https://vercel.com/dashboard)
2. Click vào project **edurae-center**
3. Vào tab **Settings** (ở trên cùng)

### Bước 2: Cấu hình Root Directory
1. Scroll xuống phần **General**
2. Tìm mục **Root Directory**
3. Click nút **"Edit"** (hoặc "Override")
4. Nhập: `frontend`
5. Click **Save**

### Bước 3: Redeploy
1. Vercel sẽ tự động trigger một deployment mới
2. Hoặc vào tab **Deployments** → Click **"..."** → **"Redeploy"**
3. Chờ build hoàn tất (2-3 phút)

### Bước 4: Kiểm tra
- ✅ Truy cập lại `edurae-center.vercel.app`
- ✅ Bạn sẽ thấy ứng dụng React thay vì lỗi 404

## ⚠️ Lưu ý quan trọng

1. **Root Directory phải là `frontend`** (không phải `.` hoặc để trống)
2. **File `frontend/vercel.json`** phải đã được commit và push lên GitHub
3. **Environment Variable `VITE_API_URL`** phải được set trong Settings → Environment Variables

## Nếu vẫn lỗi sau khi fix

1. Kiểm tra **Build Logs** trong Vercel để xem có lỗi gì không
2. Đảm bảo file `frontend/vercel.json` tồn tại và có nội dung:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. Kiểm tra file `frontend/package.json` có script `build` không
4. Đảm bảo code đã được push lên GitHub branch `main`

## Screenshot hướng dẫn

Trong Vercel Dashboard:
- **Settings** → **General** → **Root Directory** = `frontend` ✅

