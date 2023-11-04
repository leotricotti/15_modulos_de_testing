//Cerrar sesión
const logout = () => {
  // Puerto local
  const localPort = localStorage.getItem("localPort");

  Swal.fire({
    title: "¿Estás seguro que deseas cerrar sesión?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Cerrar sesión`,
    denyButtonText: `Cancelar`,
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Gracias por utilizar nuestros servicios",
        showConfirmButton: true,
        confirmButtonText: `Aceptar`,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("currentPage", 1);
        window.location.href = `http://127.0.0.1:${localPort}/html/index.html`;
      }, 2000);
    }
  });
};
