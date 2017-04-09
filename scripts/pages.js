class PageSlider {

	constructor() {

		this.container = document.querySelector('.container');
		this.pages = document.querySelectorAll('.page');
		this.buyButton = document.querySelector('.buy');

		this.pageIndex = null;
		this.sections = [];

		this.detectSections();
	}

	moveTo(section) {

		let index = this.sections.indexOf(section);

		if ( index < 0 ) {
			throw new Error("Page not found");
		}

		if ( this.pageIndex == index ) {
			return;
		}

		if ( section == 'store' ) {
			this.buyButton.style.display = 'block';
		} else {
			this.buyButton.style.display = 'none';
		}

		this.pageIndex = index;

		this.update();
	}

	update() {

		for(let i = 0; i < this.pages.length; i++) {
	
			if ( i == this.pageIndex ) {
				this.pages[i].classList.add('active');
			} else {
				this.pages[i].classList.remove('active');
			}
			
		}

		this.container.scrollTop = 0;

	}

	detectSections() {

		for(let i = 0; i < this.pages.length; i++) {
			this.sections.push( this.pages[i].getAttribute('data-section') );
		}

	}

}