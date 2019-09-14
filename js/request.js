export default (method, url, onDone) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      onDone(xhttp.responseText);
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
};
