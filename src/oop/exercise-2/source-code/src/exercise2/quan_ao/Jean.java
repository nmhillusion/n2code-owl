package exercise2.quan_ao;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-09-08
 */
public class Jean extends QuanAoAbstract {

    @Override
    public String wear() {
        return "[Quan Ao - Jean] Wearing " + info();
    }

    @Override
    protected String info() {
        return "Jeans";
    }
}
