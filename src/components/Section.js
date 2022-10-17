export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._card = this._renderer(element);
    this._container.prepend(this._card);
  }

  renderItems() {
    this._items.forEach((element) => {
      this.addItem(element);
    });
  }
}
