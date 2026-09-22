interface Passenger {
  name: string;
  children?: string[];
}

const passenger1: Passenger = {
  name: "Fernando",
};

const passenger2: Passenger = {
  name: "Melissa",
  children: ["Natalia", "Elizabeth"],
};

const printChildren = (passenger: Passenger) => {
  const howManyChildren = passenger.children?.length || 0;
  console.log(`${passenger.name}: has ${howManyChildren} children`);
};

printChildren(passenger1);
printChildren(passenger2);

const returnChildrenNumber = (passenger: Passenger): number => {
  if (!passenger.children) return 0;
  const howManyChildren = passenger.children!.length;
  return howManyChildren;
};

returnChildrenNumber(passenger1);
returnChildrenNumber(passenger2);
