
const pageSlider = new PageSlider();
const products = new Products();

// LOJAS
const stores = document.querySelectorAll('.stores .store');

stores.forEach(store => {

	store.addEventListener('click', function () {
		pageSlider.moveTo('store');
	});

})

// BOTÕES
const buttons = {
	btn_home: 	'home',
	btn_cart: 	'checkout',
	btn_ticket: 'token',
	btn_buy: 	'checkout',
	btn_review: 'reviews',
	btn_pay: 	'token',
};

for ( let id in buttons ) {
	const section = buttons[id];

	document.getElementById(id).addEventListener('click', function() {
		pageSlider.moveTo(section);
	});
}

