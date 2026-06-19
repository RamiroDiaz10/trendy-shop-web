class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <a href="/">Inicio</a>
        <a href="/about">Nosotros</a>
        <a href="/contact">Contacto</a>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);