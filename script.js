import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjQgu08oCJdEIYSKYCOLdbLbeQi42u3js",
  authDomain: "wali-landing.firebaseapp.com",
  projectId: "wali-landing",
  storageBucket: "wali-landing.appspot.com",
  messagingSenderId: "432734985553",
  appId: "1:432734985553:web:b10270a22be57aea878770",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const body = document.body;
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
  if (!uploadInput.value) return alert("Please select a file!");

  body.style.pointerEvents = "none";
  spinner.style.visibility = "visible";

  const date = new Date().toISOString();
  const bucket = ref(storage, "Uploads/" + `${date}_${fileName}`);

  uploadBytes(bucket, uploadInput.files[0])
    .then((snapshot) => {})
    .catch((error) => {
      body.style.pointerEvents = "";
      spinner.style.visibility = "hidden";
      alert(
        "Looks like something went wrong. Please check your file size is less than 5MB and try again."
      );
      console.log("--->", error);
    })
    .finally(() => {
      uploadInput.value = "";
      fileName = "No file chosen";
      fileStatus.innerHTML = fileName;

      body.style.pointerEvents = "";
      spinner.style.visibility = "hidden";

      alert("Your file has been uploaded.");
      console.log("---> File uploaded to bucket");
    });
});
