# Hướng dẫn Deploy Frontend lên Vercel

## Tổng quan
Vercel là platform tốt nhất để deploy frontend React/Vite. Nó tự động detect và build ứng dụng của bạn mà không cần cấu hình phức tạp.

## Các bước deploy

### 1. Chuẩn bị
- Đảm bảo code đã được push lên GitHub
- Có tài khoản Vercel (đăng ký tại [vercel.com](https://vercel.com))

### 2. Tạo Project mới trên Vercel
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import repository GitHub: `NguyenDangLinh31102003/Edurae-Center`
4. Vercel sẽ tự động detect đây là Vite project

### 3. Cấu hình Project Settings
Trong phần **Configure Project**:

- **Framework Preset**: Vercel sẽ tự động detect là `Vite` ✅
- **Root Directory**: Chọn `frontend` ⚠️ **QUAN TRỌNG**
- **Build Command**: `yarn build` (hoặc để Vercel tự động)
- **Output Directory**: `dist` (hoặc để Vercel tự động)
- **Install Command**: `yarn install` (hoặc để Vercel tự động)

### 4. Environment Variables
Trong phần **Environment Variables**, thêm:

- **Key**: `VITE_API_URL`
- **Value**: `https://edurae-center.onrender.com/api` (URL backend của bạn)
- **Environment**: Chọn cả 3: Production, Preview, Development

### 5. Deploy
Click **Deploy** và chờ quá trình build hoàn tất (thường mất 2-3 phút).

## Cấu hình đã có sẵn

File `frontend/vercel.json` đã được tạo với các cấu hình:
- ✅ Build command: `yarn build`
- ✅ Output directory: `dist`
- ✅ Rewrites cho React Router (tất cả routes đều serve `index.html`)

## Sau khi deploy thành công

1. **URL Production**: Vercel sẽ cung cấp URL dạng `https://your-project.vercel.app`
2. **Custom Domain**: Có thể thêm custom domain trong Settings → Domains
3. **Auto Deploy**: Mỗi khi push code lên GitHub, Vercel sẽ tự động deploy lại

## Kiểm tra

1. ✅ Truy cập URL Vercel để xem ứng dụng
2. ✅ Kiểm tra console browser để đảm bảo API calls đang trỏ đúng đến backend
3. ✅ Test các routes (Home, Article Detail, Submit) để đảm bảo React Router hoạt động

## Troubleshooting

### ⚠️ LỖI 404: NOT_FOUND (Quan trọng nhất!)

Nếu bạn thấy lỗi **404: NOT_FOUND** sau khi deploy, đây là cách fix:

#### Nguyên nhân:
Vercel không tìm thấy file `index.html` vì **Root Directory** chưa được cấu hình đúng.

#### Cách fix:

1. **Vào Vercel Dashboard** → Chọn project `edurae-center`
2. **Settings** → **General** → Scroll xuống phần **Root Directory**
3. **Click "Edit"** và nhập: `frontend`
4. **Save** và chờ Vercel redeploy tự động

Hoặc nếu đang ở trang **Deployment**:
- Click vào **"..."** (3 chấm) → **"Redeploy"**
- Trước khi redeploy, vào **Settings** → **General** → Set **Root Directory** = `frontend`
- Sau đó redeploy lại

#### Kiểm tra sau khi fix:
- ✅ Build logs không có lỗi
- ✅ Deployment status là "Ready" (màu xanh)
- ✅ Truy cập URL và thấy ứng dụng React thay vì 404

### Nếu build fail:
- Kiểm tra log trong Vercel để xem lỗi cụ thể
- Đảm bảo Root Directory đã set đúng là `frontend` ⚠️ **QUAN TRỌNG**
- Kiểm tra Node version (Vercel tự động dùng version phù hợp)
- Đảm bảo file `frontend/vercel.json` đã được commit và push lên GitHub

### Nếu frontend không kết nối được backend:
- Kiểm tra `VITE_API_URL` đã set đúng chưa trong Environment Variables
- Đảm bảo backend đang chạy và accessible
- Kiểm tra CORS settings trong backend (đã có `app.use(cors())`)

### Nếu React Router không hoạt động (404 khi refresh):
- File `vercel.json` đã có rewrites config, đảm bảo nó đã được commit và push lên GitHub
- Nếu vẫn lỗi, kiểm tra lại file `frontend/vercel.json`

## So sánh Vercel vs Render cho Frontend

| Tính năng | Vercel | Render |
|-----------|--------|--------|
| Auto detect framework | ✅ Tự động | ❌ Cần config |
| Build time | ⚡ Nhanh (~2 phút) | 🐌 Chậm hơn (~5 phút) |
| Free tier | ✅ Generous | ✅ Có nhưng hạn chế |
| Custom domain | ✅ Free SSL | ✅ Free SSL |
| Serverless | ✅ Yes | ❌ No |
| CDN | ✅ Global CDN | ⚠️ Limited |

**Kết luận**: Vercel là lựa chọn tốt hơn cho frontend React/Vite! 🚀

