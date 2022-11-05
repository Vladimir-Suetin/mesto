export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._card = this._renderer(element);
    this._container.prepend(this._card);
  }

  renderItems(items) {
    items.reverse();
    items.forEach((element) => {
      this.addItem(element);
    });
  }
}
