# 🔧 Fix Lỗi Node.js Version cho Frontend

## Vấn đề
```
You are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+.
```

## ✅ Giải pháp

### Cách 1: Upgrade Node.js (Khuyến nghị)

1. **Kiểm tra version hiện tại:**
   ```powershell
   node --version
   ```

2. **Download và cài đặt Node.js mới nhất:**
   - Vào [nodejs.org](https://nodejs.org/)
   - Download **LTS version** (22.12+ hoặc 24.x)
   - Cài đặt và restart terminal

3. **Kiểm tra lại:**
   ```powershell
   node --version
   npm --version
   ```

4. **Chạy lại frontend:**
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

### Cách 2: Sử dụng nvm-windows (Quản lý nhiều Node versions)

1. **Cài đặt nvm-windows:**
   - Download từ: [github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
   - Cài đặt `nvm-setup.exe`

2. **Cài đặt Node.js 22.12+ hoặc 20.19+:**
   ```powershell
   nvm install 22.12.0
   nvm use 22.12.0
   ```

3. **Kiểm tra:**
   ```powershell
   node --version
   ```

### Cách 3: Downgrade Vite (Tạm thời)

Nếu không thể upgrade Node.js ngay, có thể downgrade Vite:

1. **Sửa `frontend/package.json`:**
   ```json
   "devDependencies": {
     "vite": "^6.0.0"  // Thay vì ^7.2.4
   }
   ```

2. **Cài đặt lại:**
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

⚠️ **Lưu ý:** Cách này không khuyến nghị vì có thể thiếu các tính năng mới của Vite 7.

## Kiểm tra sau khi fix

```powershell
cd frontend
npm run dev
```

Bạn sẽ thấy:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Troubleshooting

### Nếu vẫn lỗi sau khi upgrade Node.js:
1. Xóa `node_modules` và `package-lock.json`:
   ```powershell
   cd frontend
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   npm install
   ```

2. Restart terminal/IDE để load Node.js version mới

3. Kiểm tra PATH environment variable có trỏ đúng Node.js mới không

