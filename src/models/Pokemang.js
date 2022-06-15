export class Pokemang {
  constructor (data) {
    this.id = data._id || null
    this.name = data.name
    this.weight = data.weight
    this.height = data.height
    this.types = data.types
    this.img = data.sprites.other["official-artwork"].front_default
    this.nickName = 'Lil Jeremy'
  }
}