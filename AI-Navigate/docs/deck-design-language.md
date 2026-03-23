# SafeMove AI -- Ngon ngu thiet ke Slide Deck

> Tai lieu nay dinh nghia ngon ngu thiet ke toan dien cho bo slide deck cua SafeMove AI.
> Moi slide duoc xay dung tren he thong thiet ke nhat quan: mau sac, typography, bo cuc, card, bieu do, ban do, va hoat hinh.
> Giong dieu: Toi, du lieu-forward, ban do-forward. Cam giac nhu nhin vao trung tam chi huy -- khong phai bai trinh bay doanh nghiep thong thuong.
> Moi lua chon thiet ke cung co y tuong rang day la cong nghe ha tang nghiem tuc cho van de nghiem tuc.

---

## 1. Phong cach nen (Background Style)

### 1.1 Nen mac dinh (Default Slide Background)

Gradient tuyen tinh doc tu `#0A0E1A` (tren) den `#111827` (duoi). Day la canvas cho da so slide -- sach, toi, khong xao nhang.

```css
background: linear-gradient(180deg, #0A0E1A 0%, #111827 100%);
```

**Su dung:** Moi slide noi dung tieu chuan, slide tieu de, slide phan cach section.

### 1.2 Nen nhan manh (Accent Slide Background)

Gradient mac dinh cong them glow dong tam Storm Blue `#2563EB` o 5% opacity. Vi tri: 70% ngang, 40% doc. Ban kinh glow: 600px. Dung cho slide nhan manh (tieu de, ket thuc, tiet lo so lieu chinh). Glow phai tinh te -- cam nhan hon la nhin thay. Goi y anh sang tu man hinh trong phong chi huy toi.

```css
background:
  radial-gradient(ellipse at 70% 40%, rgba(37, 99, 235, 0.05) 0%, transparent 70%),
  linear-gradient(180deg, #0A0E1A 0%, #111827 100%);
```

### 1.3 Nen ban do (Map Slide Background)

Ban do toi full-bleed (Mapbox Dark hoac tuong duong) render o 30% opacity phia sau toan bo noi dung. Style ban do: duong mau `#1E293B`, mat nuoc mau `#0F2942`, nhan xoa hoac o 10% opacity. Noi dung phai hoan toan doc duoc tren ban do. Ban do phai nhan dien duoc nhu luoi do thi nhung khong bao gio canh tranh voi noi dung tien canh.

```css
background:
  linear-gradient(180deg, rgba(10, 14, 26, 0.7) 0%, rgba(17, 24, 39, 0.7) 100%),
  url('dark-map-tile.png') center/cover;
```

**Su dung:** Bat ky slide nao thao luan ve dinh tuyen, vung ngap, van hanh cap thanh pho, hoac du lieu dia ly.

### 1.4 Nen du lieu (Data Background)

Gradient mac dinh cong them pattern luoi cham mo: cham `#1E293B`, duong kinh 2px, khoang cach 40px, 8% opacity. Goi y boi canh ky thuat/phan tich.

**Su dung:** Slide co bieu do, dashboard so lieu, hoac so do kien truc.

### 1.5 Quy tac bat buoc

**Khong bao gio dung nen trang hoac sang.** Moi slide ton tai trong vu tru van hanh toi cua SafeMove AI. Nen sang pha vo an du thuong hieu cua trung tam tri tue ngap lut. Neu noi dung can do tuong phan cao de doc, dung `#1E293B` la be mat sang nhat duoc phep va chu trang `#F8FAFC`.

---

## 2. He thong mau sac

### 2.1 Bang mau chinh thuong hieu

| Ten mau | Hex | RGB | Vai tro |
|---------|-----|-----|---------|
| Midnight | `#0A0E1A` | 10, 14, 26 | Nen sau nhat, canvas slide |
| Dark Navy | `#111827` | 17, 24, 39 | Diem cuoi gradient, be mat nang |
| Slate Surface | `#1E293B` | 30, 41, 59 | Nen the, khoi code, truong nhap |
| Storm Blue | `#2563EB` | 37, 99, 235 | Accent thuong hieu chinh, CTA, highlight chinh |
| Bright Blue | `#3B82F6` | 59, 130, 246 | Accent phu, trang thai hover, duong bieu do |
| Ice Cyan | `#22D3EE` | 34, 211, 238 | Du lieu thoi gian thuc, visualization ngap, duong tuyen |
| Electric Cyan | `#06B6D4` | 6, 182, 212 | Accent du lieu thay the, mau tuyen phu |

### 2.2 Bang mau canh bao va muc do (Alert/Severity)

| Muc do | Hex | RGB | Su dung |
|--------|-----|-----|---------|
| An toan / Binh thuong | `#10B981` | 16, 185, 129 | Tuyen an toan, trang thai tich cuc, thanh cong |
| Can trong / Di duoc | `#FBBF24` | 251, 191, 36 | Ngap rui ro thap, canh bao tu van |
| Anh huong | `#F97316` | 249, 115, 22 | Ngap vua, rui ro phuong tien, bao dong nang |
| Bi chan / Nghiem trong | `#EF4444` | 239, 68, 68 | Duong khong di duoc, canh bao nghiem trong, nguy hiem |
| Rui ro du doan | `#EF4444` o 30% | -- | Vung ngap du bao (dung voi do trong suot) |

