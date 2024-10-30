---
layoutPath: "../../layout/post-layout.pug"
title: "Exercise 2: Chuẩn bị quần áo trang sức để mặc"
bannerLink: "https://nmhillusion.github.io/n2code-owl/oop/exercise-2/summer-outfit-ideas.jpg"
---

## Đề bài

Hãy viết chương trình chuẩn bị quần áo mặc thỏa mãn các yêu cầu sau:

1. Sửa lại các class trong quan_ao để chương trình có thể chạy
2. Override lại phương thức wear() của class Jean
3. Tạo package trang_suc
4. Tạo abstract classs TrangSucAbstract tương tự QuanAoAbstract implements OutfitInterface
5. Tạo các class Nhẫn, Dây chuyền,... kế thừa classs TrangSucAbstract
6. Tạo thêm object Person mới trong MyApp và in ra thêm thông tin bổ sung tương ứng của trang sức

> Bài tập nhằm mục đích giúp ta quen dần với các cơ chế tổ sức lớp, kế thừa lớp, cài đặt lớp trong java, để từ đó có thể vận dụng để tạo chương trình theo mục đích mong muốn

Cấu trúc kế thừa cơ bản sẽ như sau:

/`MyApp`

/`Person`

/`OutfitInterface`

/`OutfitInterface`/`QuanAoAbstract`

/`OutfitInterface`/`QuanAoAbstract`/`Vay`

/`OutfitInterface`/`QuanAoAbstract`/`AoThun`

/`OutfitInterface`/`QuanAoAbstract`/`Jean`

/`OutfitInterface`/`TrangSucAbstract`

/`OutfitInterface`/`TrangSucAbstract`/`Nhan`

/`OutfitInterface`/`TrangSucAbstract`/`DayChuyen`

/`OutfitInterface`/`TrangSucAbstract`/`VongTay`

Trong class chính `MyApp`, khi khởi tạo và thêm các outfit cho từng person, ta có thể linh động điều chỉnh outfit với số lượng và loại outfit khác nhau để quan sát sự thay đổi tương ứng nhé

Source-code tham khảo: [https://github.com/nmhillusion/n2code-owl/tree/main/src/oop/exercise-2/exercise2.zip](https://github.com/nmhillusion/n2code-owl/tree/main/src/oop/exercise-2/exercise2.zip)
