function toPrettyPrintDate(date) {
  let prettyDate = '';
  if (!(date instanceof Date)) {
    prettyDate = new Date(date);
  }
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  return `${months[prettyDate.getMonth()]} ${prettyDate.getDate()}, ${prettyDate.getFullYear()}`;
}

function goToAdmin(e) {
  if (e.keyCode === 27) {
    window.location = '/admin';
  }
}

document.onkeydown = goToAdmin;
