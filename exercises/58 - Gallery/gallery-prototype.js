function Gallery(gallery) {
  if(!gallery) {
    throw new Error("No Gallery Found!");
  }
  this.gallery = gallery;
  // select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');
  
 
  // these are our event listeners
  this.images.forEach(image =>
    image.addEventListener('click', e => this.showImage(e.currentTarget))
  );
  // loop over each image
  this.images.forEach(image => {
    // attach event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd - check if it was enter
      if (e.key === 'Enter') {
        // if it was, show that image
        showImage(e.currentTarget);
      }
    });
  });
  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function() {
    console.info('Opening Modal...');
    // first check if modal is already open
    if(this.modal.matches('.open')) {
      console.info('Modal already open');
      return; // stop function from running
    }
    this.modal.classList.add('open');

    // Event listeners to be bound when we open the modal
    window.addEventListener('keyup', this.handleKeyUp);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPrevImage);
  }

  Gallery.prototype.closeModal = function() {
    this.modal.classList.remove('open');
    // TODO: add event listeners for clicks and keyboard
    window.removeEventListener('keyup', this.handleKeyUp);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.prevButton.removeEventListener('click', this.showPrevImage);
  }

  Gallery.prototype.handleClickOutside = function(e) {
    if(e.target === e.currentTarget) {
      closeModal();
    }
  }

  Gallery.prototype.handleKeyUp = function(event) {
    if(event.key === 'Escape') return this.closeModal();
    if(event.key === 'ArrowRight') return this.showNextImage();
    if(event.key === 'ArrowLeft') return this.showPrevImage();
  }

  Gallery.prototype.showNextImage = function() {
    this.showImage(
        this.currentImage.nextElementSibling || this.gallery.firstElementChild
    );
  }

  Gallery.prototype.showPrevImage = function() {
    this.showImage(
        this.currentImage.previousElementSibling || this.gallery.lastElementChild
    );
  }
  
  Gallery.prototype.showImage = function(el) {
    if(!el) {
      console.info('no image to show');
      return;
    }
    // update modal with the info
    console.log(el);
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();
  }

// use it on the page
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);