export default (method, url, onDone) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      onDone(xhttp.responseText);
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
};