### 2.3 Bang mau van ban va be mat (Text/Surface)

| Phan tu | Hex | Su dung |
|---------|-----|---------|
| Van ban chinh | `#F8FAFC` | Tieu de, body text chinh, stat |
| Van ban phu | `#CBD5E1` | Phu de, mo ta, doan body |
| Van ban ba | `#64748B` | Nhan, caption, metadata, timestamp |
| Van ban vo hieu | `#475569` | Phan tu khong hoat dong, placeholder |
| Be mat the | `#1E293B` | Nen the, container nang |
| Duong phan cach | `#334155` | Duong ke, vien, phan tach |
| Be mat hover | `#334155` | Trang thai hover the, highlight phan tu tuong tac |

### 2.4 Mau visualization ngap lut

| Phan tu visualization | Xu ly mau |
|----------------------|-----------|
| Vung ngap xac nhan (nong) | `#FBBF24` fill o 35% opacity, vien solid 1px o 60% |
| Vung ngap xac nhan (sau) | `#EF4444` fill o 40% opacity, vien solid 1.5px o 70% |
| Vung ngap du doan mo rong | `#EF4444` fill o 15% opacity, vien net dut 1px o 30% |
| Vung ngap rut | `#FBBF24` fill o 15% opacity, vien cham 1px, hoat hinh mo dan |
| Cam bien ngap hoat dong | `#22D3EE` cham 8px voi vong xung |
| Cam bien ngap offline | `#64748B` cham 6px, khong hoat hinh |

### 2.5 Quy tac su dung mau

- Toi da 4 mau du lieu trong mot bieu do.
- Mau muc do luon nhat quan xuyen suot deck: xanh la = an toan, vang = can trong, cam = anh huong, do = bi chan.
- Storm Blue chi dung cho accent thuong hieu va phan tu tuong tac, khong dung cho du lieu ngap.
- Flood Cyan / Ice Cyan dung rieng cho so lieu va highlight du lieu thoi gian thuc.
- Khong bao gio dung mau sac ngoai he thong da dinh nghia.

---

## 3. Phan cap Typography

### 3.1 Bang thong so kieu chu

| Phan tu | Font | Weight | Size | Line Height | Mau | Letter Spacing |
|---------|------|--------|------|-------------|-----|---------------|
| Tieu de slide | Inter | Bold (700) | 44px | 1.15 | `#F8FAFC` | -0.02em |
| Phu de | Inter | Regular (400) | 20px | 1.5 | `#CBD5E1` | 0 |
| Nhan section | Inter | Medium (500) | 12px | 1.4 | `#64748B` | 0.1em |
| Body text | Inter | Regular (400) | 18px | 1.6 | `#CBD5E1` | 0 |
| Body in dam | Inter | SemiBold (600) | 18px | 1.6 | `#F8FAFC` | 0 |
| Bullet text | Inter | Regular (400) | 16px | 1.7 | `#CBD5E1` | 0 |
| Data callout | JetBrains Mono | Bold (700) | 56px | 1.0 | `#F8FAFC` | -0.03em |
| Don vi du lieu | JetBrains Mono | Regular (400) | 20px | 1.0 | `#64748B` | 0 |
| Tieu de the | Inter | SemiBold (600) | 20px | 1.3 | `#F8FAFC` | 0 |
| Body the | Inter | Regular (400) | 14px | 1.6 | `#CBD5E1` | 0 |
| Code / Ky thuat | JetBrains Mono | Regular (400) | 14px | 1.5 | `#22D3EE` | 0 |
| Van ban trich dan | Inter | Regular Italic (400i) | 18px | 1.6 | `#CBD5E1` | 0 |
| Ghi cong | Inter | Medium (500) | 14px | 1.4 | `#64748B` | 0 |
| Chu thich | Inter | Regular (400) | 11px | 1.4 | `#475569` | 0 |

### 3.2 Quy tac Typography

1. **Can chinh:** Moi van ban can trai. Khong bao gio can giua body text. Can giua chi cho phep voi data callout don dong va nhan section tren slide stat rieng.
2. **Do dai dong toi da:** Body text khong vuot qua 680px chieu rong (khoang 75 ky tu) de duy tri kha nang doc.
3. **Rang buoc headline:** Tieu de slide nen 8 tu hoac it hon. Neu thong diep can nhieu hon, tach thanh tieu de + phu de.
4. **Quy tac data callout:** So hien thi bang JetBrains Mono Bold 56px phai luon di kem nhan don vi nho hon ngay ben duoi bang JetBrains Mono Regular 20px.
5. **Su dung chu hoa:** Chi cho nhan section (12px). Khong bao gio hoa headline, body text, hoac tieu de the.
6. **Khong gach chan de nhan manh.** Dung SemiBold weight hoac mau Storm Blue de nhan manh van ban trong doan body.
7. **Tieng Viet:** Line-height toi thieu 1.6 cho body text (dau phia tren can khoang cach). Kiem tra render dau tren moi font weight.

### 3.3 Quy tac can chinh

