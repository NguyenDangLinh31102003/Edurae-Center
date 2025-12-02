# HƯỚNG DẪN ĐIỀN FORM ĐĂNG BÀI BÁO OPHI

## 📋 Các bước thực hiện

### 1. Chạy Backend và Frontend

```powershell
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Truy cập: `http://localhost:5173` → Click **"Đăng bài mới"**

---

## 📝 Điền thông tin theo form

### 🔹 **Tiêu đề (Title)**
```
Developing a Quantitative Health Index for Ornamental and Bonsai Plants Using Sensors and Computer Vision: Proposal of the OPHI Score
```

---

### 👥 **Tác giả (Authors)**

**Tác giả 1:**
- **Họ tên**: Emily R. Carter
- **Đơn vị**: Department of Environmental Horticulture, University of Florida, Gainesville, FL, USA
- **Email**: emily.carter@ufl.edu

Click **"+ Thêm tác giả"**

**Tác giả 2:**
- **Họ tên**: Miguel A. Fernández
- **Đơn vị**: Horticulture and Product Physiology Group, Wageningen University & Research, Wageningen, The Netherlands
- **Email**: (để trống)

Click **"+ Thêm tác giả"**

**Tác giả 3:**
- **Họ tên**: Hana Suzuki
- **Đơn vị**: Graduate School of Agriculture, Kyoto University, Kyoto, Japan
- **Email**: (để trống)

---

### 📂 **Danh mục (Category)**
Chọn: **Nghiên cứu** (research)

---

### 📄 **Tóm tắt (Abstract)**
```
Ornamental and bonsai plants are typically assessed using subjective visual judgment of leaf color, soil moisture and pest damage, which can lead to misdiagnosis and inappropriate care, especially among novice growers. This study proposes a quantitative set of criteria and an integrated Ornamental Plant Health Index (OPHI) based on four measurable components: (1) leaf color / chlorophyll, (2) root density and deformation, (3) soil moisture, and (4) pest and disease incidence and severity. The criteria are derived from a literature review on the use of SPAD meters and CIE L*a*b* color values for chlorophyll estimation (Percival et al., 2008; Wei et al., 2024), root growth and deformation in container-grown plants (Judd et al., 2015; Ownley et al., 1990), soil moisture effects on plant performance (Odhiambo & Aguyoh, 2022; Zhang et al., 2002), and disease assessment methods for ornamentals (Hansen, 2009; Harmon, 2018).

To illustrate the proposed framework, we generated a simulated dataset of 120 container-grown ornamental and bonsai plants with values distributed according to thresholds reported in the literature. The OPHI score is normalized to a 0–100 scale and categorized into three health classes: healthy (≥ 80), moderate (60–79), and poor (< 60). In the simulated dataset, 62.5% of plants were classified as healthy, 25.8% as moderate, and 11.7% as poor. The OPHI framework is designed for integration into smartphone applications and low-cost IoT systems, allowing growers to assess plant health from sensor data and images rather than relying solely on subjective judgment.
```

---

### 🏷️ **Từ khóa (Keywords)**
```
ornamental plants, bonsai, plant health, SPAD, soil moisture, root deformation, plant disease, computer vision, IoT
```

---

### 📖 **Nội dung (Content)**

**Sao chép toàn bộ phần từ "1. Introduction" đến hết "6. Conclusions and Future Work"**

```
1. Introduction

Ornamental and bonsai plants represent a high-value segment of container-grown crops, widely used in indoor and outdoor spaces for aesthetic and cultural purposes. Plant health in these systems depends on multiple factors including nutrient status, water availability, root architecture, pest and disease pressure, and environmental conditions. In practice, most growers—particularly hobbyists—evaluate plant health using subjective visual cues, such as leaf greenness, wilting, or visible lesions, sometimes combined with tactile assessment of soil moisture.

Meanwhile, a substantial body of research has demonstrated that physiological and environmental indicators can be measured quantitatively:

SPAD meters provide non-destructive measurements that correlate strongly with leaf chlorophyll and nitrogen status in trees and ornamentals (Percival et al., 2008; Pinzón-Sandoval et al., 2022).

The combination of SPAD readings and CIE L*a*b* color values can predict chlorophyll and carotenoid concentrations across multiple species (Wei et al., 2024; Villegas-Velázquez et al., 2022).

[... tiếp tục sao chép toàn bộ nội dung cho đến hết phần 6 ...]

6. Conclusions and Future Work

This study:

Synthesized existing literature to propose a quantitative framework for assessing the health of ornamental and bonsai plants based on four components: leaf color/chlorophyll, root structure, soil moisture and pest/disease status.

Developed an integrated Ornamental Plant Health Index (OPHI, 0–100) with three health categories (healthy, moderate, poor).

Outlined a measurement workflow using sensors and computer vision suitable for integration into smartphone apps and IoT systems.

Future work should:

Collect empirical datasets across multiple ornamental and bonsai species to calibrate component thresholds and weights.

Train and validate species-specific AI models for disease detection and leaf color interpretation.

Extend the OPHI framework to incorporate light, temperature, pH and EC, moving toward a more comprehensive plant health assessment system.
```

