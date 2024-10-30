package exercise2.quan_ao;

import exercise2.OutfitInterface;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-09-08
 */
public abstract class QuanAoAbstract implements OutfitInterface {

    @Override
    public String wear() {
        return "[Quan Ao] Wearing " + info();
    }

    protected abstract String info();
}
