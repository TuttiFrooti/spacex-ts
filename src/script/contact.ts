const verifyInputFields = () => {
  const submit = document.querySelector('#ip-submit') as HTMLElement;
  submit.addEventListener("click", () => {
    const getNameInput = document.querySelector("#ip-name input") as HTMLInputElement;
    const getEmailInput = document.querySelector("#ip-email input") as HTMLInputElement;
    const getMsgTextarea = document.querySelector("#ip-message textarea") as HTMLTextAreaElement;
    let thisError: string[] | number = [];

    if (!getNameInput.value && !thisError.includes("missing name")) {
      thisError.push("missing name");
    } else if ( getNameInput.value.length < 3 && !thisError.includes("name too short")) {
      thisError.push("name too short");
    }

    if (!getEmailInput.value) {
      thisError.push("missing email");
    } else {
      let regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
      let validateEmail = getEmailInput.value.match(regex);
      if (!validateEmail) {
        thisError.push("email format");
      }
    }

    if (!getMsgTextarea.value) {
      thisError.push("missing message");
    } else if (getMsgTextarea.value.length < 30) {
      thisError.push("message too short");
    }

    if (thisError.length <= 0) {
      let errorDiv = document.querySelector("#ct-errors") as HTMLDivElement;
      errorDiv.style.display = "none";
    } else {
      let constructError: string = thisError.join(", ");
      let errorDiv = document.querySelector("#ct-errors") as HTMLDivElement;
      errorDiv.innerHTML = `Error: ${constructError}`;
      errorDiv.style.display = "flex";
    }
  });
}

const toggleOverlay = (elmID: string, focus: boolean) => {
  const leftEdge = document.querySelector(`#${elmID} .ct-left-edge-wrap`) as HTMLElement;
  const rightEdge = document.querySelector(`#${elmID} .ct-right-edge-wrap`) as HTMLElement;
  if (focus) {
    leftEdge.classList.add('ct-edge-wrap-left-overlay');
    rightEdge.classList.add('ct-edge-wrap-right-overlay');
  } else {
    leftEdge.classList.remove('ct-edge-wrap-left-overlay');
    rightEdge.classList.remove('ct-edge-wrap-right-overlay');
  }
}

interface ThisEl {
  id: string;
}

const fieldManipulation = () => {
  const fields = document.querySelectorAll('.ct-field') as NodeListOf<Element>;
  fields.forEach((e) => {
    if (e.id === 'ip-submit') return;
    e.addEventListener('click', function (this: ThisEl) {
      if (this.id === 'ip-message') {
        let textArea = document.querySelector(`#${this.id} textarea`) as HTMLTextAreaElement;
        textArea.focus();
        toggleOverlay(this.id, true);
      } else {
        let inputField = document.querySelector(`#${this.id} input`) as HTMLInputElement;
        inputField.focus();
        toggleOverlay(this.id, true);
      }
    });

    e.addEventListener("focusout", function(this: ThisEl) {
      if (this.id === 'ip-message') {
        const textArea = document.querySelector(`#${this.id} textarea`) as HTMLTextAreaElement;
        if (!textArea.value) {
          toggleOverlay(this.id, false);
        }
      } else {
        const input = document.querySelector(`#${this.id} input`) as HTMLInputElement;
        if (!input.value) {
          toggleOverlay(this.id, false);
        }
      }
    });
  })
}

const menuButton = () => {
  const Button = document.querySelector('.mn-button') as HTMLButtonElement;
  Button.addEventListener("click", function () {
    let getMenu = document.querySelector(".mn-wrap") as HTMLElement;
    getMenu.classList.toggle("mobile-menu");
    this.classList.toggle("open");
  });
}

menuButton();
fieldManipulation();
verifyInputFields();