import { faker } from '@faker-js/faker/locale/en';

export type Person = {
  firstName: string
  lastName: string
  startDate: string
  department: 'Sales' | 'Marketing' | 'Engineering' | 'Human Resources' | 'Legal'
  dateOfBirth: string
  street : string
  city: string
  state : string
  zipCode : string
  subRows?: Person[]
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    startDate: faker.datatype.datetime({ max: new Date().getTime()  }).toLocaleDateString(),
    department: faker.helpers.shuffle<Person['department']>([
      'Sales',
      'Marketing',
      'Engineering',
      'Legal',
    ])[0]!,
    dateOfBirth: faker.datatype.datetime({ min: 567648000000, max: new Date().getTime() }).toLocaleDateString(),
    street :faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}