- Tieu de: can trai, goc trai tren, margin-top 80px, margin-left 80px.
- Body text: can trai, duoi tieu de, margin-left 80px.
- Data callout: can trai hoac can giua tuy bo cuc, luon dung JetBrains Mono.
- Nhan: can trai, uppercase, dung phia tren data callout hoac phia tren the.

---

## 4. Quy tac bo cuc (Layout Rules)

### 4.1 Canvas

- **Ti le khung hinh:** 16:9 (1920 x 1080px do phan giai tham chieu).
- **Padding vung an toan:** 80px bon phia. Khong phan tu noi dung nao (van ban, the, hinh anh) duoc vi pham vung 80px.
- **Vung noi dung ben trong:** 1760 x 920px.

### 4.2 Mau bo cuc chinh

- **Cot trai:** 55% chieu rong (968px) -- noi dung van ban (tieu de, phu de, body, bullet).
- **Cot phai:** 45% chieu rong (792px) -- hinh anh (ban do, bieu do, so do, minh hoa).
- **Khoang cach cot:** Toi thieu 48px giua cot van ban va hinh anh.
- **Can doc:** Noi dung van ban neo vao dau vung an toan. Hinh anh can giua doc trong cot phai.

### 4.3 Bo cuc thay the

| Bo cuc | Mo ta | Su dung |
|--------|-------|---------|
| Hinh anh toan man | Hinh chiem toan slide, van ban phu len voi gradient toi 60% tu trai | Slide hero, khoanh khac tac dong |
| Stat can giua | Mot data callout lon can giua, nhan duoi, khong noi dung khac | Tiet lo so lieu chinh |
| Ba cot | Ba cot bang nhau (544px, khoang cach 44px) | Slide so sanh, khung ba phan |
| Bon cot | Bon cot bang nhau (399px, khoang cach 37px) | Quy trinh tung buoc, luoi nang luc |
| Dashboard | Luoi 4-6 the sap xep 2x2 hoac 2x3 | Slide tong hop du lieu, mockup dashboard |
| Timeline | Duong ngang voi node, mo ta ben duoi | Luong quy trinh, lo trinh |

### 4.4 Quy tac mat do noi dung

1. **Toi da 5 bullet moi slide.** Neu can nhieu noi dung hon, tach qua nhieu slide.
2. **Toi da 6 the moi slide.** Sap xep luoi 2x3 hoac 3x2.
3. **Khoang trang toi thieu:** It nhat 30% dien tich slide phai la khong gian trong (khong noi dung, khong trang tri). Khoang trang la yeu to thiet ke, khong phai khong gian lang phi.
4. **Mot y tuong moi slide.** Moi slide phai rut gon duoc thanh mot cau duy nhat mo ta muc dich cua no.
5. **Khong tuong van ban.** Neu doan vuot qua 3 dong tren slide, phai viet lai thanh bullet hoac chuyen sang ghi chu dien gia.

---

## 5. He thong the (Card System)

### 5.1 The so lieu (Stat Card)

```
+-------------------------------------------+
|  [NHAN SECTION - 12px, uppercase, xam]    |
|                                            |
|  [DATA CALLOUT - 56px, JetBrains Mono]    |
|  [DON VI - 20px, xam]                     |
|                                            |
|  [Mo ta - 14px, toi da 2 dong]            |
+-------------------------------------------+
```

**Thong so:**
- Kich thuoc: 280px rong, 200px cao (cao linh hoat).
- Nen: `#1E293B`.
- Bo tron: 12px.
- Vien: 1px solid `#334155`.
- Accent tren: 3px solid phia tren, to mau theo danh muc (xanh duong cho cong nghe, xanh la cho ket qua tich cuc, cam cho canh bao, do cho nghiem trong).
- Padding: 24px.
- Bong: Khong mac dinh. Khi hover: `0 8px 32px rgba(0, 0, 0, 0.3)`.
- Toi da 4 stat card moi slide.

### 5.2 Badge canh bao (Alert Badge)

```
+------------------------------+
|  [Icon 16px]  [Nhan 12px]   |
+------------------------------+
```

**Thong so:**
- Kich thuoc: Tu dong rong, 28px cao.
- Nen: Mau muc do o 15% opacity.
- Vien: 1px solid mau muc do o 40% opacity.
- Bo tron: 6px.
- Padding: 4px 10px.
- Chu: Mau muc do o 100%, Inter Medium 12px uppercase.
- Icon: Mau muc do, 16px, ben trai nhan voi khoang cach 6px.

**Bien the badge:**

| Badge | Nen | Vien | Chu/Icon |
|-------|-----|------|----------|
| AN TOAN | `#10B981` 15% | `#10B981` 40% | `#10B981` |
| CAN TRONG | `#FBBF24` 15% | `#FBBF24` 40% | `#FBBF24` |
| ANH HUONG | `#F97316` 15% | `#F97316` 40% | `#F97316` |
| BI CHAN | `#EF4444` 15% | `#EF4444` 40% | `#EF4444` |
| DU DOAN | `#8B5CF6` 15% | `#8B5CF6` 40% | `#8B5CF6` |

### 5.3 Node pipeline (Pipeline Node)

