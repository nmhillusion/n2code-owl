package exercise2;

import java.util.ArrayList;
import java.util.List;

/**
 * created by: nmhillusion
 * <p>
 * created date: 2024-09-08
 */
public class Person {
    private final List<OutfitInterface> outfitList = new ArrayList<>();
    private final String name;

    public Person(String name) {
        this.name = name;
    }


    public void addOutfit(OutfitInterface outfit) {
        outfitList.add(outfit);
    }

    public void wear() {
        for (OutfitInterface outfitItem : outfitList) {
            System.out.println(outfitItem.wear());
        }
    }

    public void greet() {
        System.out.println("Hello, my name is " + name);
    }
}
