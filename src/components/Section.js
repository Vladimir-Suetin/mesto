export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }

  addItems(element) {
    this._container.append(this._renderer(element));
  }

  renderItems(items) {
    items.forEach((element) => {
      this.addItems(element);
    });
  }
}
