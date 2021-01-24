const Handlebars = require("handlebars");

const operators = {
  in: function (l, r = []) {
    return r.includes(l);
  },
  gt: function (l, r) {
    return Number(l) > Number(r);
  },
};

const times = (n, block) => {
  let accum = "";
  for (var i = 1; i <= n; i++) {
    accum += block.fn(i);
  }
  return accum;
};

const buttonState = (state, value1, value2) => (value1 === value2 ? String(state) : "");

const when = (operand1, operator, operand2, options) => {
  const result = operators[operator](operand1, operand2);
  if (result) return options.fn(this);
  else return options.inverse(this);
};

const gt = (compared, model, exit1, exit2, options) => {
  if (!Number.isInteger(compared)) return options.inverse(this);
  return operators["gt"](compared, model) ? exit1 : exit2;
};

const inc = (value) => {
  return parseInt(value) + 1;
};

const attr = (key, prop, entity) => {
  const isEmpty = Handlebars.Utils.isEmpty;
  let value;
  if (!entity && !isEmpty(prop)) {
    value = prop;
  } else {
    if (Array.isArray(entity) && Number.isInteger(prop)) value = entity[prop];
    if (typeof entity === "object" && entity[prop]) value = entity[prop];
  }
  if (!isEmpty(value)) {
    return new Handlebars.SafeString(`${key}="${value}"`);
  }
};

module.exports = {
  times,
  gt,
  buttonState,
  when,
  inc,
  attr,
};
