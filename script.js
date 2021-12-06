import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK3PTzI28gwZJ_XdX3sS1rwKI9szEJsbA",
  authDomain: "thebutterflynetwork-wali.firebaseapp.com",
  databaseURL: "https://thebutterflynetwork-wali.firebaseio.com",
  projectId: "thebutterflynetwork-wali",
  storageBucket: "thebutterflynetwork-wali.appspot.com",
  messagingSenderId: "49673499559",
  appId: "1:49673499559:web:7b6ab5398988afec6c7c82",
  measurementId: "G-HZ6EX6VQM3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadInput = document.getElementById("upload-input");
const selectFileButton = document.getElementById("select-file-button");
const fileStatus = document.getElementById("file-status");
const uploadButton = document.getElementById("upload-button");
const spinner = document.getElementById("spinner-div");

let fileName = "No file chosen";

uploadInput.addEventListener("change", function () {
  fileName = uploadInput.value
    ? uploadInput.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]
    : "No file chosen";
  fileStatus.innerHTML = fileName;
});

selectFileButton.addEventListener("click", () => {
  uploadInput.click();
});

uploadButton.addEventListener("click", function () {
  if (!uploadInput.value) {
    alert("Please select a file!");
    return;
  }

  spinner.style.visibility = "visible";

  const bucket = ref(storage, "Uploads/" + fileName);
  uploadBytes(bucket, uploadInput.files[0])
    .then((snapshot) => {})
    .catch((error) => {
      spinner.style.visibility = "hidden";
      alert(
        "Looks like something went wrong. Please check your file size is less than 5MB and try again."
      );
      console.log("--->", error);
    })
    .finally(() => {
      spinner.style.visibility = "hidden";
      console.log("---> File uploaded to bucket");
    });
});
