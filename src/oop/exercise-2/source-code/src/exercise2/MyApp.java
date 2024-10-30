package exercise2;

import exercise2.quan_ao.AoThun;
import exercise2.quan_ao.Jean;
import exercise2.quan_ao.QuanAoAbstract;
import exercise2.quan_ao.Vay;
import exercise2.trang_suc.DayChuyen;
import exercise2.trang_suc.Nhan;
import exercise2.trang_suc.VongTay;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-09-08
 */
public class MyApp {

    public static void main(String[] args) {
        final QuanAoAbstract quan = new Jean();
        final QuanAoAbstract ao = new AoThun();

        System.out.println("-- Outfit of Lan --------------");
        final Person lan = new Person("Lan");
        lan.addOutfit(quan);
        lan.addOutfit(ao);
        lan.addOutfit(new VongTay());
        lan.wear();
        lan.greet();

        System.out.println();
        System.out.println("-- Outfit of Ngọc --------------");
        final Person ngoc = new Person("Ngọc");
        ngoc.addOutfit(new Vay());
        ngoc.addOutfit(new Nhan());
        ngoc.addOutfit(new DayChuyen());
        ngoc.wear();
        ngoc.greet();
    }
}
