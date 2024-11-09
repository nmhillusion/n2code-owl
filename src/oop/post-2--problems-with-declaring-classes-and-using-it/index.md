---
layoutPath: "../../layout/post-layout.pug"
title: "Post 2: Problems with declaring classes and using it"
bannerLink: "https://nmhillusion.github.io/n2code-owl/oop/post-2--problems-with-declaring-classes-and-using-it/classifyingInJava.png"
---

# Bàn về class, khai báo, mức truy cập và cách sử dụng nó

## Class là gì?

Định nghĩa về class thì đã có nhiều trong các sách và trang web. Nên ở đây, một cách đơn giản, ta có thể hiểu `class` là một bản thiết kế của 1 đối tượng, mà ở đây có thể là một giống loài, một loại máy móc, một nhân vật game, một service,... Rồi từ bản thiết kế ấy, ta có thể xây dựng / tạo ra các đối tượng (các instance) của class đó.

Ví dụ:

```java
class Person {
  private final String name;
  private final int age;
  private final String address;

  public Person(String name, int age, String address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }

  public String getAddress() {
    return address;
  }
}

/////////////////

Person p = new Person("John", 25, "123 Main St");

```

## Khai báo class

```java

[access modifier] [final] class [Class name] [extends|implements] [Parent class name] {
  // fields and methods
}

```

`access modifier`: `public`, `private` hoaặc `default`.

`final`: Khi có final trong định nghĩa class thì có nghĩa class này không chấp nhận 1 class khác kế thừa nó.

`Class name`: Tên class, theo quy chuẩn đặt tên của java.

`extends/implements`: sử dụng khi bạn có ý muốn kế thừa / cài đặt từ 1 class cha khác.

## Mức truy cập (access modifier)

#### `public`

Có thể sử dụng class này từ bất cứ đâu

File `A.java`:

```java
package com.example1;

public class A {
  
}

```

File `MyApp.java`:

```java
package com.main;

import com.example1.A;

public class MyApp {
  public void run() {
    A a = new A(); // import and using class A everywhere
  }
}

```


#### `private`

Chỉ có thể khai báo và sử dụng class này trong nội bộ của class khai báo hiện tại. Có nghĩa bạn chỉ có thể khai báo và sử dụng private class như là class nội bộ của một class khác.

Ví dụ:

```java

class A {
  private class B {
    // B
  }

  private B b = new B(); // Success - vì dùng trong cùng class khai báo
}

class C {
  private A.B b = new A().new B(); // Error - không thể truy cập private class B
}

```

#### `default`

Cũng giống như mức truy cập `default` của field / methods. Khi 1 class được khai báo dưới dạng `default` thì có nghĩa nó chỉ có thể truy cập từ trong cùng package.

Ví dụ:

File `A.java`:

```java

package com.example1;

class A {
}

```

File `B.java`:

```java

package com.example1;

class B {
  private A a = new A(); // Success - truy cập trong cùng package `com.example1`
}

```

File `C.java`:

```java

package com.example2;

class C {
  private A a = new A(); // Error - khác package nên không thể truy cập class `A` của package `com.example1`
}

```

## Inner class và cách sử dụng

Như ví dụ bên trên, inner class là 1 class khai báo trong 1 class khác.

`inner class` về bản chất thì cũng là thành phần của class chứa đựng nó.

Nên cũng sẽ cùng quy tắc về mức truy cập như với field / method:

- `private`: chỉ được truy cập trong chính class hiện tại
- `default`: truy cập ở cùng package
- `protected`: truy cập ở cùng package hoặc từ class con
- `public`: truy cập từ bất cứ đâu

Ví dụ:

File `A.java`:

```java

package com.example1;

class A {
  private class APrivate {
  }

  class ADefault {
  }

  protected class AProtected {
  }

  public class APublic {
  }
}

```

File `MyApp.java`:

```java

package com.example1;

import com.example1.A;

public class MyApp {
  public void run(){
    A.APrivate aPrivate = new A().new APrivate(); // Error - không thể truy cập private inner class bên ngoài class đó
    A.ADefault aDefault = new A().new ADefault(); // Success - Do trong cùng 1 package `com.example1`
    A.AProtected aProtected = new A().new AProtected(); // Success - Do trong cùng 1 package `com.example1`
    A.APublic aPublic = new A().new APublic(); // Success - public inner class có thể truy cập ở bất cứ đâu
  }
}

```

File `MyApp2.java`

```java

package com.example2;

import com.example1.A;

public class MyApp2 {
  public void run(){
    A.APrivate aPrivate = new A().new APrivate(); // Error - không thể truy cập private inner class bên ngoài class đó
    A.ADefault aDefault = new A().new ADefault(); // Error - khác package nên không thể truy cập default inner class
    A.AProtected aProtected = new A().new AProtected(); // Error - khác package và không kế thừa nên không thể truy cập protected inner class
    A.APublic aPublic = new A().new APublic(); // Success - public inner class có thể truy cập ở bất cứ đâu
  }
}

```