```
    +-----------+
    |           |
    |   [Icon]  |    ---->
    |           |
    +-----------+
    [Nhan 14px]
    [Mo ta 12px]
```

**Thong so:**
- Vong tron: 88px, hoac hinh chu nhat bo tron 100x80px (bo tron 12px).
- Nen: `#1E293B`.
- Vien: 2px solid, to mau theo giai doan pipeline.
- Icon: 32px, can giua, cung mau voi vien.
- Nhan: Ben duoi node, Inter SemiBold 14px, trang.
- Mo ta: Ben duoi nhan, Inter Regular 12px, `#CBD5E1`, toi da 2 dong.
- Mui ten ket noi: 2px solid `#334155`, ngang, co dau mui ten. Pattern net dut hoat hinh khi trinh bay.

**Mau giai doan pipeline:**

| Giai doan | Mau vien/icon |
|-----------|--------------|
| Thu thap du lieu | `#475569` (Slate) |
| Phan tich AI | `#2563EB` (Storm Blue) |
| Dinh tuyen | `#10B981` (Emerald) |
| Hoc hoi | `#8B5CF6` (Violet) |
| Dau ra | `#22D3EE` (Ice Cyan) |

### 5.4 Khoi trich dan (Quote Block)

```
+-------------------------------------------+
|  "                                        |
|  [Van ban trich dan - 18px nghieng]       |
|                                           |
|  -- [Ten, In dam] [Chuc danh, Xam]       |
+-------------------------------------------+
```

**Thong so:**
- Kich thuoc: Toan chieu rong kha dung, cao tu dong.
- Nen: `#1E293B`.
- Bo tron: 12px.
- Vien trai: 4px solid `#2563EB`.
- Padding: 32px.
- Dau ngoac kep mo: Inter Bold 64px, `#2563EB` o 20% opacity, vi tri tuyet doi goc trai tren.
- Van ban trich dan: Inter Regular Italic 18px, `#CBD5E1`, line height 1.6.
- Ten ghi cong: Inter SemiBold 14px, `#F8FAFC`.
- Chuc danh: Inter Regular 14px, `#64748B`.
- Phan cach giua ten va chuc danh: dau phay hoac em-dash mau `#64748B`.

### 5.5 Node timeline

```
         [Nhan ngay]
             |
      +------O------+------
             |
     [Tieu de - 16px Bold]
     [Mo ta - 14px, 3 dong]
```

**Thong so:**
- Duong ngang: 2px solid `#334155`, trai dai toan chieu rong slide trong vung an toan.
- Vong tron node: 16px duong kinh, fill mau giai doan, vien trang 3px.
- Node hoat dong: Vong xung ngoai 32px duong kinh, mau giai doan o 20%, hoat hinh.
- Nhan ngay: Phia tren node, Inter Medium 12px uppercase, `#64748B`.
- Tieu de: Phia duoi node, Inter SemiBold 16px, `#F8FAFC`.
- Mo ta: Phia duoi tieu de, Inter Regular 14px, `#CBD5E1`, toi da 3 dong.
- Khoang cach giua node: Phan bo deu tren chieu rong kha dung.
- Node da hoan thanh: Fill mau giai doan. Node tuong lai: fill `#334155` voi vien mau giai doan.

---

## 6. Iconography

### 6.1 Thong so phong cach

- **Bo icon:** Lucide Icons (ma nguon mo, nhat quan, hien dai).
- **Do day net:** 1.5px (mac dinh Lucide, render sach o moi kich thuoc).
- **Phong cach goc:** Cap va join bo tron.
- **Fill:** Khong bao gio fill. Chi icon stroke-only de duy tri tham my ky thuat, nhe.

### 6.2 Quy tac kich thuoc

| Ngu canh | Kich thuoc | Vi du |
|----------|-----------|-------|
| Inline voi body text | 18px | Icon tien to bullet |
| Icon the | 24px | Icon danh muc stat card |
| Icon cot tinh nang | 32px | Tieu de tru cot nang luc |
| Icon pipeline node | 32px | Icon buoc luong quy trinh |
| Icon hero/highlight | 48px | Accent visual toan slide (hiem) |

### 6.3 Quy tac mau sac icon

1. **Mau icon mac dinh:** `#CBD5E1` (mau van ban phu) cho icon thong tin.
2. **Icon accent thuong hieu:** `#2563EB` (Storm Blue) cho icon di kem tinh nang chinh hoac CTA.
3. **Icon muc do:** Khop mau muc do cua ngu canh (xanh la cho an toan, cam cho can trong, v.v.).
4. **Icon tuong tac:** Mac dinh `#CBD5E1`, hover `#F8FAFC`, active `#2563EB`.
5. **Khong bao gio dung icon da mau.** Moi icon mot mau duy nhat. Khong gradient tren icon.

### 6.4 Anh xa icon khuyen nghi cho ngap-giao thong

