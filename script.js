// Initialisation des notes
var notes = JSON.parse(localStorage.getItem("notes")) || [];

// Récupération des éléments
var listeNotes = document.getElementById("listeNotes");
var moyenneElement = document.getElementById("moyenne");
var mentionElement = document.getElementById("mention");
var addBtn = document.getElementById("addBtn");
var resetBtn = document.getElementById("resetBtn");
var themeBtn = document.getElementById("themeBtn");
var baseNoteInput = document.getElementById("baseNote");
var noteInput = document.getElementById("noteInput");

var ctx = document.getElementById("graphique").getContext("2d");

// Création du graphique Chart.js
var chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ["#3498db", "#9b59b6", "#2ecc71", "#f1c40f", "#e67e22"],
      hoverOffset: 30,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "bottom" }
    }
  }
});

// Affiche les notes dans la liste
function afficherNotes() {
  listeNotes.innerHTML = "";
  for (var i = 0; i < notes.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = "Note " + (i + 1) + " : " + notes[i].toFixed(2) + "% <span onclick='supprimerNote(" + i + ")' title='Supprimer cette note'>🗑️</span>";
    listeNotes.appendChild(li);
  }
}

// Supprime une note par son index
function supprimerNote(index) {
  notes.splice(index, 1);
  sauvegarder();
  afficherNotes();
  calculerMoyenne();
  updateChart();
}

// Ajoute une note après conversion en %
function ajouterNote() {
  var noteRaw = parseFloat(noteInput.value);
  var base = parseFloat(baseNoteInput.value);

  if (isNaN(base) || base <= 0) {
    alert("La base de la note doit être un nombre strictement positif.");
    return;
  }

  if (!isNaN(noteRaw) && noteRaw >= 0 && noteRaw <= base) {
    var note = (noteRaw / base) * 100;
    notes.push(note);
    noteInput.value = "";
    sauvegarder();
    afficherNotes();
    calculerMoyenne();
    updateChart();
  } else {
    alert("Entrez une note valide entre 0 et " + base + ".");
  }
}

// Réinitialise toutes les notes
function reinitialiserNotes() {
  if (confirm("Voulez-vous vraiment tout réinitialiser ?")) {
    notes = [];
    localStorage.removeItem("notes");
    afficherNotes();
    calculerMoyenne();
    updateChart();
  }
}

// Calcule et affiche la moyenne et la mention
function calculerMoyenne() {
  if (notes.length === 0) {
    moyenneElement.textContent = "Moyenne : 0%";
    mentionElement.textContent = "";
    return;
  }

  var somme = 0;
  for (var i = 0; i < notes.length; i++) {
    somme += notes[i];
  }
  var moyenne = (somme / notes.length).toFixed(2);
  moyenneElement.textContent = "Moyenne : " + moyenne + "%";

  var mention = "";
  if (moyenne >= 90) mention = "Excellent 💯";
  else if (moyenne >= 75) mention = "Très bien ✅";
  else if (moyenne >= 60) mention = "Bien 👍";
  else if (moyenne >= 50) mention = "Passable 😐";
  else mention = "Insuffisant ❌";

  mentionElement.textContent = mention;
}

// Sauvegarde les notes dans localStorage
function sauvegarder() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Met à jour le graphique
function updateChart() {
  var labels = [];
  for (var i = 0; i < notes.length; i++) {
    labels.push("Note " + (i + 1));
  }
  chart.data.labels = labels;
  chart.data.datasets[0].data = notes;
  chart.update();
}

// Bascule le thème sombre/clair
function toggleTheme() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    themeBtn.textContent = "Mode Sombre";
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    themeBtn.textContent = "Mode Clair";
    localStorage.setItem("theme", "dark");
  }
}

// Événements
addBtn.addEventListener("click", ajouterNote);
resetBtn.addEventListener("click", reinitialiserNotes);
themeBtn.addEventListener("click", toggleTheme);

// Au chargement de la page
document.addEventListener("DOMContentLoaded", function() {
  afficherNotes();
  calculerMoyenne();
  updateChart();

  // Charger le thème sauvegardé
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "Mode Clair";
  }
});
