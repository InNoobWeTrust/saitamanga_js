class Model {
  constructor() {
    this.fields = [];
    this.data = {};
  }

  addAll(fields = {}) {
    const keys = Object.keys(fields);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      const v = fields[k];
      this.data[k] = v;
      this.fields.push(k);
    }
  }

  add(k, v) {
    this.data[k] = v;
    this.fields.push(k);
  }
}

export default Model;
