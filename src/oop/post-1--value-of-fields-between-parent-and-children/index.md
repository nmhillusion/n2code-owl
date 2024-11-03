---
layoutPath: "../../layout/post-layout.pug"
title: "Post 1: Value of fields between parent and children with access modifiers"
bannerLink: "https://nmhillusion.github.io/n2code-owl/oop/post-1--value-of-fields-between-parent-and-children/hierarchy.png"
---

# Sự kế thừa của các fields giữa lớp cha và lớp con

Trong lập trình hướng đối tượng, các lớp con sẽ có sự kế thừa từ lớp cha. Sự kế thừa này bao gồm kế thừa các trường dữ liệu (field) và kế thừa các phương thức (method) trong lớp cha.

Nhưng để lớp con có thể kế thừa từ lớp cha thì các field và các method đó thì chúng phải được khai báo truy cập (`access modifier`) ở dạng `protected` hoặc `public` ở lớp cha.

- Nếu field hoặc method được khai báo ở dạng `private` thì nó sẽ không thể truy cập ở lớp con.

- Nếu field hoặc method được khai báo ở dạng `default (tức là không có thiết lập truy cập private / protected / public)` thì nó sẽ:

  - Có thể truy cập nếu lớp con nằm cùng 1 package với lớp cha.
  - **KHÔNG** thể truy cập nếu lớp con nằm ở khác package với lớp cha.

### Ví dụ:

```java
package post1.item1;

class Parent {
  private String fieldPublic;
  String fieldDefault; // đây là dạng khai báo default
  protected String fieldProtected;
  public String fieldPublic;
}

```

```java

package post1.item1;

class ChildA extends Parent {

  public void checkAccess() {
    System.out.println("fieldPrivate: " + fieldPrivate); // Error - không thể truy cập private field của lớp cha

    System.out.println("fieldDefault: " + fieldDefault); // Success - khai báo default có thể truy cập khi ở cùng 1 package, ở đây là package `post1.item1`

    System.out.println("fieldProtected: " + fieldProtected); // Success - khai báo protected có thể truy cập ở lớp con (dù cùng hay khác package)

    System.out.println("fieldPublic: " + fieldPublic); // Success - khai báo public có thể truy cập ở lớp con (dù cùng hay khác package)

  }

}

```

```java

package post1.item2;

class ChildB extends Parent {

  public void checkAccess() {
    System.out.println("fieldPrivate: " + fieldPrivate); // Error - không thể truy cập private field của lớp cha

    System.out.println("fieldDefault: " + fieldDefault); // Error - khai báo default chỉ có thể truy cập khi ở cùng 1 package, ở đây lớp cha và lớp con đang thuộc 2 package khác nhau, package của cha là `post1.item1`, package của con là `post1.item2`

    System.out.println("fieldProtected: " + fieldProtected); // Success - khai báo protected có thể truy cập ở lớp con (dù cùng hay khác package)

    System.out.println("fieldPublic: " + fieldPublic); // Success - khai báo public có thể truy cập ở lớp con (dù cùng hay khác package)
  }

}

```

# Vấn đề của static variable

Sự kế thừa các biến static của lớp con cũng giống với việc kế thừa các biến thông thường, nhưng thay vì truy cập biến static từ từ khóa `this`, `super` thì ta sẽ truy cập nó trực tiếp từ tên class.

```java

package comp;

public class Parent {
  private static String fieldPrivate;
  static String fieldDefault;
  protected static String fieldProtected;
  public static String fieldPublic;
}

```

```java

package comp;

public class Child extends Parent {

  public void checkAccess() {
    System.out.println("fieldPrivate: " + Parent.fieldPrivate); // Error
    System.out.println("fieldDefault: " + Parent.fieldDefault); // Success
    System.out.println("fieldProtected: " + Parent.fieldProtected); // Success
    System.out.println("fieldPublic: " + Parent.fieldPublic); // Success
  }
}

```

