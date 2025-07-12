body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
  transition: 0.3s ease;
}

body.dark {
  background-color: #1e1e1e;
  color: #eee;
}

.container {
  max-width: 500px;
  margin: auto;
  padding: 30px;
  text-align: center;
}

input, button {
  padding: 10px;
  font-size: 16px;
  margin: 10px 5px;
}

button.reset {
  background-color: #e74c3c;
  color: white;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

li span {
  cursor: pointer;
  color: red;
  margin-left: 10px;
}

#graphique {
  margin-top: 30px;
}

@media screen and (max-width: 600px) {
  .container {
    padding: 20px;
  }

  input, button {
    width: 90%;
    margin: 5px auto;
  }
}