| Khai niem | Ten icon Lucide | Su dung |
|-----------|----------------|---------|
| Phat hien ngap | `radio` | Tru cot PHAT HIEN, du lieu cam bien |
| Danh gia muc do | `gauge` | Tru cot DANH GIA, cham diem rui ro |
| Toi uu dinh tuyen | `route` | Tru cot DINH TUYEN, dieu huong |
| Hoc may | `brain-circuit` | Tru cot HOC HOI, he thong AI |
| Du lieu thoi gian thuc | `activity` | Feed truc tiep, du lieu streaming |
| Thoi tiet / Mua | `cloud-rain` | Nguon du lieu thoi tiet |
| Camera / Vision | `camera` | Phan tich camera giao thong |
| Canh bao / Warning | `alert-triangle` | Canh bao ngap, vung nguy hiem |
| Thanh pho / Chinh phu | `landmark` | Tinh nang chinh phu |
| Doi xe / Doanh nghiep | `truck` | Tinh nang doanh nghiep/logistics |
| Thoi gian / Du doan | `clock` | Cua so du doan, thoi gian |
| Co so du lieu | `database` | Pipeline du lieu, luu tru |
| API / Tich hop | `plug` | Tich hop bao ba |
| Ban do / Vi tri | `map-pin` | Tham chieu dia ly |
| Hieu suat / Toc do | `zap` | So lieu toc do, thoi gian thuc |
| Bao mat / Tin cay | `shield-check` | Tuan thu, bao mat du lieu |
| Bao cao / Tai lieu | `file-text` | Bao cao, dau ra phan tich |
| Mo phong | `flask-conical` | Dong co mo phong |
| Vong phan hoi | `refresh-cw` | Hoc lien tuc |
| Nguoi dung / Tai xe | `user` | Tinh nang nguoi dung cuoi |

---

## 7. Ban do & Visualization ngap lut

### 7.1 Phong cach ban do nen (Base Map)

- **Nha cung cap:** Mapbox Dark style (hoac style tuy chinh khop thong so nay).
- **Mau duong:** `#1E293B` (duong chinh), `#151D2E` (duong phu).
- **Do rong duong:** Huyet mach chinh 3px, duong phu 1.5px, duong nho 0.75px.
- **Mat nuoc:** `#0F2942` fill, khong vien.
- **Cong vien / khu vuc xanh:** `#0D1F17` fill, khong vien.
- **Mat bang toa nha:** `#151D2E` fill o 50% opacity (chi o z15+ zoom).
- **Nhan:** Xoa hoan toan hoac dat `#334155` o 40% opacity. Nhan ban do khong bao gio canh tranh voi overlay du lieu.
- **Nen (dat lien):** `#0F172A`.

### 7.2 Render vung ngap

#### Vung ngap xac nhan (xac minh boi cam bien hoac camera)

- Fill: mau muc do o 35-40% opacity.
- Vien: mau muc do o 60% opacity, 1.5px solid.
- Pattern ben trong: duong gon dong tam tinh te o 10% opacity goi y nuoc.
- Hoat hinh: chu ky xung nhe 3 giay (opacity dao dong giua 30% va 45%).

#### Vung ngap du doan (du bao mo hinh, chua xac nhan)

- Fill: `#EF4444` o 12-18% opacity (luon do, bat ke muc do du doan).
- Vien: `#EF4444` o 25% opacity, 1px net dut (dash 8px, gap 4px).
- Nhan: Badge "DU DOAN" noi tai trung tam vung.
- Hoat hinh: xung mo rong cham (canh vung tho ra ngoai 2px roi co lai, chu ky 4 giay).

#### Vung ngap rut (muc nuoc giam)

- Fill: `#FBBF24` o 10% opacity, mo dan.
- Vien: `#FBBF24` o 15% opacity, 1px cham.
- Hoat hinh: giam opacity dan trong 10 giay khi trang thai vung thay doi.

### 7.3 Render tuyen duong

| Loai tuyen | Mau | Do rong | Kieu | Hoat hinh |
|------------|-----|---------|------|-----------|
| An toan / Binh thuong | `#10B981` | 4px | Solid, cap bo tron | Khong (tinh) |
| Khuyen nghi dinh tuyen lai | `#22D3EE` | 4px | Solid, cap bo tron | Hoat hinh chay net dut (60px/giay) |
| Doan anh huong | `#F97316` | 4px | Net dut (dash 12px, gap 6px) | Xung cham (opacity 60-100%, chu ky 2 giay) |
| Doan bi chan | `#EF4444` | 5px | Solid voi dau X moi 80px | Tinh, do nhin thay cao |
| Tuyen thay the | `#3B82F6` | 3px | Solid, cap bo tron | Khong (tinh, opacity thap hon 60%) |
| Tuyen lich su (ma) | `#475569` | 2px | Cham | Khong (tinh) |

**Dau diem xuat phat:** Vong tron 12px, fill trang, vien 2px Storm Blue.
**Dau diem dich:** Vong tron 12px, fill Storm Blue, vien 2px trang.
**Diem trung gian:** Vong tron 8px, fill `#CBD5E1`, vien 1px `#334155`.

### 7.4 Diem cam bien va camera

