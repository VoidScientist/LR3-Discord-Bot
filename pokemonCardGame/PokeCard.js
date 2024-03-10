export class PokeCard {


    constructor(name, image, health, ...attacks) {

        this.name = name;
        this.url = image;
        this.health = health;
        this.attacks = attacks;

        return this
    }




}