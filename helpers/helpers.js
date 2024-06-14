import { login } from '../fixtures/data'
import { faker } from '@faker-js/faker';

export function createUser() {
    const name = faker.person.middleName()
    const dateNow = Date.now()
    const userName = `Qa${name}-${dateNow}`;
    const email = `${userName}@gmail.com`; 
    return {
        userName,
        email,
        password: login.password,
    };
}
