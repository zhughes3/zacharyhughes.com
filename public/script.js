function toPrettyPrintDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// force redirect to admin when you press escape
document.onkeydown = function(e) {
    if (e.keyCode == 27) {
        window.location = '/admin'
    }
}