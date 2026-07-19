package exercise2.trang_suc;

import exercise2.OutfitInterface;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-10-30
 */
public abstract class TrangSucAbstract implements OutfitInterface {

    @Override
    public String wear() {
        return "[Trang Suc] Wearing " + getName();
    }

    protected abstract String getName();
}
