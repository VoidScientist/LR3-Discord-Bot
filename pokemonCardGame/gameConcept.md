# PokeCard - LR3

The LR3 Tech Bot, for some reason, will end up having the ability to use : [PokeApi](https://pokeapi.co/)

Its use will be simple : creating a dynamic card game with battles.

## Card Obtention

The bot will use data it gets from the API to make an embed that looks like a card.

It will contain:
- Name of Pokemon
- Health
- Level
- Type
- Image
- Attacks

Level is randomly choosen, and if superior to a threshold, then it will mean the card "evolves" and reference the evolution of a pokemon.

Health will be able to vary in some form, which is still to be determined.

Attacks will also be randomly choosen (from 2 to 4) from a list sorted by types.

These cards will then be claimed by a server member by simply reacting to the message.

## Attacks

They will simply be objects containing basic informations such as :

- Name
- Damages
- Type

## Battle Mode

When two players enter commands referencing each other to start a fight, they will have to choose one amongst three cards chosen randomly amongst those they own.

Then there is two choices: attack or heal.

Healing is random, and is between 10-30% of max HP.

## Sacrifice 

For those who likes to sacrifice pokemons to Elder Gods who bless your surviving pokemon, there will be a system allowing to upgrade cards above how they have been generated.



