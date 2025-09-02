const { faker } = require('@faker-js/faker');

class DataGenerator {
  static randomEmail() {
    return faker.internet.email();
  }
  
  static randomID() {
    return faker.number.int({ min: 1000, max: 9999 });
  }
  
  static randomPwd() {
    return faker.internet.password({ length: 8 });
  }
  
  static randomBookTitle() {
    return faker.lorem.words(3);
  }
  
  static randomBookAuthor() {
    return faker.person.fullName();
  }
  
  static randomBookDescription() {
    return faker.lorem.sentence();
  }
  
  static randomBookPrice() {
    return faker.number.float({ min: 10, max: 100, precision: 0.01 });
  }
}

module.exports = DataGenerator;
