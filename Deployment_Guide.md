# 🚀 คู่มือการแยกไฟล์และอัปโหลด (Deployment Guide)

ในระบบ **Web V.1** แบบใหม่ เราจะแยกโค้ดออกเป็น 2 ส่วนอย่างชัดเจน (Decoupled Architecture) เพื่อให้ระบบทำงานได้เร็วขึ้น ปลอดภัยขึ้น และจัดการง่ายขึ้น

---

## 1. ฝั่ง Backend (PHP & Data)
**โฟลเดอร์:** `Backend_PHP/`
**สถานที่อัปโหลด:** เซิร์ฟเวอร์จริง `https://iwasam.com/student_project/b/T01/`

**หน้าที่หลัก:**
- รับข้อมูลจากบอร์ด ESP32
- บันทึกข้อมูลลงไฟล์ (`.json`, `.csv`)
- ทำหน้าที่เป็น API ส่งข้อมูลให้หน้าเว็บ

**ไฟล์ที่ต้องเอาไปไว้ใน iwasam.com:**
- `heartbeat.php` (จัดการ Auto-Provisioning)
- `data_update.php` (รับค่าจากเซ็นเซอร์)
- `api.php` (ส่งข้อมูลให้ Frontend วาดกราฟ)
- โฟลเดอร์ `data/` และ `config/` (ที่เก็บไฟล์ JSON)

*(หมายเหตุ: ไฟล์กลุ่มนี้จะทำงานเงียบๆ อยู่เบื้องหลัง ผู้ใช้ทั่วไปจะมองไม่เห็น)*

---

## 2. ฝั่ง Frontend (หน้าเว็บผู้ใช้งาน)
**โฟลเดอร์:** `Frontend_Web/`
**สถานที่อัปโหลด:** `GitHub Pages`, `Vercel`, `Netlify` หรือ Host อื่นๆ ที่รองรับ HTML (หรือจะเอาไว้บน iwasam.com ด้วยก็ได้ แต่แยกออกมาจะโหลดเร็วกว่า)

**หน้าที่หลัก:**
- แสดงหน้าตาเว็บไซต์สวยงาม (UI)
- วาดกราฟ (Chart.js), แสดงปุ่มกด, แผนที่
- ดึงข้อมูลจาก `api.php` ของ iwasam.com มาโชว์ (ผ่าน Fetch API)

**ไฟล์ที่ต้องเอาไปไว้ใน GitHub:**
- `index.html` (หน้าหลัก)
- `style.css` (ไฟล์ตกแต่งสีสัน)
- `script.js` (ไฟล์ JavaScript ที่ใช้ดึง API และวาดกราฟ)

---

### 🔄 สรุปภาพรวมการทำงาน
1. **บอร์ด ESP32** $\rightarrow$ ส่งข้อมูล $\rightarrow$ **iwasam.com (Backend)**
2. **ผู้ใช้** $\rightarrow$ เปิดหน้าเว็บ $\rightarrow$ **GitHub Pages (Frontend)**
3. **Frontend** $\rightarrow$ ขอข้อมูลผ่าน API $\rightarrow$ **iwasam.com** ตอบกลับมาเป็นตัวเลขเพื่อวาดกราฟ
