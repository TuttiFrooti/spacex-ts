const verifyInputFields = () => {
  document.querySelector('#ip-submit').addEventListener('click', () => {
    const getNameInput = document.querySelector('#ip-name input');
    const getEmailInput = document.querySelector('#ip-email input');
    const getMsgTextarea = document.querySelector('#ip-message textarea');
    let thisError = [];

    if (!getNameInput.value && !thisError.includes('missing name')) {
      thisError.push('missing name');
    } else if (getNameInput.value.length < 3 && !thisError.includes('name too short')) {
      thisError.push('name too short');
    } else {
      thisError.slice('name');
    }

    if (!getEmailInput.value) {
      thisError.push('missing email');
    } else {
      thisError.slice('email')
      let regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
      let validateEmail = getEmailInput.value.match(regex);
      if (!validateEmail) {
        thisError.push('email format');
      } else {
        thisError.slice('email');
      }
    }

    if (!getMsgTextarea.value) {
      thisError.push('missing message');
    } else if (getMsgTextarea.value.length < 30) {
      thisError.push('message too short');
    } else {
      thisError.slice('message');
    }

    if (thisError.length <= 0) {
      let errorDiv = document.querySelector('#ct-errors');
      errorDiv.style.display = 'none';
    } else {
      thisError = thisError.join(", ")
      let errorDiv = document.querySelector('#ct-errors');
      errorDiv.innerHTML = `Error: ${thisError}`;
      errorDiv.style.display = 'flex';
    }
  })
}

const toggleOverlay = (elmID, focus) => {
  const leftEdge = document.querySelector(`#${elmID} .ct-left-edge-wrap`);
  const rightEdge = document.querySelector(`#${elmID} .ct-right-edge-wrap`);
  if (focus) {
    leftEdge.classList.add('ct-edge-wrap-left-overlay');
    rightEdge.classList.add('ct-edge-wrap-right-overlay');
  } else {
    leftEdge.classList.remove('ct-edge-wrap-left-overlay');
    rightEdge.classList.remove('ct-edge-wrap-right-overlay');
  }
}

const fieldManipulation = () => {
  const fields = document.querySelectorAll('.ct-field');
  fields.forEach(e => {
    if (e.id === 'ip-submit') return;
    e.addEventListener('click', function () {
      if (this.id === 'ip-message') {
        document.querySelector(`#${this.id} textarea`).focus();
        toggleOverlay(this.id, true);
      } else {
        document.querySelector(`#${this.id} input`).focus();
        toggleOverlay(this.id, true);
      }
    });

    e.addEventListener("focusout", function() {
      if (this.id === 'ip-message') {
        const textArea = document.querySelector(`#${this.id} textarea`);
        if (!textArea.value) {
          toggleOverlay(this.id, false);
        }
      } else {
        const input = document.querySelector(`#${this.id} input`);
        if (!input.value) {
          toggleOverlay(this.id, false);
        }
      }
    });
  })
}

const menuButton = () => {
  document.querySelector('.mn-button').addEventListener('click', function () {
    let getMenu = document.querySelector('.mn-wrap');
    getMenu.classList.toggle('mobile-menu');
    this.classList.toggle('open');
  })
}

menuButton();
fieldManipulation();
verifyInputFields();