```java

package comp2;

public class Child extends Parent {

  public void checkAccess() {
    System.out.println("fieldPrivate: " + Parent.fieldPrivate); // Error
    System.out.println("fieldDefault: " + Parent.fieldDefault); // Error
    System.out.println("fieldProtected: " + Parent.fieldProtected); // Success
    System.out.println("fieldPublic: " + Parent.fieldPublic); // Success
  }
}

```

# Vấn đề của sử dụng các field và method từ các instance

`Bạn có biết?`: Instance là ý chỉ việc tạo ra một đối tường cho 1 class cụ thể. Ví dụ tạo ra biến `var1` cho class `Component` như sau: `Component var1 = new Component();`. Thì khi này `var1` là 1 instance của class `Component`.


```java

package comp;

public class Component {
  private String fieldPrivate;
  String fieldDefault;
  protected String fieldProtected;
  public String fieldPublic;
}

```

Đối với 1 instance, ta sẽ có sự khác biệt về mức truy cập và việc có ở cùng 1 package hay không.

`private`

Không thể truy cập từ instance.

`default`

Có thể truy cập nếu ở cùng 1 package.

`protected`

Có thể truy cập nếu ở cùng 1 package. Giống với mức truy cập `default`. Lưu ý là dù không phải lớp con thì vẫn có thể truy cập `protected` nếu ở cùng 1 package.

`public`

Có thể truy cập dù cùng hay khác package với lớp Parent. Rộng rãi nhất

## Ví dụ

_Cùng package_

```java

package comp;

public class MyApp {

  public static void main(String[] args) {

    Component comp1 = new Component(); // Create an instance of Component

    comp1.fieldPrivate = "test private"; // Error
    comp1.fieldDefault = "test default"; // Success
    comp1.fieldProtected = "test protected"; // Success
    comp1.fieldPublic = "test public"; // Success
  }
}

```

_Khác package_

```java

package comp2;

public class MyApp {

  public static void main(String[] args) {

    Component comp1 = new Component(); // Create an instance of Component

    comp1.fieldPrivate = "test private"; // Error
    comp1.fieldDefault = "test default"; // Error
    comp1.fieldProtected = "test protected"; // Error
    comp1.fieldPublic = "test public"; // Success
  }
}

```

Nếu ta có 1 class `ChildComponent` kế thừa từ lớp `Component` thì quy định về mức truy cập cũng sẽ giống vậy, chỉ là sẽ thêm 1 tầng kế thừa của lớp cha với lớp con.

**Mức truy cập: Component -> ChildComponent**

- `private` -> `private` : không được kế thừa
- `default` -> `default` : truy cập bất kỳ ở cùng package
- `protected` -> `protected` : truy cập bất kỳ ở cùng package
- `public` -> `public` : truy cập bất kỳ ở đâu

Cho nên về cơ bản thì mức độ truy cập theo độ mở rộng dần sẽ là: `private` -> `default` -> `protected` -> `public`

---

> Trong hầu hết các trường hợp, các field đều được để mức truy cập là `private` và `protected`. Việc đặt field ở dạng `public` rất dễ làm thất thoát dữ liệu và phá vỡ tính đóng gói của lập trình hướng đối tượng. Các data từ `private` field nên được truy xuất thông qua các method `getter` và `setter`.

## Ví dụ getter / setter:

```java

class Book {
  private String title;

  // Getter
  public String getTitle() {
    return title;
  }

  // Setter
  public void setTitle(String title) {
    this.title = title;
  }
}

```

## Các vấn đề liên quan:

1. Vậy về mức truy cập ở mức class thì sao? Khi khai báo class thì ta có mấy lựa chọn? Tác dụng của nó sẽ như thế nào?

2. Sự ảnh hưởng của việc thay đổi giá trị của các field trong Java giữa lớp con và lớp cha như thế nào?