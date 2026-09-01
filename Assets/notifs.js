let calltoast = document.getElementById("calltoast");

let topToastZ = 1050;
const errorToastContainer = document.getElementById("errorToastContainer");
const successToastContainer = document.getElementById("successToastContainer");

function bringToastToFront(container) {
  topToastZ++;
  container.style.zIndex = topToastZ;
}

function PrintToast(message, t) {
  let liveToast = document.getElementById("liveToast");
  let btsToast = new bootstrap.Toast(liveToast, {
    autohide: true,
    delay: t
  });
  document.getElementById("toastMessage").innerHTML = message;

  bringToastToFront(errorToastContainer);
  btsToast.show();
}

calltoast.addEventListener("click", () => {
  PrintToast("این دانش آموز قابلیت ارتقا به پایه بالاتر را ندارد!", 1500);
});

document.querySelectorAll(".printerror").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    let generatederror = "خطای ناشناخته شماره " + (i + 1) + " رخ داد";
    PrintToast(generatederror, 1500);
  });
});

function PrintToast2(message, t) {
  let liveToast2 = document.getElementById("liveToast2");
  let btsToast = new bootstrap.Toast(liveToast2, {
    autohide: true,
    delay: t
  });
  document.getElementById("toastMessage2").innerHTML = message;

  bringToastToFront(successToastContainer);
  btsToast.show();
}

document.querySelectorAll(".printsuccess").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    let generatederror = "دانش آموز شماره " + (i + 1) + " با موفقیت ثبت نام نهایی شد!";
    PrintToast2(generatederror, 1500);
  });
});
