// import Card from "./Card.js";
// export default class CardsList {
//   _card;
//   _list;
//   _template;
//   _selectors;
//   _openPopupViewImage;

//   constructor(card, list, template, selectors, openPopupViewImage) {
//     this._card = card;
//     this._list = list;
//     this._template = template;
//     this._selectors = selectors;
//     this._openPopupViewImage = openPopupViewImage;
//   }

//   sortCard = () => {
//     this._card.forEach((element) => {
//       this.addCard(element);
//     });
//   };

//   addCard = (element) => {
//     const item = new Card(element, this._template, this._selectors, this._openPopupViewImage);
//     this._list.prepend(item.generateCard());
//   };
// }
