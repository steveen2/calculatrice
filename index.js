class OperatorValueFormManager {
  constructor() {
    this.values = [];
  }

  /**
   * This function will manage event to add a new operator value. The value must be a Number
   * @param {Number} value
   */
  addValue(value) {
    if (isNaN(value)) {
      throw new Error("Please input a number value");
    }

    this.values.push(parseFloat(value));
    this.render();
  }

  empty() {
    this.values = [];
    this.render();
  }

  render() {
    const ol = document.querySelector("ol");
    if (ol) {
      ol.innerHTML = this.values.map((it) => `<li>${it}</li>`).join("");
    }
  }
}

class Operation {
  constructor(values, operator) {
    this.values = values;
    this.operator = operator;
  }

  /**
   *
   * @param {Number[]} values
   * @returns
   */
  sum(values) {
    return values.reduce((prevSum, currValue) => prevSum + currValue, 0);
  }

  /**
   *
   * @param {Number[]} values
   * @returns
   */
  max(values) {
    return values.reduce(
      (prevMax, currValue) => Math.max(prevMax, currValue),
      0
    );
  }

  execute() {
    switch (this.operator) {
      case "+":
        return this.sum(this.values);
      case "max":
        return this.max(this.values);
    }
  }
}

class ApplicationManager {
  constructor() {
    this.operatorValueFormManager = new OperatorValueFormManager();
  }

  runOperation() {
    document.querySelector("main > section:nth-child(2)").innerHTML =
      new Operation(
        this.operatorValueFormManager.values,
        document.querySelector("select").value
      ).execute();
  }

  init() {
    document.querySelector("form>button").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.operatorValueFormManager.addValue(
        document.querySelector("form input").value
      );
    });

    document.querySelector("div>button").addEventListener("click", () => {
      this.runOperation();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new ApplicationManager().init();
});
