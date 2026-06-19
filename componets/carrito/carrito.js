import { obtenerCarrito, eliminarDelCarrito, vaciarCarrito, calcularTotal, agregarAlCarrito, disminuirCantidad } from "../../services/cartService.js";

class CartModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="cart-overlay" class="cart-overlay">
        <div class="cart-modal">
          <div class="cart-modal-header">
            <h3>Tu carrito</h3>
            <button id="cart-close" class="cart-close">&times;</button>
          </div>

          <div id="cart-items" class="cart-items"></div>

          <div class="cart-modal-footer">
            <p>Total: <span id="cart-total">$0</span></p>
            <button id="cart-vaciar" class="btn btn-secondary">Vaciar carrito</button>
          </div>
        </div>
      </div>
    `;

    this.querySelector("#cart-close").addEventListener("click", () => this.cerrar());
    this.querySelector("#cart-overlay").addEventListener("click", (e) => {
      if (e.target.id === "cart-overlay") this.cerrar();
    });
    this.querySelector("#cart-vaciar").addEventListener("click", () => {
      vaciarCarrito();
      this.renderizar();
    });

    this.querySelector("#cart-items").addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-item-eliminar")) {
        const id = Number(e.target.dataset.id);
        eliminarDelCarrito(id);
        this.renderizar();
      }

      if (e.target.classList.contains("cart-item-sumar")) {
        const id = Number(e.target.dataset.id);
        const carrito = obtenerCarrito();
        const item = carrito.find(p => p.id === id);
        if (item) {
          agregarAlCarrito(item);
          this.renderizar();
        }
      }

      if (e.target.classList.contains("cart-item-restar")) {
        const id = Number(e.target.dataset.id);
        disminuirCantidad(id);
        this.renderizar();
      }
    });

    window.addEventListener("carrito-actualizado", () => this.renderizar());

    document.getElementById("carrito")?.addEventListener("click", () => this.abrir());
  }

  abrir() {
    this.renderizar();
    this.querySelector("#cart-overlay").classList.add("activo");
  }

  cerrar() {
    this.querySelector("#cart-overlay").classList.remove("activo");
  }

  renderizar() {
    const carrito = obtenerCarrito();
    const contenedor = this.querySelector("#cart-items");

    if (carrito.length === 0) {
      contenedor.innerHTML = `<p class="cart-vacio">Tu carrito está vacío</p>`;
    } else {
      contenedor.innerHTML = carrito.map(item => `
        <div class="cart-item">
          <img src="${item.thumbnail}" alt="${item.title}">
          <div class="cart-item-info">
            <p class="cart-item-title">${item.title}</p>
            <div class="cart-item-cantidad">
              <button class="cart-item-restar" data-id="${item.id}">-</button>
              <span>${item.cantidad}</span>
              <button class="cart-item-sumar" data-id="${item.id}">+</button>
            </div>
            <p>$${(item.price * item.cantidad).toFixed(2)}</p>
          </div>
          <button class="cart-item-eliminar" data-id="${item.id}">Eliminar</button>
        </div>
      `).join("");
    }

    this.querySelector("#cart-total").textContent = `$${calcularTotal().toFixed(2)}`;
  }
}

customElements.define('cart-modal', CartModal);