| Loai diem | Hinh anh |
|-----------|----------|
| Cam bien ngap (hoat dong, binh thuong) | Vong tron 8px, fill `#10B981`, vien trang 2px |
| Cam bien ngap (hoat dong, phat hien) | Vong tron 8px, fill `#EF4444`, vien trang 2px, vong xung 16px mau `#EF4444` o 20% |
| Cam bien ngap (offline) | Vong tron 6px, fill `#475569`, vien 1px `#334155`, khong xung |
| Camera giao thong (hoat dong) | Hinh vuong bo tron 8px, fill `#22D3EE`, vien trang 2px |
| Camera giao thong (phat hien ngap) | Hinh vuong bo tron 8px, fill `#F97316`, vien trang 2px, tooltip icon camera |
| Tram thoi tiet | Hinh thoi 10px, fill `#3B82F6`, vien trang 2px |

---

## 8. Bieu do & Phong cach Dashboard

### 8.1 Nen tang bieu do

- **Nen:** `#0F172A` hoac `#1E293B` (nhat quan voi nen slide, khong bao gio trang).
- **Padding vung bieu do:** 16px ben trong container bieu do.
- **Duong luoi:** Chi ngang. `#334155` o 0.5px, 30% opacity. Toi da 5 duong luoi ngang.
- **Duong truc:** `#475569` o 1px. Truc X luon hien. Truc Y tuy chon (xoa neu duong luoi du tham chieu).
- **Nhan truc:** Inter Medium 12px, `#64748B`. Dau tick la duong 4px mau `#475569`.

### 8.2 Quy tac ma mau du lieu

| Loai du lieu | Gan mau |
|-------------|---------|
| Chuoi du lieu chinh | `#2563EB` (Storm Blue) |
| Chuoi du lieu phu | `#22D3EE` (Ice Cyan) |
| Gia tri tich cuc / thanh cong | `#10B981` (Emerald) |
| Gia tri tieu cuc / nguy hiem | `#EF4444` (Red) |
| Nguong canh bao | `#FBBF24` (Amber) |
| Trung tinh / Baseline | `#475569` (Slate) |
| Du bao / Du doan | Cung mau voi thuc te, nhung duong net dut va 50% opacity |
| Khoang tin cay | Cung mau voi chuoi, 10% opacity fill giua gioi han tren/duoi |

### 8.3 Loai bieu do va thong so

**Bieu do duong (chuoi thoi gian):**
- Do rong duong: 2px voi join bo tron.
- Diem du lieu: Vong tron 6px, chi hien khi hover (khong luon hien).
- Fill vung duoi duong: mau chuoi o 8% opacity, gradient mo ve 0% o day.
- Tooltip: the glassmorphism, hien timestamp + gia tri bang JetBrains Mono 14px.

**Bieu do cot:**
- Do rong cot: 60% khong gian kha dung moi danh muc.
- Bo tron cot: 4px chi goc tren.
- Mau cot: Storm Blue mac dinh. Dung mau muc do cho du lieu ngap phan loai.
- Hover: cot sang hon 15%, tooltip xuat hien.

**Dong ho do / Radial:**
- Track nen: `#1E293B`, do rong 8px.
- Cung gia tri: mau muc do, do rong 8px, cap bo tron.
- Gia tri trung tam: JetBrains Mono Bold 32px, trang.
- Nhan trung tam: Inter Regular 12px, `#64748B`.

**Ban do nhiet (cho luoi xac suat ngap):**
- Vien o: 1px `#0F172A` (tao luoi tinh te).
- Thang mau: `#111827` (0%) den `#FBBF24` (50%) den `#EF4444` (100%).
- Kich thuoc o: toi thieu 16x16px.
- Hover: vien o sang thanh trang, tooltip hien gia tri chinh xac.

### 8.4 Mau cap nhat thoi gian thuc

- **Diem du lieu moi den:** Diem hien dan trong 300ms, doan duong hoat hinh tu diem truoc (200ms).
- **Thay doi gia tri:** So morph (gia tri cu mo ra trong khi gia tri moi mo vao, crossfade 200ms). Neu gia tri tang dang ke, flash vien data callout bang Storm Blue 500ms.
- **Vuot nguong:** Khi gia tri vuot nguong muc do, phan tu bieu do bi anh huong flash mau muc do moi hai lan (200ms bat, 200ms tat, 200ms bat), sau do giu mau moi.
- **Chi bao du lieu cu:** Neu du lieu chua cap nhat trong khoang thoi gian du kien, overlay icon canh bao vang nhe (16px, `#FBBF24`) o goc phai tren container bieu do.

---

## 9. Phong cach so do kien truc (Architecture Diagram)

### 9.1 Thiet ke node

- **Hinh dang:** Hinh chu nhat bo tron, bo tron 12px.
- **Kich thuoc:** Chieu rong linh hoat (toi thieu 120px), cao 48-64px cho node tieu chuan, 80-100px cho thanh phan he thong chinh.
- **Nen:** To mau theo tang kien truc (xem ben duoi).
- **Vien:** 1.5px solid, sac do sang hon nhe so voi mau nen.
- **Nhan:** Inter SemiBold 14px, can giua, trang.
- **Nhan phu:** Inter Regular 11px, can giua, rgba(255,255,255,0.6).

### 9.2 Ma mau theo tang (Layer Color Coding)

