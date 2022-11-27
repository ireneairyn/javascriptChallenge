import readline from "readline/promises";

/* 
  si utilizáis algún import en vuestra solución, recordad que hay que indicarle a node 
  que estamos utilizando módulos. Para ello, debemos incluir el fichero package.json que 
  veis en este repositorio. En caso de que no os funcione, contactadme por discord.
*/

const students = [
  {
    age: 32,
    examScores: [],
    gender: "male",
    name: "edu",
  },
  {
    age: 29,
    examScores: [],
    gender: "female",
    name: "silvia",
  },
];

const availableMaleNames = [
  "pepe",
  "juan",
  "victor",
  "leo",
  "francisco",
  "carlos",
];
const availableFemaleNames = [
  "cecilia",
  "ana",
  "luisa",
  "silvia",
  "isabel",
  "virginia",
];
const availableGenders = ["male", "female"];

/* Como podéis ver, cada requirement tiene un número asignado. 
Cuando ejecutemos la aplicación, aparecerá el listado completo de requirements. 
El usuario debe pulsar el número correspondiente a ese requirement para que se ejecute. 
Una vez la ejecución termine, volveremos a mostrar el listado de requirements para que 
el usuario pueda seleccionar otro. En caso de que el usuario pulse el 0 o un número 
no contemplado, la aplicación terminará. 

1 Listado de requirements
2 Usuario pulsa
3 Ejecución termina -> lista de requirements
4 Usuario pulsa 0 o incorrecto -> fin aplicación*/

const requirementsText = `
1- Mostrar en formato de tabla todos los alumnos.
2- Mostrar por consola la cantidad de alumnos que hay en clase.
3- Mostrar por consola todos los nombres de los alumnos.
4- Eliminar el último alumno de la clase.
5- Eliminar un alumno aleatoriamente de la clase.
6- Mostrar por consola todos los datos de los alumnos que son chicas.
7- Mostrar por consola el número de chicos y chicas que hay en la clase.
8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.
9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.
10- Añadir un alumno nuevo:
11- Mostrar por consola el nombre de la persona más joven de la clase.
12- Mostrar por consola la edad media de todos los alumnos de la clase.
13- Mostrar por consola la edad media de las chicas de la clase.
14- Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas.
15- Ordenar el array de alumnos alfabéticamente según su nombre.
----
16- Mostrar por consola el alumno de la clase con las mejores notas.
17- Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.
18- Añadir un punto extra a cada nota existente de todos los alumnos. 
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function requirement1() {
  console.table(students);
}

function requirement2() {
  console.log(students.length);
}

function requirement3() {
  for (const student of students) {
    console.log(student.name);
  }
}

function requirement4() {
  const removed = students.pop();
  if (removed === undefined) {
    console.log("Nobody to remove");
  } else {
    console.log(`${removed.name} was removed.`);
  }
}

function requirement5() {
  const removedElements = students.splice(randomIndex(students), 1);
  if (removedElements.length === 0) {
    console.log("Nobody to remove");
  } else {
    console.log(`${removedElements[0].name} was removed.`);
  }
}

function requirement6() {
  console.table(students.filter((student) => student.gender === "female"));
}

function requirement7() {
  const females = students.filter((student) => student.gender === "female");
  const males = students.filter((student) => student.gender === "male");
  console.log(`Number of women: ${females.length}`);
  console.log(`Number of men: ${males.length}`);
}

function requirement8() {
  const females = students.filter((student) => student.gender === "female");
  const males = students.filter((student) => student.gender === "male");
  console.log(males.length === 0 && females.length > 0);
}

function requirement9() {
  const young = students.filter(
    (student) => student.age > 19 && student.age < 26
  );
  for (const student of young) {
    console.log(student.name);
  }
}

function requirement10() {
  const age = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
  const examScores = [];
  const gender = availableGenders[randomIndex(availableGenders)];
  const name =
    gender === "female"
      ? availableFemaleNames[randomIndex(availableFemaleNames)]
      : availableMaleNames[randomIndex(availableMaleNames)];

  const newStudent = { age, examScores, gender, name };
  students.push(newStudent);
}

function requirement11() {
  const sorted = students.sort((a, b) => a.age - b.age);
  console.log(sorted[0].name);
}

function requirement12() {
  const totalAge = students.reduce((acc, student) => acc + student.age, 0);
  console.log(totalAge / students.length);
}

function requirement13() {
  const girls = students.filter((student) => student.gender === "female");
  const totalAge = girls.reduce((acc, student) => acc + student.age, 0);
  console.log(totalAge / girls.length);
}

function requirement14() {
  for (const student of students) {
    const newScore = Math.floor(Math.random() * 11);
    student.examScores.push(newScore);
  }
}

function requirement15() {
  const alphabetical = students.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name === b.name) {
      return 0;
    }
    return 1;
  });
}

function requirement16() {
  let topStudent;
  let topTotalScore;

  for (const student of students) {
    let totalScore = 0;
    for (const score of student.examScores) {
      totalScore += score;
    }

    if (topStudent === undefined) {
      topStudent = student;
      topTotalScore = totalScore;
    } else {
      if (totalScore > topTotalScore) {
        topStudent = student;
      }
    }
  }

  console.log(topStudent.name);
}

function requirement17() {
  let topStudentAvg;
  let topAvgScore;

  for (const student of students) {
    let totalScore = 0;
    for (const score of student.examScores) {
      totalScore += score;
    }
    const avgScore = totalScore / student.examScores.length;

    if (topStudentAvg === undefined) {
      topStudentAvg = student;
      topAvgScore = avgScore;
    } else {
      if (avgScore > topAvgScore) {
        topStudentAvg = student;
      }
    }
  }

  console.log(topStudentAvg.name);
}

function requirement18() {
  for (const student of students) {
    if (student.examScores.length === 0) {
      student.examScores.push(10);
    } else {
      for (let i = 0; i < student.examScores.length; i++) {
        if (student.examScores[i] < 10) {
          student.examScores[i] += 1;
        }
      }
    }
  }
}

const requirements = {
  1: requirement1,
  2: requirement2,
  3: requirement3,
  4: requirement4,
  5: requirement5,
  6: requirement6,
  7: requirement7,
  8: requirement8,
  9: requirement9,
  10: requirement10,
  11: requirement11,
  12: requirement12,
  13: requirement13,
  14: requirement14,
  15: requirement15,
  16: requirement16,
  17: requirement17,
  18: requirement18,
};

while (true) {
  console.log(requirementsText);

  const number = Number(
    await rl.question("What requirement would you like to run? ")
  );

  if (isNaN(number) || number < 1 || number > 18) {
    console.log("Invalid input.");
    process.exit();
  }

  const requirement = requirements[number];
  console.log("\n------------ANSWER-------------");
  requirement();
  console.log("-------------------------------");
}
