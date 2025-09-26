const loader = document.getElementById("loader");

export function showLoading() {
  loader.classList.remove("hidden");
}

export function hideLoading() {
  loader.classList.add("hidden");
}
