const request = (method, url, onDone) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      // document.getElementById("demo").innerHTML = xhttp.responseText;
      onDone(xhttp.responseText);
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
};
