export class Person {
  // public name: string;
  // private address: string;

  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public address: string = "No Address",
  ) {
    // this.name = name;
    // this.address = address;
  }
}

/*
export class Hero extends Person {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
  ) {
    super(realName, "New York");
  }
}
*/

export class Hero {
  constructor(
    public alterEgo: string,
    public person: Person,
  ) {}
}

const tonyStark = new Person("Tony", "Stark", 45, "New York");
const ironman = new Hero("Ironman", tonyStark);

console.log(ironman);
