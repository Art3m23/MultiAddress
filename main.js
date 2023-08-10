const addAddressBtn = document.querySelector('.btn-add');
const closeBtn = document.querySelector('.close');
const modalAddress = document.querySelector('.modal_address');
const row = document.querySelector('.row');
const form = document.querySelector('.new-address');
const cards = JSON.parse(localStorage.getItem('cards')) ? JSON.parse(localStorage.getItem('cards')) : [];
const modalRemove = document.querySelector('.modal_remove');
const closeRemoveBtn = document.querySelector('.close-remove');
const btnOK = document.querySelector('.btn-ok');
const btnCancel = document.querySelector('.btn-cancel');

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
  form.reset();
};



addAddressBtn.addEventListener('click', addAddress);
closeBtn.addEventListener('click', close);

function closeRemove() {
  modalRemove.style.display = 'none';
};

btnCancel.addEventListener('click', closeRemove);

row.addEventListener('click', function (event) {
  if(event.target.closest('.btn-remove')){
    modalRemove.style.display = 'block';
  } else {
    return;
  }
});
closeRemoveBtn.addEventListener('click', closeRemove);


function submit(e) {
  e.preventDefault();
  const htmlElement = `<div class="col d-flex  justify-content-center">
    <div class="card">
      <div class="card-body d-flex  justify-content-between flex-column">
        <h5 class="card-title mb-4 ps-5">${e.currentTarget[5].value + ',' + e.currentTarget[6].value}</h5>
        <h6 class="card-subtitle mb-4 ps-5">${e.currentTarget[3].value + ',' + e.currentTarget[2].value + ',' + e.currentTarget[1].value + ',' + e.currentTarget[0].value + ',' + e.currentTarget[4].value}</h6>
        <div class="container-btn d-flex justify-content-start">
          <a href="#" class="card-link">
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
  cards.push(htmlElement);
  localStorage.setItem('cards', JSON.stringify(cards));
  form.reset();
  modalAddress.style.display = 'none';
}

form.addEventListener('submit', submit)


function remove() {
  
};

btnOK.addEventListener('click', remove);
