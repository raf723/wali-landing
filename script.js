import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";

const storage = getStorage();

const uploadInput = document.getElementById("upload-input");
const selectFileButton = document.getElementById("select-file-button");
const fileStatus = document.getElementById("file-status");
const uploadButton = document.getElementById("upload-button");
const spinner = document.getElementById("spinner-div");

let fileName = "No file chosen";

selectFileButton.addEventListener("click", function () {
  uploadInput.click();
});

uploadInput.addEventListener("change", function () {
  fileName = uploadInput.value
    ? uploadInput.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]
    : "No file chosen";
  fileStatus.innerHTML = fileName;
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
