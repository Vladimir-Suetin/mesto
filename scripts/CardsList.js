import Card from "./Card.js";
export default class CardsList {
  constructor(card, list, template, selectors) {
    this._card = card;
    this._list = list;
    this._template = template;
    this._selectors = selectors;
  }

  sortCard() {
    this._card.forEach((element) => {
      this.addCard(element);
    });
  }

  addCard(element) {
    const item = new Card(element, this._template, this._selectors);
    this._list.prepend(item.generateCard());
  }
}
