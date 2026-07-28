class CuratedImage extends HTMLElement {

  connectedCallback () {
    if (this.image) {
      return;
    }

    this.image = this.querySelector('img');
    console.log('curated image', this.image);
  }

  disconnectedCallback () {

  }

}

customElements.define('curated-image', CuratedImage);