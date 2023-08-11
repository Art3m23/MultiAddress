const addAddressBtn = document.querySelector('.btn-add');
const closeBtn = document.querySelector('.close');
const modalAddress = document.querySelector('.modal_address');
const row = document.querySelector('.row');
const formAdd = document.querySelector('.new-address');
const formChange = document.querySelector('.change-address');
let cardsArray = JSON.parse(localStorage.getItem('cards')) ? JSON.parse(localStorage.getItem('cards')) : [];
const modalRemove = document.querySelector('.modal_remove');
const modalChange = document.querySelector('.modal_change');
const closeRemoveBtn = document.querySelector('.close-remove');
const closeChangeBtn = document.querySelector('.close-change');
const cancelChangeBtn = document.querySelector('.btn-cancel-change');
const btnOK = document.querySelector('.btn-ok');
const btnCancel = document.querySelector('.btn-cancel');
let removeIndex, changeIndex = 0;

window.onload = () => {
  if (JSON.parse(localStorage.getItem('cards'))) {
    JSON.parse(localStorage.getItem('cards')).forEach(element => {
      row.innerHTML += element;
    });
  }
};


function addAddress() {
  modalAddress.style.display = 'block';
};

function close() {
  modalAddress.style.display = 'none';
  formAdd.reset();
};



addAddressBtn.addEventListener('click', addAddress);
closeBtn.addEventListener('click', close);

function closeRemove() {
  modalRemove.style.display = 'none';
};

btnCancel.addEventListener('click', closeRemove);

row.addEventListener('click', function (event) {
  const removeBtns = document.querySelectorAll('.btn-remove');
  if (event.target.closest('.btn-remove')) {
    console.log(event.target.closest('.btn-remove'));
    removeBtns.forEach((el, i) => {
      if (el === event.target.closest('.btn-remove')) {
        removeIndex = i;
        console.log(i);
      }
    });
    modalRemove.style.display = 'block';
  } else {
    return;
  }
});

closeRemoveBtn.addEventListener('click', closeRemove);
cancelChangeBtn.addEventListener('click', closeChange);

row.addEventListener('click', function (event) {
  let arrValueForm = [];
  const cardTitle = event.target.closest('.card').querySelector('.card-title');
  const cardSubTitle = event.target.closest('.card').querySelector('.card-subtitle');
  const inputsFormChange = document.querySelectorAll('.change-address-input');
  arrValueForm[5] = cardTitle.innerHTML.split(';')[0];
  arrValueForm[6] = cardTitle.innerHTML.split(';')[1];
  arrValueForm[3] = cardSubTitle.innerHTML.split(';')[0];
  arrValueForm[2] = cardSubTitle.innerHTML.split(';')[1];
  arrValueForm[1] = cardSubTitle.innerHTML.split(';')[2];
  arrValueForm[0] = cardSubTitle.innerHTML.split(';')[3];
  arrValueForm[4] = cardSubTitle.innerHTML.split(';')[4];
  const changeBtns = document.querySelectorAll('.btn-change');
  if (event.target.closest('.btn-change')) {
    console.log(event.target.closest('.btn-change'));
    changeBtns.forEach((el, i) => {
      if (el === event.target.closest('.btn-change')) {
        changeIndex = i;
        console.log(i);
      }
    });
    modalChange.style.display = 'block';
  } else {
    return;
  }
  console.log(arrValueForm);
  inputsFormChange.forEach((el, i) => {
    el.value = arrValueForm[i];
  });
});

function closeChange() {
  modalChange.style.display = 'none';
};

closeChangeBtn.addEventListener('click', closeChange);

function submit(e) {
  e.preventDefault();
  const htmlElement = `<div class="col d-flex  justify-content-center">
    <div class="card">
      <div class="card-body d-flex  justify-content-between flex-column">
        <h5 class="card-title mb-4 ps-5">${e.currentTarget[5].value + '; ' + e.currentTarget[6].value}</h5>
        <h6 class="card-subtitle mb-4 ps-5">${e.currentTarget[3].value + '; ' + e.currentTarget[2].value + '; ' + e.currentTarget[1].value + '; ' + e.currentTarget[0].value + '; ' + e.currentTarget[4].value}</h6>
        <div class="container-btn d-flex justify-content-start">
          <a href="#change-address" class="card-link">
            <button type="submit" class="btn-card btn-change">Изменить</button>
          </a>
          <a href="#remove-address" class="card-link">
            <button type="submit" class="btn-card btn-remove" >Удалить</button>
          </a>
        </div>
      </div>
    </div>
  </div>`;
  row.innerHTML += htmlElement;
  cardsArray.push(htmlElement);
  localStorage.setItem('cards', JSON.stringify(cardsArray));
  formAdd.reset();
  modalAddress.style.display = 'none';
  document.location.href = document.location.href.split('#')[0] + '#';
};

formAdd.addEventListener('submit', submit);


function remove() {
  row.innerHTML = '';
  cardsArray = cardsArray.filter((el, i) => i !== removeIndex);
  cardsArray.forEach(element => {
    row.innerHTML += element;
  });
  localStorage.setItem('cards', JSON.stringify(cardsArray));
  modalRemove.style.display = 'none';
};

btnOK.addEventListener('click', remove);

function change(e) {
  e.preventDefault();
  const htmlElement = `<div class="col d-flex  justify-content-center">
    <div class="card">
      <div class="card-body d-flex  justify-content-between flex-column">
        <h5 class="card-title mb-4 ps-5">${e.currentTarget[5].value + '; ' + e.currentTarget[6].value}</h5>
        <h6 class="card-subtitle mb-4 ps-5">${e.currentTarget[3].value + '; ' + e.currentTarget[2].value + '; ' + e.currentTarget[1].value + '; ' + e.currentTarget[0].value + '; ' + e.currentTarget[4].value}</h6>
        <div class="container-btn d-flex justify-content-start">
          <a href="#change-address" class="card-link">
            <button type="submit" class="btn-card btn-change">Изменить</button>
          </a>
          <a href="#remove-address" class="card-link">
            <button type="submit" class="btn-card btn-remove" >Удалить</button>
          </a>
        </div>
      </div>
    </div>
  </div>`;
  row.innerHTML = '';
  cardsArray[changeIndex] = htmlElement;
  cardsArray.forEach(element => {
    row.innerHTML += element;
  });
  localStorage.setItem('cards', JSON.stringify(cardsArray));
  formChange.reset();
  modalChange.style.display = 'none';
  document.location.href = document.location.href.split('#')[0] + '#';
};

formChange.addEventListener('submit', change);
