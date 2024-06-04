const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}

const formSearch = document.querySelector("#form-search");
if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let url = new URL(window.location.href);
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}

const checkboxMulti = document.querySelectorAll("[checkbox-multi]");
if (checkboxMulti) {
  checkboxMulti.forEach((container) => {
    const inputCheckAll = container.querySelector("input[name='checkall']");
    const inputIds = container.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
      if (inputCheckAll.checked) {
        inputIds.forEach((input) => {
          input.checked = true;
        });
      } else {
        inputIds.forEach((input) => {
          input.checked = false;
        });
      }
    });

    inputIds.forEach((input) => {
      input.addEventListener("click", () => {
        const countChecked = container.querySelectorAll(
          "input[name='id']:checked"
        ).length;

        if (countChecked === inputIds.length) {
          inputCheckAll.checked = true;
        } else {
          inputCheckAll.checked = false;
        }
      });
    });
  });
}

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("Ban cos chac muon xoa nhung san pham nay ?");

      if (!isConfirm) {
        return;
      }
    }
    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach((input) => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui long chon it nhat 1 san pham ");
    }
  });
}

const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
