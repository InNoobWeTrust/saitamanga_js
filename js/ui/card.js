const Card = ({ header, link = "#", thumbnail = "", details }) => {
  return `
  <div class="card" data-href="${link}">
    <img src="${thumbnail}"></img>
    <div class="container">
      <h2 class="header">${header}</div>
      <p class="details">${details}</div>
    </div>
  </div>`;
};

export default Card;
