var notes = [];

var baseNoteInput = document.getElementById("baseNote");
var noteInput = document.getElementById("noteInput");
var addBtn = document.getElementById("addBtn");
var resetBtn = document.getElementById("resetBtn");
var themeBtn = document.getElementById("themeBtn");
var listeNotes = document.getElementById("listeNotes");
var moyenneElement = document.getElementById("moyenne");
var mentionElement = document.getElementById("mention");

function afficherNotes() {
  listeNotes.innerHTML = "";
  for (var i = 0; i < notes.length; i++) {
    var li = document.createElement("li");
    li.textContent = "Note " + (i + 1) + ": " + notes[i].toFixed(2) + "%";
    var spanSuppr = document.createElement("span");
    spanSuppr.textContent = "✖";
    (function(index) {
      spanSuppr.addEventListener("click", function() {
        supprimerNote(index);
      });
    })(i);
    li.appendChild(spanSuppr);
    listeNotes.appendChild(li);
  }
}

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
  var moyenne = somme / notes.length;
  moyenneElement.textContent = "Moyenne : " + moyenne.toFixed(2) + "%";

  var mention = "";
  if (moyenne >= 90) mention = "Excellent 💯";
  else if (moyenne >= 75) mention = "Très bien ✅";
  else if (moyenne >= 60) mention = "Bien 👍";
  else if (moyenne >= 50) mention = "Passable 😐";
  else mention = "Insuffisant ❌";

  mentionElement.textContent = mention;
}

function ajouterNote() {
  var base = parseFloat(baseNoteInput.value);
  var noteRaw = parseFloat(noteInput.value);
  if (isNaN(base) || base <= 0) {
    alert("La base doit être un nombre strictement positif");
    return;
  }
  if (isNaN(noteRaw) || noteRaw < 0 || noteRaw > base) {
    alert("Note invalide, doit être entre 0 et " + base);
    return;
  }
  var note = (noteRaw / base) * 100;
  notes.push(note);
  noteInput.value = "";
  afficherNotes();
  calculerMoyenne();
}

function supprimerNote(index) {
  notes.splice(index, 1);
  afficherNotes();
  calculerMoyenne();
}

function resetNotes() {
  if (confirm("Voulez-vous vraiment tout réinitialiser ?")) {
    notes = [];
    afficherNotes();
    calculerMoyenne();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "Mode Clair";
  } else {
    themeBtn.textContent = "Mode Sombre";
  }
}

addBtn.addEventListener("click", ajouterNote);
resetBtn.addEventListener("click", resetNotes);
themeBtn.addEventListener("click", toggleTheme);
