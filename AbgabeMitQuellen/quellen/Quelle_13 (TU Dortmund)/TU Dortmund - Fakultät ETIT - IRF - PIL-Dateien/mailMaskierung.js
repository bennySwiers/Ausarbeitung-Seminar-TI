// JavaScript Document (UL 03/2004)
// Skript stelle Funktionen zur Verfuegung, um eMails zu maskieren

function em_maskieren (ename, dname, etext, esubject, ebody) {
  var apre = "<a href='mailto:";
  var asubject = "?subject=";
  var abody = "&body=";
  var apost = "' class=\"email_link\">";
  var aend = "</a>";
  var at = "@";
  var leer = "<a>";

  if ((dname == "") ||(ename == "")) {
    document.write(leer);
		document.write(leer + aend);
  }
  else if ((etext == "") || (etext == null)) {
    document.write(apre + ename + at + dname + apost);
		document.write(ename + " AT " + dname + aend);
  }
  else if ((esubject == "") || (esubject == null)) {
    document.write(apre + ename + at + dname + apost);
		document.write(etext + aend);
  }
  else if ((ebody == "") || (ebody == null)) {
    document.write(apre + ename + at + dname + asubject + esubject + apost);
		document.write(etext + aend);
  }
  else {
    document.write(apre + ename + at + dname + asubject + esubject + abody + ebody + apost);
		document.write(etext + aend);
  }
}