| Tang kien truc | Nen node | Vien node | Su dung |
|---------------|----------|-----------|---------|
| Nguon du lieu | `#1E3A5F` | `#2563EB` 40% | Cam bien, API, camera, thoi tiet |
| Thu nhan / Pipeline | `#1E293B` | `#475569` | Kafka, xu ly du lieu, ETL |
| Tang AI / ML | `#1E1B4B` | `#6366F1` 40% | LLM, dong co RL, mo hinh ML |
| He thong Agent | `#2D1B69` | `#8B5CF6` 40% | Agent phat hien, agent muc do, v.v. |
| Tang ung dung | `#1A2E35` | `#22D3EE` 40% | API gateway, dich vu dinh tuyen, dashboard |
| Luu tru / Database | `#1C1917` | `#A16207` 40% | PostgreSQL, Redis, vector DB |
| Dich vu ben ngoai | `#1F2937` | `#6B7280` 40% | Google Maps, Mapbox, API bao ba |
| Dau ra / Nguoi dung | `#14342B` | `#10B981` 40% | Ung dung mobile, web dashboard, canh bao |

### 9.3 Mui ten ket noi (Connecting Arrows)

- **Kieu:** Duong thang hoac duong vuong goc mot goc uon. Khong dung mui ten cong (duy tri do chinh xac ky thuat).
- **Do day duong:** 1.5px.
- **Mau:** `#475569` cho luong du lieu tieu chuan. `#2563EB` cho duong chinh/quan trong. `#EF4444` cho duong loi/du phong.
- **Dau mui ten:** Tam giac fill, 8px rong, 6px cao, khop mau duong.
- **Pattern net dut cho luong khong dong bo/tuy chon:** 6px dash, 4px gap.
- **Hoat hinh (khi trinh bay):** Net dut chay theo huong di chuyen du lieu, 40px/giay.

### 9.4 Quy uoc gan nhan module

- **Ten he thong:** Ben trong node, Inter SemiBold 14px, trang.
- **Tag cong nghe:** Duoi ten he thong hoac ngoai node, Inter Regular 11px, `#64748B`. Vi du: "PostgreSQL + PostGIS" hoac "GPT-4 Fine-tuned".
- **Badge phien ban/trang thai:** Badge pill nho (xem thong so Alert Badge) gan vao goc phai tren node. Vi du: "v2.1" hoac "BETA".
- **Nhom:** Node lien quan co the bao trong hinh chu nhat net dut (`#334155`, 1px net dut, bo tron 12px) voi nhan nhom o goc trai tren (Inter Medium 11px, `#64748B`).

### 9.5 Huong luong du lieu (Data Flow Direction)

- **Huong chinh:** Trai sang phai (du lieu chay tu nguon ben trai den nguoi dung ben phai).
- **Huong phu:** Tren xuong duoi trong mot tang (giai doan xu ly chay xuong).
- **Vong phan hoi:** Phai sang trai, ve phia duoi duong luong chinh, dung duong net dut `#8B5CF6` de phan biet voi luong tien.
- **Xep chong doc:** Khi hien thi tang kien truc, Nguon du lieu o duoi, Ung dung/Nguoi dung o tren. Du lieu chay len tren.
- **Luon co nhan tren mui ten** cho luong du lieu: "Du lieu ngap", "Diem tin cay", "Phan hoi tai xe".
- Nhan mui ten: Inter Regular 10px, `#64748B`.

---

## 10. Huong dan hoat hinh (Animation Guidelines)

### 10.1 Chuyen tiep slide (Slide Transitions)

- **Chuyen tiep mac dinh:** Fade qua den. Thoi luong: 400ms. Easing: ease-in-out.
- **Chuyen tiep thay doi section:** Fade den Midnight (`#0A0E1A`) roi fade vao slide tiep. Thoi luong: 600ms tong (300ms ra, 300ms vao).
- **Khong bao gio dung:** Slide, push, wipe, zoom, flip, hoac bat ky chuyen tiep lam mau nao. Chi fade. Noi dung phai thu hut chu y, khong phai chuyen tiep.
- **Thoi gian giua slide:** Khi trinh bay truc tiep, toi thieu 1.5 giay giua hoan thanh chuyen tiep va bat dau noi ve noi dung slide moi (cho phep khan gia dinh huong).

### 10.2 Hoat hinh tiet lo noi dung

#### Van ban xuat hien

- Headline: fade in + translate len 16px. Thoi luong: 400ms. Easing: ease-out. Delay: 100ms sau khi chuyen tiep slide hoan thanh.
- Phu de: fade in + translate len 12px. Thoi luong: 400ms. Delay: 200ms sau headline.
- Body/bullet: tiet lo so le. Moi bullet fade in + translate len 8px. Thoi luong: 300ms moi bullet. Stagger delay: 120ms giua bullet.

#### Tiet lo Data Callout

- Hoat hinh dem len tu 0 den gia tri cuoi. Thoi luong: 1200ms. Easing: ease-out-expo (nhanh dau, giam toc). Dinh dang: so voi dau phay/thap phan phu hop, cap nhat toi thieu 30fps.
- Nhan don vi fade in sau khi so dat gia tri cuoi (200ms fade, khong delay).
- Neu so dai dien phan tram, hoat hinh van ban dong thoi voi fill thanh tien trinh hoac cung gauge.

