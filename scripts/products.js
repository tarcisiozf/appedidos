

class Products {

	constructor() {

		this.updateQtd 				= this.updateQtd.bind(this);
		this.selectProduct 			= this.selectProduct.bind(this);
		this.renderStoreProduct 	= this.renderStoreProduct.bind(this);
		this.renderCheckoutProduct 	= this.renderCheckoutProduct.bind(this);

		this.totalCost 			= document.querySelector('#total');
		this.items_container 	= document.querySelector('.items');
		this.products_container = document.querySelector('.products');

		this.parser = new DOMParser();

		this.products = [
			{
				name: 'Mc 4x4',
				price: 80,
				qtd: 1,
				image: '4by4.jpg',
				selected: false,
			},
			{
				name: 'Mc Lanche Feliz',
				price: 30,
				qtd: 1,
				image: 'happy_meal.png',
				selected: false,
			},
			{
				name: 'Mc Chicker',
				price: 35,
				qtd: 1,
				image: 'mc_chicken.jpg',
				selected: false,
			},
			{
				name: 'Mc Feast',
				price: 28,
				qtd: 1,
				image: 'mc_feast.png',
				selected: false,
			},
			{
				name: 'Quarteirão',
				price: 39,
				qtd: 1,
				image: 'quarter_pounder.jpg',
				selected: false,
			},
			{
				name: 'Coca Cola',
				price: 9,
				qtd: 1,
				image: 'coke.png',
				selected: false,
			},
			{
				name: 'Batatas Fritas',
				price: 7,
				qtd: 1,
				image: 'fries.png',
				selected: false,
			}
		];

		// I just need to render them once
		this.products.forEach(this.renderStoreProduct);

		this.renderCheckout();
	}

	selectProduct(event) {

		let product = event.currentTarget;
		let id = product.getAttribute('product-id');

		this.products[id].selected ^= true;

		let state = !!this.products[id].selected;

		product.style.marginLeft   = ( state ? 8 : 10 ) + 'px';
		product.style.marginRight  = ( state ? 8 : 10 ) + 'px';
		product.style.marginBottom = ( state ? 21 : 25 ) + 'px';

		product.classList.toggle('active');

		this.renderCheckout();
		this.updatePrice();
	}

	updatePrice() {

		let total = 0;

		for(let i = 0; i < this.products.length; i++) {

			let info = this.products[i];

			if ( ! info.selected ) {
				continue;
			}

			total += info.price * info.qtd;
		}

		this.totalCost.textContent = total;
	}

	updateQtd(id, number, update) {

		let qtd = this.products[id].qtd;
			qtd = Math.max(qtd + update, 1);

		number.textContent = qtd;

		this.products[id].qtd = qtd;

		this.updatePrice();
	}

	renderStoreProduct(info, id) {

		const element = this.parse(`
			<div class="product" product-id="${id}">
				<img class="photo" src="images/products/${info.image}" />
				<div class="price">
					<b>R$ ${info.price}</b>
				</div>
			</div>
		`);

		element.addEventListener('click', this.selectProduct);

		this.products_container.appendChild(element);
	}

	renderCheckout() {

		while( this.items_container.firstChild ) {
			this.items_container.removeChild(this.items_container.firstChild);
		}

		this.products.forEach(this.renderCheckoutProduct);

	}

	renderCheckoutProduct(info, id) {

		if ( ! info.selected ) {
			return;
		}

		const element = this.parse(`
			<div class="product">

				<img class="photo" src="images/products/${info.image}" />

				<div class="text name">${info.name}</div>

				<div class="quantity">
					<div class="action" id="btn_sub">-</div>
					<div class="text number">${info.qtd}</div>
					<div class="action" id="btn_add">+</div>
				</div>

			</div>
		`);

		const number = element.querySelector('.number');

		element
			.querySelector('#btn_sub')
			.addEventListener('click', () => this.updateQtd(id, number, -1));

		element
			.querySelector('#btn_add')
			.addEventListener('click', () => this.updateQtd(id, number, 1));

		this.items_container.appendChild(element);

	}

	parse(html) {
		return this.parser.parseFromString(html, 'text/html').body.firstChild;
	}

}

