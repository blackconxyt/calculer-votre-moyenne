let notes = [];

function ajouterNote() {
  const input = document.getElementById("noteInput");
  const note = parseFloat(input.value);

  if (!isNaN(note) && note >= 0 && note <= 100) {
    notes.push(note);
    input.value = "";
    afficherNotes();
    calculerMoyenne();
  } else {
    alert("Entrez une note valide entre 0 et 100.");
  }
}

function afficherNotes() {
  const liste = document.getElementById("listeNotes");
  liste.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = `Note ${index + 1} : ${note}`;
    liste.appendChild(li);
  });
}

function calculerMoyenne() {
  const somme = notes.reduce((acc, val) => acc + val, 0);
  const moyenne = notes.length ? (somme / notes.length).toFixed(2) : 0;
  document.getElementById("moyenne").textContent = `Moyenne : ${moyenne}`;
}