#### Tiet lo the (Card)

- The fade in + scale tu 0.95 den 1.0. Thoi luong: 400ms. Easing: ease-out.
- Khi nhieu the xuat hien, stagger: 100ms delay giua moi the, thu tu trai-sang-phai hoac tren-xuong-duoi.
- Khong hieu ung nay hoac vuot qua. Chi giam toc sach.

### 10.3 Hoat hinh ban do (Map Animations)

#### Vung ngap xuat hien

- Vung xuat hien tu mot diem (tam vung ngap) va mo rong dong tam den pham vi day du. Thoi luong: 800ms. Easing: ease-out.
- Opacity tang tu 0% den opacity muc tieu trong qua trinh mo rong.
- Vien tu ve (animated stroke-dashoffset) sau khi fill dat pham vi day du. Thoi luong: 400ms.

#### Tuyen duong ve

- Duong tuyen ve tu diem xuat phat den dich dung animated stroke-dashoffset. Toc do: khoang 200px moi giay (dieu chinh theo do dai tuyen de hoan thanh trong 2-4 giay).
- Cham sang (8px, trang, 80% opacity) di chuyen doc tuyen khi ve, de lai duong mau phia sau.
- Tai dich: cham mo rong ngan (12px) roi on dinh thanh dau diem dich.

#### Kich hoat cam bien

- Cham cam bien fade in o 50% opacity, sau do pulse len 100% va kich hoat hoat hinh vong xung. Thoi luong: 600ms.
- Nhieu cam bien co the kich hoat theo mau song lan (100ms stagger, lan tu vung ngap ra ngoai).

#### Muc nuoc dang (cho visualization do sau)

- Fill xanh dang tu day container/mat cat. Thoi luong: 1500ms. Easing: ease-in-out (nuoc co ve tang toc roi on dinh).
- Hoat hinh song tinh te tren be mat nuoc (bien do 2px song sin, chu ky 3 giay).

### 10.4 Stagger bullet point

- Moi bullet xuat hien lan luot.
- Delay: 120ms giua moi bullet.
- Kieu: fade-in + translate-up 8px.
- Thoi luong moi bullet: 300ms.
- Easing: ease-out.

### 10.5 Quy tac hieu suat va kiem che

1. **Toi da 3 hoat hinh dong thoi moi slide.** Nhieu hon tao hon loan thi giac va pha loang tu su.
2. **Khong hoat hinh nao vuot qua 2000ms** (quy tac 2 giay). Neu khan gia cho hoat hinh ket thuc, no qua cham.
3. **Moi hoat hinh phai phuc vu kha nang hieu.** Neu xoa hoat hinh khong giam su hieu biet, xoa hoat hinh.
4. **Uu tien hoat hinh opacity + transform** hon thay doi mau hoac kich thuoc. Chung muot hon (GPU-composited) va cam thay trau chuot hon.
5. **Kha nang tiep can: moi hoat hinh phai ton trong `prefers-reduced-motion`.** Cung cap fallback tinh cho moi phan tu hoat hinh. Trong che do trinh bay, co phien ban "khong hoat hinh" cua deck san sang.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Phu luc: Checklist kiem tra slide

Moi slide phai vuot qua 7 diem kiem tra nay:

1. **Nen:** Gradient toi, accent, ban do, hoac bien the du lieu. Khong bao gio trang.
2. **Tieu de:** Can trai, Inter Bold 44px, 8 tu hoac it hon, trang.
3. **Noi dung:** Toi da 5 bullet hoac 6 the. 30%+ khoang trang.
4. **Du lieu:** So bang JetBrains Mono Bold. Luon co nhan don vi.
5. **Mau:** Toi da 3 mau accent moi slide (ngoai xam van ban va nen).
6. **Can chinh:** Moi phan tu snap vao luoi 8px. Canh trai cua phan tu van ban thang hang.
7. **Thuong hieu:** Wordmark SafeMove AI o goc trai duoi, 11px, `#475569`. So slide o goc phai duoi, 11px, `#475569`.

### Tham chieu nhanh mau sac

```
Nen:          #0A0E1A  #111827  #1E293B
Brand Blue:   #2563EB  #3B82F6  #60A5FA
Data Cyan:    #06B6D4  #22D3EE
Muc do:       #10B981  #FBBF24  #F97316  #EF4444
Van ban:      #F8FAFC  #CBD5E1  #64748B  #475569
Vien:         #334155
```

### Tham chieu nhanh font

```
Tieu de:      Inter Bold 44px          #F8FAFC
Phu de:       Inter Regular 20px       #CBD5E1
Body:         Inter Regular 18px       #CBD5E1
Bullet:       Inter Regular 16px       #CBD5E1
So lon:       JetBrains Mono Bold 56px #F8FAFC
Nhan:         Inter Medium 12px UC     #64748B
```

---

*Tai lieu chuan bi cho thiet ke slide deck SafeMove AI. Moi thong so san sang cho thiet ke slide, thu vien component Figma, hoac trien khai truc tiep trong cong cu trinh bay.*

**SafeMove AI** -- Tri tue di chuyen nhan biet ngap lut.
Copyright 2026. Moi quyen duoc bao luu.
