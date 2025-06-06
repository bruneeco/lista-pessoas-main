import { faker } from '@faker-js/faker/locale/pt_BR';
import lodash from 'lodash';
import fs from 'fs';

const peoples = lodash.times(50, function(n){
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        id: n + 1,
        firstName: firstName,
        lastName: lastName,
        avatar: faker.image.avatar(),
        email: faker.internet.email({firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase()})
        }
    }
);

const data = {};
data.peoples = peoples;
fs.writeFile('db.json', JSON.stringify(data, null, 2), (err) => {
    if(err) throw err;
    console.log('Finalizando...');
});