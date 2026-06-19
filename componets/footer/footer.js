class MiFooter extends HTMLElement {
  connectedCallback() {
  this.innerHTML = `
    <style>
      .mi-footer {
        background-color: var(--beige-arena-suave);
        color: var(--azul-marino-profundo);
        border-top: 3px solid var(--ambar-dorado);
        padding: 1rem;
        text-align: center;
      }
    </style>
    <footer class="mi-footer">
      <p>&copy; ${new Date().getFullYear()} Mi Sitio Web. Todos los derechos reservados.</p>
      <div>
        <a href="/privacy">Política de Privacidad</a> |
        <a href="/terms">Términos de Servicio</a>
      </div>
    </footer>
  `;
}
}


customElements.define('mi-footer', MiFooter);