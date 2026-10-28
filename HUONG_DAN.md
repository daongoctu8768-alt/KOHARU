# Cài app Koharu lên điện thoại (có đồng bộ)

Mất khoảng 10 phút, chỉ làm một lần. Làm trên máy tính.

## Bước 1: Tạo Firebase (chỗ lưu tiến độ, miễn phí)
1. Vào https://console.firebase.google.com, đăng nhập Google, bấm **Create a project** (tạo dự án) và đặt tên, ví dụ `koharu`. Có thể tắt Google Analytics.
2. Trong menu **Build → Authentication → Get started**, chọn **Google**, bật **Enable** rồi **Save**.
3. Trong menu **Build → Firestore Database → Create database**, chọn vị trí `asia-northeast1` hoặc `asia-southeast1`, chọn **production mode** rồi bấm Create.
4. Vào tab **Rules** của Firestore, xóa hết nội dung rồi dán nội dung file `firestore.rules`, bấm **Publish**.
5. Vào **⚙ Project settings**, kéo xuống mục *Your apps*, bấm biểu tượng **</>** (Web). Đặt tên rồi bấm Register.
   Firebase sẽ hiện một đoạn `const firebaseConfig = { ... }`. **Copy phần `{ ... }` đó gửi cho Claude**, Claude sẽ dán vào app giúp ní.
   (Hoặc tự mở `firebase-config.js` và sửa `null` thành phần `{ ... }` đó.)

## Bước 2: Đưa app lên mạng (Netlify, miễn phí)
1. Giải nén `Koharu.zip` (đã có config) ra một thư mục.
2. Vào https://app.netlify.com/drop và **kéo cả thư mục** đó vào trang.
3. Netlify sẽ cho một link, ví dụ `https://abc-123.netlify.app`. Nên tạo tài khoản Netlify để link không bị xóa sau 1 giờ.
4. Quay lại Firebase, vào **Authentication → Settings → Authorized domains → Add domain**, rồi dán `abc-123.netlify.app` (không có https://).

## Bước 2 (cách khác): Đưa app lên GitHub Pages (miễn phí, link cố định)
1. Vào https://github.com/signup để tạo tài khoản (ví dụ tên `michael91`).
2. Bấm dấu **+** ở góc trên bên phải, chọn **New repository**.
   - Repository name: `koharu`
   - Chọn **Public** (GitHub Pages miễn phí yêu cầu Public; config Firebase để công khai cũng an toàn vì đã có rules bảo vệ dữ liệu).
   - Bấm **Create repository**.
3. Trong trang repo vừa tạo, bấm link **uploading an existing file** (hoặc **Add file → Upload files**).
4. Giải nén `Koharu.zip`, mở thư mục `koharu`, chọn **tất cả file bên trong** (index.html, decks.js, sw.js, …) rồi kéo vào trang. Lưu ý: kéo các file, không kéo cả thư mục.
5. Kéo xuống dưới và bấm **Commit changes**.
6. Vào tab **Settings**, chọn **Pages** ở menu trái. Ở mục *Build and deployment*: Source chọn **Deploy from a branch**, Branch chọn **main** và **/(root)**, rồi bấm **Save**.
7. Đợi 1–2 phút rồi tải lại trang Pages. Sẽ hiện link `https://michael91.github.io/koharu/`. Đó là app của ní.
8. Vào Firebase, chọn **Authentication → Settings → Authorized domains → Add domain** và thêm `michael91.github.io`.

Khi Claude gửi bản cập nhật: vào repo, chọn **Add file → Upload files**, kéo file mới vào (ghi đè) rồi bấm Commit. Khoảng 1 phút sau app trên điện thoại tự cập nhật.

## Bước 3: Cài lên điện thoại
- **Android (Chrome):** mở link, bấm menu ⋮ rồi chọn **Cài đặt ứng dụng** (hoặc "Thêm vào màn hình chính").
- **iPhone (Safari):** mở link, bấm nút Chia sẻ rồi chọn **Thêm vào MH chính**.
- Mở app, bấm **Googleでログインして同期** và đăng nhập cùng một tài khoản Google trên mọi máy. Thấy 「✓ 同期済み」 là đã đồng bộ.

App vẫn chạy khi mất mạng. Có mạng lại thì tiến độ tự đồng bộ.
