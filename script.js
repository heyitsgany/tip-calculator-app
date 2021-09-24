"use strict";

// *************************************************************************
// DOCUMENT SELECTORS
const billWarning = document.querySelector(".bill__warning");
const inputBill = document.querySelector("#bill");
const tipSelect = document.querySelector(".form__selection--container");
const inputTip = document.querySelector("#tip");
const peopleWarning = document.querySelector(".people__warning");
const inputPeople = document.querySelector("#people");

const tipAmount = document.querySelector(".tip__amount");
const totalAmount = document.querySelector(".total__amount");
const resetBtn = document.querySelector(".results__reset--btn");

// *************************************************************************
// APP CLASS
class App {
  #billAmount;
  #numberOfPeople;
  #tipPercentage;
  #lastClicked;

  constructor() {
    this._resetApp();

    inputBill.addEventListener("input", this._getBillAmount.bind(this));
    tipSelect.addEventListener("click", this._selectTipPercentage.bind(this));
    inputTip.addEventListener("input", this._getCustomTipPercentage.bind(this));
    inputPeople.addEventListener("input", this._getNumberOfPeople.bind(this));
    resetBtn.addEventListener("click", this._resetApp.bind(this));
  }

  _getBillAmount() {
    this.#billAmount = Number(inputBill.value);
    this._activateResetBtn();
    this._calcTotals();
  }

  _selectTipPercentage(clickEvent) {
    // GUARD CLAUSE
    if (!clickEvent.target.classList.contains("tip__btn")) {
      return;
    }

    if (inputTip.value) {
      inputTip.value = "";
    }

    const clicked = clickEvent.target;

    // ONLY SELECT ONE BUTTON AT A TIME
    if (this.#lastClicked && clicked != this.#lastClicked) {
      this.#lastClicked.classList.remove("selected");
    }

    clicked.classList.add("selected");
    if (clicked.classList.contains("amount--5")) {
      this.#tipPercentage = 0.05;
    }
    if (clicked.classList.contains("amount--10")) {
      this.#tipPercentage = 0.1;
    }
    if (clicked.classList.contains("amount--15")) {
      this.#tipPercentage = 0.15;
    }
    if (clicked.classList.contains("amount--25")) {
      this.#tipPercentage = 0.25;
    }
    if (clicked.classList.contains("amount--50")) {
      this.#tipPercentage = 0.5;
    }

    // VARIABLE FOR CHECKING ONLY ONE BUTTON SELECTED
    this.#lastClicked = clicked;

    this._activateResetBtn();
    this._calcTotals();
  }

  _getCustomTipPercentage() {
    if (this.#lastClicked) {
      this.#lastClicked.classList.remove("selected");
    }
    this.#tipPercentage = Number(inputTip.value) / 100;

    this._activateResetBtn();
    this._calcTotals();
  }

  _getNumberOfPeople() {
    this.#numberOfPeople = Number(inputPeople.value);
    if (this.#numberOfPeople < 1) {
      peopleWarning.classList.add("warn");
      inputPeople.parentElement.classList.add("warn");
      return;
    }

    if (peopleWarning.classList.contains("warn")) {
      peopleWarning.classList.remove("warn");
      inputPeople.parentElement.classList.remove("warn");
    }
    this.#numberOfPeople = Number(inputPeople.value);
    this._activateResetBtn();
    this._calcTotals();
  }

  _calcTotals() {
    if (!this.#billAmount || !this.#numberOfPeople || !this.#tipPercentage) {
      return;
    }

    const tip = this.#billAmount * this.#tipPercentage;

    tipAmount.textContent = "$" + Number(tip / this.#numberOfPeople).toFixed(2);
    totalAmount.textContent =
      "$" + Number((this.#billAmount + tip) / this.#numberOfPeople).toFixed(2);
  }

  _activateResetBtn() {
    if (resetBtn.classList.contains("active")) {
      return;
    }
    resetBtn.classList.add("active");
  }

  _resetApp() {
    if (this.#lastClicked) {
      this.#lastClicked.classList.remove("selected");
    }
    inputBill.value = inputTip.value = inputPeople.value = "";
    this.#billAmount = this.#tipPercentage = this.#numberOfPeople = "";
    tipAmount.textContent = "$" + Number(0).toFixed(2);
    totalAmount.textContent = "$" + Number(0).toFixed(2);
    resetBtn.classList.remove("active");
  }
}

// *************************************************************************
// APP INIT

const app = new App();
