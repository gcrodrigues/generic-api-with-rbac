export class Password {
  value: string

  constructor(value: string) {
    this.value = value
  }

  async isValid() {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`[\]{}\\|;:',./<>?]).{8,}$/;
    return regex.test(this.value)
  }
}
