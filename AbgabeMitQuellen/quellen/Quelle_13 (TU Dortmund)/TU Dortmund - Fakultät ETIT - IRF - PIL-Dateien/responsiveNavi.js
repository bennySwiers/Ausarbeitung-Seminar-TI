// a.js
/*
  JS fuer Responsive Design zum Ein/Ausblenden von Navigationen und Uebersichten
  2014-11-17 SHueser In Bereichsnavi "-" ersetzt durch "&ndash;"
*/

//Pruefen, ob JS aktiviert. Nur dann kann das Ausklappen der Navigationen genutzt werden
window.onload = function() {
  document.getElementsByTagName('body')[0].className = 'jsEnabled';
};

// Aus-und Einblenden von Element
// genutzt zum Ein- und Ausblenden der Haupt- und der Brotkrumennavigation
function toggle(id) {
  // Hauptnavigation holen
  var e = document.getElementById(id);
  // brotkrumenNavi holen
  var brot = document.getElementById('brotkrumenNavi');
  if (e.style.display == '') {
    e.style.display = 'block';
    brot.style.display = 'none';
  } else {
    e.style.display = '';
    brot.style.display = 'block';
  }
}

function toggleSideNavigation() {

  // ul holen, die die Bereichsnavigation enthaelt
  var e = document.querySelector('#bereichsnavi ul li.toplevel ul');
  // span mit dem obersten Eintrag in der Bereichsnavi (gleich Hauptnavi)
  var plusminus = document.querySelector('#notclickable span');
  
  if(e.style.display == '') {
    e.style.display = 'inline';
    plusminus.innerHTML = '&ndash;';
  } else {
    e.style.display = '';
    plusminus.innerHTML = '+';
  }          
}

// Aus-und Einblenden von Elementen in Ueberischten
// Ueberschrift h3 oder anderer item-title wird angeklickt
function itemUebersichtZeigen(itemTitle) {
  // der folgende div ist der uebersichtsblock
  var uebersicht = get_nextSibling(itemTitle);
  // span in h3, letztes Kindelement ist der Button
  var button = get_button(itemTitle);
  if (uebersicht.style.display == '') {
    itemTitle.className = 'item-titel-weniger';
    uebersicht.style.display = 'block';
  } else {
    itemTitle.className = 'item-titel-mehr';
    uebersicht.style.display = '';
  }
}

// Firefox, and most other browsers, will treat empty white-spaces or new lines as text nodes, Internet Explorer will not. So, in the example below, we have a function that checks the node type of the next sibling node.
function get_nextSibling(e) {
  var x=e.nextSibling;
  while (x.nodeType!=1) {
    x=x.nextSibling;
  }
  return x;
}
function get_previousSibling(e) {
  var x=e.previousSibling;
  while (x.nodeType!=1) {
    x=x.previousSibling;
  }
  return x;
}
// Button ist das letzte Kindelement
function get_button(e) {
  var x=e.lastChild;
  while (x.nodeType!=1) {
    x=get_previousSibling(x);
  }
  return x;
}
