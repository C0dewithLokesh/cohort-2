interface User {
  firstName: string;
  lastName: string;
  age: number;
  email?: string;
}

function isLegal(user: User) {
  if(user.age > 18) {
    return true;
  }
  else {
    return false;
  }
}

isLegal({
  firstName: "Lokesh",
  lastName: "Kaushik",
  age: 20
})