const animals = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish'];

function catchAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const caughtAnimal = animals[randomIndex];

    document.getElementById("result").innerHTML = `You caught a ${caughtAnimal}!`;
}