**💡 Tips**: Để dễ đọc hơn, bạn có thể thêm xuống dòng giữa các đoạn. Hệ thống sẽ tự động chuyển `\n` thành `<br/>` khi hiển thị.

---

### 📚 **Tài liệu tham khảo (References)**

**Mỗi reference một dòng:**

```
Hansen, M. A. (2009). Phytophthora root rot of rhododendron and azalea. Virginia Cooperative Extension Publication.
Harmon, P. F. (2018). Diagnostic pocket guide for ornamental crop diseases and pests. University of Florida IFAS Extension.
Judd, L. A., Jackson, B. E., & Fonteno, W. C. (2015). Advancements in root growth measurement technologies and their application for container-grown plants. Plants, 4(3), 369–392. https://doi.org/10.3390/plants4030369
Odhiambo, J. A., & Aguyoh, J. N. (2022). Soil moisture levels affect growth, flower production and yield of cucumber. Agricultura Tropica et Subtropica, 55(1), 1–10. https://doi.org/10.2478/ats-2022-0001
Ownley, B. H., Henny, B. K., & Nelson, P. V. (1990). Physical properties of container media and relation to severity of Phytophthora root rot of rhododendron. Journal of the American Society for Horticultural Science, 115(4), 564–570.
Percival, G. C., Keary, I. P., & Noviss, K. (2008). The potential of a chlorophyll content SPAD meter to quantify nutrient stress in foliar tissue of sycamore (Acer pseudoplatanus), English oak (Quercus robur), and European beech (Fagus sylvatica). Arboriculture & Urban Forestry, 34(2), 89–100. https://doi.org/10.48044/jauf.2008.012
Pinzón-Sandoval, E. H., Hernández-Hernández, R. M., & Álvarez-Herrera, J. G. (2022). Correlation between SPAD and chlorophylls a, b and total in coffee leaves. Acta Agronómica, 71(2), 3–11.
Taylor, R. A., et al. (2021). Deep learning for plant disease detection: A review. Computers and Electronics in Agriculture, 187, 106252.
Villegas-Velázquez, I., Herrera-Corredor, J. A., & colleagues. (2022). Chlorophyll measurements in Alstroemeria sp. using SPAD and CIE L*a*b* system. Horticulturae, 8(x), xx–xx.
Wei, L., Lu, X., & co-authors. (2024). Can SPAD values and CIE L*a*b* scales predict chlorophyll and carotenoid concentrations in leaves and diagnose the growth potential of trees? Horticulturae, 10(6), 548. https://doi.org/10.3390/horticulturae10060548
Zhang, X., et al. (2002). Effect of soil water on the growth and physiological characteristics of cucumber. Chinese Journal of Applied Ecology, 13(2), 245–249.
```

---

### 📄 **File PDF (Optional)**

Nếu bạn có file PDF của bài báo, click **"Choose File"** để upload (tối đa 10MB).

---

## ✅ Hoàn tất

1. Kiểm tra lại thông tin
2. Click **"Đăng bài"**
3. Hệ thống sẽ tự động chuyển đến trang chi tiết bài báo

---

## 🎯 Kết quả mong đợi

Sau khi đăng thành công, bạn sẽ thấy:

- ✅ Trang chi tiết bài báo với layout chuyên nghiệp
- ✅ Hiển thị đầy đủ 3 tác giả với affiliation
- ✅ Abstract được highlight riêng
- ✅ Từ khóa hiển thị dạng tags
- ✅ Nội dung đầy đủ với các section
- ✅ References được đánh số tự động
- ✅ Link download PDF (nếu có upload)

---

## 🔍 Tips thêm

### Nếu muốn format đẹp hơn trong phần Content:

Thêm các ký tự xuống dòng giữa:
- Các section (1., 2., 3...)
- Các đoạn văn
- Các bullet points

Ví dụ:
```
1. Introduction

[paragraph 1]

[paragraph 2]

1.1. Objectives

This study aims to:
- Point 1
- Point 2
```

### Nếu có bảng (tables):

Hệ thống hiện tại chưa hỗ trợ render bảng đẹp, nhưng bạn có thể format dạng text:

```
Mean SPAD | Interpretation | LHI (points)
< 25 | Strong N deficiency / chlorosis | 0
25–29 | Mild deficiency | 10
30–34 | Acceptable | 20
35–45 | Optimal | 30
> 45 | Very dark green | 24
```

---

## 🚀 Các tính năng đã có

- ✅ Upload PDF đính kèm
- ✅ Nhiều tác giả với thông tin đầy đủ
- ✅ Phân loại theo category
- ✅ Từ khóa tự động parse
- ✅ References tự động format
- ✅ Đếm lượt xem
- ✅ Responsive design
- ✅ Professional academic layout

---

**Chúc bạn đăng bài thành công! 📚🎓**