> **Lưu ý:** Khi khởi tạo instance thì cũng sẽ phụ thuộc vào mức truy cập của constructor của inner class đó.

Ví dụ:

File `A.java`:
```java

package com.example1;

public class A {
  protected class AProtected {
  }
}
```

File `MyApp.java`:

```java

package com.main;

import com.example1.A;

public class MyApp {
  public void run(){
    A.AProtected aProtected = new A().new AProtected(); // Error - Dù có thể truy cập tới inner class `AProtected` trong class `A`. Nhưng default inner class `AProtected` trong class `A` mặc định thì cũng là protected.
  }
}

```

Để có thể khởi tạo được ở đây, ta thay đổi mức truy cập cập của constructor của `AProtected` thành `public`:

File `A.java`:

```java

package com.example1;

public class A {
  protected class AProtected {
    public AProtected() {
      
    }
  }  
}

```

File `MyApp.java`:

```java

package com.main;

import com.example1.A;

public class MyApp {
  public void run(){
    A.AProtected aProtected = new A().new AProtected(); // Success
  }
}
```

<u>**Hoặc ở một góc nhìn khác,**</u> bạn cũng có thể truy cập được protected constructor trong inner class `AProtected` nếu bạn ở cùng package với class `A`:

File `A.java`:

```java

package com.example1;

public class A {
  protected class AProtected {
    protected AProtected() { // Có thể khai báo tường minh constructor này hay không đều được
      
    }
  }  
}
```

File `MyApp.java`:

```java

package com.example1;

import com.example1.A;

public class MyApp {
  public void run(){
    A.AProtected aProtected = new A().new AProtected(); // Success
  }
}

```


### Inner class với có và không có keyword `static`

Biến `static` về bản chất sẽ định nghĩa thành phần mà nó định nghĩa phía sau sẽ thuộc về class hay sẽ thuộc về instance.

- Nếu không có khai báo `static` thi `inner class` sẽ thuộc về instance
- Nếu khai báo `static` thi `inner class` sẽ thuộc về class

Ví dụ:

File `A.java`:

```java

package com.example1;

public class A {

  public static class AStatic {
  }

  public class ANonStatic {
  } 
}

```

File `MyApp.java`:

```java

package com.main;

import com.example1.A;

public class MyApp {
  public void run(){
    A.AStatic aStatic = A.AStatic(); // Vì khi này inner class AStatic là thuộc về A nên ta có thể khai báo trực tiếp A.AStatic
    
    ////////
    
    A.ANonStatic aNonStatic = new A().new ANonStatic(); // Vì khi này inner class ANonStatic là thuộc về instance nên ta không thể khai báo trực tiếp A.ANonStatic. Mà phải thông qua 1 instace của class A

    // Tương đương với

    A a = new A();
    A.ANonStatic aNonStatic = a.new ANonStatic();
  }
}
```

---

Tới đây, ta sẽ có 1 câu hỏi, vậy biến `static` trong inner class sẽ có ảnh hưởng thế nào trong 2 trường hợp inner class có static và không có static này?


File `A.java`:

```java

package com.example1;

public class A {

  public static class AStatic {
    static int count = 0;

    public void increase() {
      count++;
    }
  }

  public class ANonStatic {
    static int count = 0;

    public void increase() {
      count++;
    }
  }
}

```

File `MyApp.java`:

```java

package com.main;

import com.example1.A;

public class MyApp {
  public void runWithStaticClass(){
    A.AStatic aStatic1 = new A.AStatic();
    aStatic1.increase();
    aStatic1.increase();
    aStatic1.increase();

    A.AStatic aStatic2 = new A.AStatic();
    aStatic2.increase();
    aStatic2.increase();

    System.out.println(aStatic1.count); // Expected: 5
    System.out.println(aStatic2.count); // Expected: 5
  }

  public void runWithNonStaticClass(){

    A.ANonStatic aNonStatic1 = new A().new ANonStatic();
    aNonStatic1.increase();
    aNonStatic1.increase();
    aNonStatic1.increase();

    A.ANonStatic aNonStatic2 = new A().new ANonStatic();
    aNonStatic2.increase();
    aNonStatic2.increase();
    aNonStatic2.increase();
    aNonStatic2.increase(); 

    System.out.println(aNonStatic1.count); // Expected: 7
    System.out.println(aNonStatic2.count); // Expected: 7
  }
}
```

Ở đây dù biến `static` `count` trong dạng inner class nào thì bản chất cũng là thuộc về tham chiếu của `A.AStatic.count` hay `A.ANonStatic.count`. Nên khi ta gọi hàm increase thì về bản chất là cùng `increase` giá trị của ***cùng 1 tham chiếu*** và giá chị `static count` chung đó sẽ thay đổi giống nhau của cả 2 trường hợp.

