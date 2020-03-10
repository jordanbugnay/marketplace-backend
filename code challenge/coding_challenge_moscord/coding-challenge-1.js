const people = [
  {
    name: 'Arisa',
    department: 'BP',
    gender: 'F',
  },
  {
    name: 'Ham',
    department: 'IT',
    gender: 'F',
  },
  {
    name: 'Alice',
    department: 'IT',
    gender: 'F',
  },
  {
    name: 'Anna',
    department: 'DA',
    gender: 'F',
  },
  {
    name: 'Larry',
    department: 'Sales',
    gender: 'M',
  },
  {
    name: 'Ria',
    department: 'Sales',
    gender: 'F',
  },
  {
    name: 'JD',
    department: 'Sales',
    gender: 'M',
  },
  {
    name: 'Thor',
    department: 'Sales',
    gender: 'M',
  },
  {
    name: 'Karl',
    department: 'Sales',
    gender: 'M',
  },
  {
    name: 'Rachel',
    department: 'Sales',
    gender: 'F',
  },
];

function listByGender(gender) {
  gender = gender.toUpperCase();
  if (gender !== 'M' && gender !== 'F') {
    return 'Gender not supported';
  }
  return people.filter(p => p.gender === gender);
}

function groupByDepartment() {
  let departments = {};
  for (let x = 0; x < people.length - 1; x++) {
    const employee = people[x];

    if (departments[employee.department]) {
      departments[employee.department] = [
        ...departments[employee.department],
        employee,
      ];
    } else {
      departments[employee.department] = [employee];
    }
  }
  return departments;
}
