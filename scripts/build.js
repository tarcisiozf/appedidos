'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {
	var PageSlider = function () {
		function PageSlider() {
			_classCallCheck(this, PageSlider);

			this.container = document.querySelector('.container');
			this.pages = document.querySelectorAll('.page');
			this.buyButton = document.querySelector('.buy');

			this.pageIndex = null;
			this.sections = [];

			this.detectSections();
		}

		_createClass(PageSlider, [{
			key: 'moveTo',
			value: function moveTo(section) {

				var index = this.sections.indexOf(section);

				if (index < 0) {
					throw new Error("Page not found");
				}

				if (this.pageIndex == index) {
					return;
				}

				if (section == 'store') {
					this.buyButton.style.display = 'block';
				} else {
					this.buyButton.style.display = 'none';
				}

				this.pageIndex = index;

				this.update();
			}
		}, {
			key: 'update',
			value: function update() {

				for (var i = 0; i < this.pages.length; i++) {

					if (i == this.pageIndex) {
						this.pages[i].classList.add('active');
					} else {
						this.pages[i].classList.remove('active');
					}
				}

				this.container.scrollTop = 0;
			}
		}, {
			key: 'detectSections',
			value: function detectSections() {

				for (var i = 0; i < this.pages.length; i++) {
					this.sections.push(this.pages[i].getAttribute('data-section'));
				}
			}
		}]);

		return PageSlider;
	}();

	var Products = function () {
		function Products() {
			_classCallCheck(this, Products);

			this.renderCheckoutProduct = this.renderCheckoutProduct.bind(this);
			this.renderStoreProduct = this.renderStoreProduct.bind(this);
			this.selectProduct = this.selectProduct.bind(this);
			this.updateQtd = this.updateQtd.bind(this);

			this.products_container = document.querySelector('.products');
			this.items_container = document.querySelector('.items');
			this.totalCost = document.querySelector('#total');

			this.parser = new DOMParser();

			this.products = [{
				name: 'Mc 4x4',
				price: 80,
				qtd: 1,
				image: '4by4.jpg',
				selected: false
			}, {
				name: 'Mc Lanche Feliz',
				price: 30,
				qtd: 1,
				image: 'happy_meal.png',
				selected: false
			}, {
				name: 'Mc Chicker',
				price: 35,
				qtd: 1,
				image: 'mc_chicken.jpg',
				selected: false
			}, {
				name: 'Mc Feast',
				price: 28,
				qtd: 1,
				image: 'mc_feast.png',
				selected: false
			}, {
				name: 'Quarteirão',
				price: 39,
				qtd: 1,
				image: 'quarter_pounder.jpg',
				selected: false
			}, {
				name: 'Coca Cola',
				price: 9,
				qtd: 1,
				image: 'coke.png',
				selected: false
			}, {
				name: 'Batatas Fritas',
				price: 7,
				qtd: 1,
				image: 'fries.png',
				selected: false
			}];

			this.products.forEach(this.renderStoreProduct);

			this.renderCheckout();
		}

		_createClass(Products, [{
			key: 'selectProduct',
			value: function selectProduct(event) {

				var product = event.currentTarget;
				var id = product.getAttribute('product-id');

				this.products[id].selected ^= true;

				var state = !!this.products[id].selected;

				product.style.marginLeft = (state ? 8 : 10) + 'px';
				product.style.marginRight = (state ? 8 : 10) + 'px';
				product.style.marginBottom = (state ? 21 : 25) + 'px';

				product.classList.toggle('active');

				this.renderCheckout();
				this.updatePrice();
			}
		}, {
			key: 'updatePrice',
			value: function updatePrice() {

				var total = 0;

				for (var i = 0; i < this.products.length; i++) {

					var info = this.products[i];

					if (!info.selected) {
						continue;
					}

					total += info.price * info.qtd;
				}

				this.totalCost.textContent = total;
			}
		}, {
			key: 'updateQtd',
			value: function updateQtd(id, number, update) {

				var qtd = this.products[id].qtd;
				qtd = Math.max(qtd + update, 1);

				number.textContent = qtd;

				this.products[id].qtd = qtd;

				this.updatePrice();
			}
		}, {
			key: 'renderStoreProduct',
			value: function renderStoreProduct(info, id) {

				var element = this.parse('\n\t\t\t<div class="product" product-id="' + id + '">\n\t\t\t\t<img class="photo" src="images/products/' + info.image + '" />\n\t\t\t\t<div class="price">\n\t\t\t\t\t<b>R$ ' + info.price + '</b>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');

				element.addEventListener('click', this.selectProduct);

				this.products_container.appendChild(element);
			}
		}, {
			key: 'renderCheckout',
			value: function renderCheckout() {

				while (this.items_container.firstChild) {
					this.items_container.removeChild(this.items_container.firstChild);
				}

				this.products.forEach(this.renderCheckoutProduct);
			}
		}, {
			key: 'renderCheckoutProduct',
			value: function renderCheckoutProduct(info, id) {
				var _this = this;

				if (!info.selected) {
					return;
				}

				var element = this.parse('\n\t\t\t<div class="product">\n\n\t\t\t\t<img class="photo" src="images/products/' + info.image + '" />\n\n\t\t\t\t<div class="text name">' + info.name + '</div>\n\n\t\t\t\t<div class="quantity">\n\t\t\t\t\t<div class="action" id="btn_sub">-</div>\n\t\t\t\t\t<div class="text number">' + info.qtd + '</div>\n\t\t\t\t\t<div class="action" id="btn_add">+</div>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t');

				var number = element.querySelector('.number');

				element.querySelector('#btn_sub').addEventListener('click', function () {
					return _this.updateQtd(id, number, -1);
				});

				element.querySelector('#btn_add').addEventListener('click', function () {
					return _this.updateQtd(id, number, 1);
				});

				this.items_container.appendChild(element);
			}
		}, {
			key: 'parse',
			value: function parse(html) {
				return this.parser.parseFromString(html, 'text/html').body.firstChild;
			}
		}]);

		return Products;
	}();

	var pageSlider = new PageSlider();
	var products = new Products();

	// LOJAS
	var stores = document.querySelectorAll('.stores .store');

	stores.forEach(function (store) {

		store.addEventListener('click', function () {
			pageSlider.moveTo('store');
		});
	});

	// BOTÕES
	var buttons = {
		btn_home: 'home',
		btn_cart: 'checkout',
		btn_ticket: 'token',
		btn_buy: 'checkout',
		btn_review: 'reviews',
		btn_pay: 'token'
	};

	var _loop = function _loop(id) {
		var section = buttons[id];

		document.getElementById(id).addEventListener('click', function () {
			pageSlider.moveTo(section);
		});
	};

	for (var id in buttons) {
		_loop(id);
	}
};
