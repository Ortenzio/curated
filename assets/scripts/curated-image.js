const pathDownload = 'M7.5 1C7.74 1.04 8 1.25 8 1.5V8.41L10.18 6.18C10.35 6.0 10.64 6.0 10.81 6.18C11 6.35 11 6.64 10.81 6.81L7.81 9.81C7.64 10 7.35 10 7.18 9.81L4.18 6.81C4.0 6.64 4.0 6.35 4.18 6.18C4.35 6.0 4.64 6.0 4.81 6.18L7.05 8.41V1.5C7.05 1.25 7.25 1.04 7.5 1.04ZM2.5 10C2.77 10 3 10.22 3 10.5V12C3 12.55 3.44 13 3.99 13H11.0C11.55 13 12 12.55 12 12V10.5C12 10.22 12.22 10 12.5 10C12.77 10 13 10.22 13 10.5V12C13 13.1 12.1 14 11.0 14H4C2.89 14 2 13.1 2 12V10.5C2 10.22 2.22 10 2.5 10Z';
const pathAdjust = 'M5.5 3C4.67 3 4 3.67 4 4.5C4 5.32 4.67 6 5.5 6C6.32 6 7 5.32 7 4.5C7 3.67 6.32 3 5.5 3ZM3 5C3.01 5 3.03 4.99 3.04 4.99C3.28 6.13 4.28 7 5.5 7C6.71 7 7.71 6.13 7.95 4.99C7.96 4.99 7.98 5 8 5H13.5C13.77 5 14 4.77 14 4.5C14 4.22 13.77 4 13.5 4H8C7.98 4 7.96 4.0 7.95 4.0C7.71 2.86 6.71 2 5.5 2C4.28 2 3.28 2.86 3.04 4.0C3.03 4.0 3.01 4 3 4H1.5C1.22 4 1 4.22 1 4.5C1 4.77 1.22 5 1.5 5H3ZM11.95 11C11.71 12.13 10.71 13 9.5 13C8.28 13 7.28 12.13 7 11C7 11 7 11 7 11H1.5C1.22 11 1 10.77 1 10.5C1 10.22 1.22 10 1.5 10H7C7 10 7 10 7 10C7.28 8.86 8.28 8 9.5 8C10.71 8 11.71 8.86 11.95 10.0C12 10.0 12 10 12 10H13.5C13.77 10 14 10.22 14 10.5C14 10.77 13.77 11 13.5 11H12C12 11 12 11 12 11ZM8 10.5C8 9.67 8.67 9 9.5 9C10.32 9 11 9.67 11 10.5C11 11.32 10.32 12 9.5 12C8.67 12 8 11.32 8 10.5Z'
const pathInfo = 'M7.5 0.87C3.84 0.87 0.87 3.84 0.87 7.5C0.87 11.15 3.84 14.12 7.5 14.12C11.15 14.12 14.12 11.15 14.12 7.5C14.12 3.84 11.15 0.87 7.5 0.87ZM1.82 7.5C1.82 4.36 4.36 1.82 7.5 1.82C10.63 1.82 13.17 4.36 13.17 7.5C13.17 10.63 10.63 13.17 7.5 13.17C4.36 13.17 1.82 10.63 1.82 7.5ZM8.24 4.5C8.24 4.91 7.91 5.24 7.5 5.24C7.08 5.24 6.74 4.91 6.74 4.5C6.74 4.08 7.08 3.74 7.5 3.74C7.91 3.74 8.24 4.08 8.24 4.5ZM6 5.99H6.50H7.50C7.77 5.99 8 6.22 8 6.5V10H8.50H9V11H8.50H7.50H6.50H6V10H6.50H7V6.99H6.50H6V5.99Z"'

const toSvg = (d) => `<svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`

class CuratedImage extends HTMLElement {

  connectedCallback () {
    if (this.image) return;

    this.image = this.querySelector('img');

    if (!this.image) return;

    // add buttons
    const btnDownload = document.createElement('a');

    btnDownload.innerHTML = toSvg(pathDownload)
    btnDownload.setAttribute('download', '')
    btnDownload.setAttribute('href', this.image.src)
    this.append(btnDownload);

    console.log('curated image', this.image);
  }

  disconnectedCallback () {

  }

}

customElements.define('curated-image', CuratedImage);