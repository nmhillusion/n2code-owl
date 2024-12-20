---
layoutPath: "../../layout/post-layout.pug"
title: "Exercise 1: OOP với các phép tính cơ bản"
bannerLink: "https://nmhillusion.github.io/n2code-owl/oop/exercise-1/math-operators.jpg"
---

## Đề bài

Hãy viết chương trình máy tính thỏa mãn các yêu cầu sau:

1. Tạo lớp PhepTinh với phương thức tinh(int x, int y);
2. Tạo lớp PhepCong kế thừa lớp PhepTinh và trong hàm tính sẽ thực hiện phép tính cộng
3. Tạo lớp PhepTru kế thừa lớp PhepTinh và trong hàm tính sẽ thực hiện phép tính trừ
4. Tạo lớp PhepNhan kế thừa lớp PhepTinh và trong hàm tính sẽ thực hiện phép tính nhân
5. Tạo lớp PhepChia kế thừa lớp PhepTinh và trong hàm tính sẽ thực hiện phép tính chia
6. Tạo lớp UngDung với nội dung như sau:

```java
public class UngDung {
    public static void main(String[] args) {
        PhepTinh cong = new PhepCong();
        System.out.println("9 + 3 = " + cong.tinh(9, 3));

        PhepTinh tru = new PhepTru();
        System.out.println("9 - 3 = " + tru.tinh(9, 3));

        PhepTinh nhan = new PhepNhan();
        System.out.println("9 x 3 = " + nhan.tinh(9, 3));

        PhepTinh chia = new PhepChia();
        System.out.println("9 : 3 = " + chia.tinh(9, 3));
    }
}
```

## Cách xử lý

1. Tạo class cơ sở tên `PhepTinh`
2. Tạo class `PhepCong`, `PhepTru`, `PhepNhan`, `PhepChia` kế thừa lớp `PhepTinh` với phương thức `tinh(int x, int y)` được cài đặt tương ứng với các phép tính cộng / trừ / nhân / chia.
3. Chạy thử kiểm tra và điều chỉnh phù hợp

## Chi tiết

```java

abstract class PhepTinh {
    public abstract Object tinh(int x, int y);
}

class PhepCong extends PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        return x + y;
    }
}

class PhepTru extends PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        return x - y;
    }
}

class PhepNhan extends PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        return x * y;
    }
}

class PhepChia extends PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        if (0 == y) {
            // Nên sử dụng `throw` để thoát phương thức thay vì chỉ in ra 1 message lên màn hình
            throw new ArithmeticException("Không thể chia cho 0");
        }
        return x / y;
    }
}
```

Rồi bây giờ có thể chạy lại `UngDung.java` để kiểm tra:

```java

class HelloWorld {
    public static void main(String[] args) {
        PhepTinh cong = new PhepCong();
        System.out.println("9 + 3 = " + cong.tinh(9, 3));

        PhepTinh tru = new PhepTru();
        System.out.println("9 - 3 = " + tru.tinh(9, 3));

        PhepTinh nhan = new PhepNhan();
        System.out.println("9 x 3 = " + nhan.tinh(9, 3));

        PhepTinh chia = new PhepChia();
        System.out.println("9 : 3 = " + chia.tinh(9, 3));
    }
}

```

```bash
$ javac UngDung.java
$ java UngDung
9 + 3 = 12
9 - 3 = 6
9 x 3 = 27
9 : 3 = 3

=== Code Execution Successful ===
```

## Mở rộng

Thực ra mình cũng có thể tạo `PhepTinh` dưới dạng 1 interface, rồi cho các lớp khác để implement cho interface `PhepTinh` này.

```java

interface PhepTinh {
    Object tinh(int x, int y);
}

class PhepCong implements PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        return x + y;
    }
}

class PhepTru implements PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        return x - y;
    }
}

class PhepNhan implements PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        return x * y;
    }
}

class PhepChia implements PhepTinh {
    @Override
    public Object tinh(int x, int y) {
        if (0 == y) {
            // Nên sử dụng `throw` để thoát phương thức thay vì chỉ in ra 1 message lên màn hình
            throw new ArithmeticException("Không thể chia cho 0");
        }
        return x / y;
    }
}
```

Ta cũng sẽ có kết quả tương tự:

```bash
$ javac UngDung.java
$ java UngDung
9 + 3 = 12
9 - 3 = 6
9 x 3 = 27
9 : 3 = 3

=== Code Execution Successful ===
```
