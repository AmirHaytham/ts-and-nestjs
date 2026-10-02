class User {
  constructor(public name: string) {}

  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

const user = new User('Hassan');
const other = new User('Mona');

console.log('The three questions from the slide');
console.log('  1. user.greet === User.prototype.greet ->', user.greet === User.prototype.greet);
console.log('  2. does user own greet?               ->', Object.hasOwn(user, 'greet'));
console.log('  3. Object.keys(user)                  ->', Object.keys(user));

console.log('\nA class is a constructor function plus a prototype object');
console.log('  typeof User                    ->', typeof User);
console.log('  User.prototype.constructor     ->', User.prototype.constructor === User ? 'User' : '?');
console.log('  own keys of User.prototype     ->', Object.getOwnPropertyNames(User.prototype));

console.log('\nMethods are stored once and shared');
console.log('  user.greet === other.greet     ->', user.greet === other.greet);
console.log('  user.name === other.name       ->', user.name === other.name);

console.log('\nWalking the chain, one step at a time');
let link: object | null = user;
let step = 0;
while (link) {
  const label =
    link === user ? 'user' : link === User.prototype ? 'User.prototype' : 'Object.prototype';
  const names = Object.getOwnPropertyNames(link);
  const shown = names.filter((n) => !n.startsWith('__')).slice(0, 4).join(', ');
  const more = names.length > 4 ? `, ... ${names.length} in total` : '';
  console.log(`  ${step}. ${label.padEnd(17)} owns: ${shown}${more}`);
  link = Object.getPrototypeOf(link);
  step++;
}
console.log(`  ${step}. null`);

console.log('\nThe lookup rule in action');
console.log('  user.name        found on user itself      ->', user.name);
console.log('  user.greet()     found on User.prototype   ->', user.greet());
console.log('  user.toString()  found on Object.prototype ->', user.toString());
console.log('  user.fly         not found anywhere        ->', (user as any).fly);

console.log('\nChange the prototype once, every instance sees it');
(User.prototype as any).wave = function () {
  return `${this.name} waves`;
};
console.log('  ', (user as any).wave(), '|', (other as any).wave());

console.log('\nAn own property shadows the prototype');
(user as any).greet = () => 'I have my own greet now';
console.log('  user.greet()  ->', user.greet());
console.log('  other.greet() ->', other.greet());
