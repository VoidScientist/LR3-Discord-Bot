import { EmbedBuilder } from "discord.js";

export class PokeCard {


    constructor(name, image, health, ...attacks) {

        this.name = name[0].toUpperCase() + name.slice(1);
        this.url = image;
        this.health = health;
        this.attacks = attacks;

        return this
    }

    generateEmbed() {

        if (this.embed) {
            return this.embed;
        }

        return new EmbedBuilder()
        .setTitle(this.name)
        .setImage(this.url)
        .setDescription("A Pokemon Card");

    }

}