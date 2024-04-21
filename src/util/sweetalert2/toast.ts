import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

type ToastType = "success" | "error" | "warning" | "info";

export function showToast(type: ToastType, message: String) {
  message = message ?? "Message";
  Toast.fire({
    icon: type,
    title: message,
  });
}

// success
// error
// warning
// info
