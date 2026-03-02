document.addEventListener("DOMContentLoaded", () => {
  const osszeadasElem = document.getElementById("osszeadas");
  const kivonasElem = document.getElementById("kivonas");
  const szorzasElem = document.getElementById("szorzas");
  const osztasElem = document.getElementById("osztas");
  const pontElem = document.getElementById(".");
  const egyenloElem = document.getElementById("egyenlo");
  const torlesElem = document.getElementById("torles");

  let szamokElem = document.querySelector(".szamok");
  const szamok = szamGombokLetrehoz();
  szamokElem.innerHTML = szamok.join("");

  let szamElem = document.querySelectorAll(".szamok button");
  let szoveg = "";
  let kifejezesElem = document.querySelector(".kifejezes");
  let eredmenyElem = document.querySelector(".eredmeny");

  eventAddGombokra(szamok);
  osszeadasElem.addEventListener("click", mezobeIr);
  kivonasElem.addEventListener("click", mezobeIr);
  szorzasElem.addEventListener("click", mezobeIr);
  osztasElem.addEventListener("click", mezobeIr);
  pontElem.addEventListener("click", mezobeIr);
  torlesElem.addEventListener("click", torles);
  egyenloElem.addEventListener("click", kiertekel);

  function szamGombokLetrehoz() {
    const szamok = [];
    for (let i = 1; i <= 9; i++) {
      szamok.push(`<button class="szam">${i}</button>`);
    }
    szamok.push(`<button class="szam">0</button>`);
    return szamok;
  }

  function eventAddGombokra(szamok) {
    for (let i = 0; i < szamok.length; i++)
      szamElem[i].addEventListener("click", mezobeIr);
  }

  function mezobeIr() {
    if (eredmenyElem.innerHTML !== "") {
      szoveg = eredmenyElem.innerHTML;
      eredmenyElem.innerHTML = "";
    }

    const ujKarakter = this.textContent;
    const muveletek = ["+", "-", "*", "/"];
    const utolsoKarakter = szoveg.slice(-1);
    const darabok = szoveg.split(/[\+\-\*\/]/);
    const utolsoSzam = darabok[darabok.length - 1];

    if (ujKarakter === "." && utolsoSzam.includes(".")) {
      return;
    }

    if (utolsoSzam === "0" && !isNaN(ujKarakter) && ujKarakter !== "0") {
      szoveg = szoveg.slice(0, -1) + ujKarakter;
    } else if (
      [...muveletek, "."].includes(utolsoKarakter) &&
      [...muveletek, "."].includes(ujKarakter)
    ) {
      szoveg = szoveg.slice(0, -1) + ujKarakter;
    } else {
      szoveg += ujKarakter;
    }

    kifejezesElem.innerHTML = szoveg;
  }

  function torles() {
    szoveg = "";
    kifejezesElem.innerHTML = "";
    eredmenyElem.innerHTML = "";
  }

  function kiertekel() {
    let string = kifejezesElem.innerHTML;
    if (string === "") return;

    const utolsoKarakter = string.slice(-1);

    if (["+", "-", "."].includes(utolsoKarakter)) {
      string += "0";
    } else if (["*", "/"].includes(utolsoKarakter)) {
      string += "1";
    }

    try {
      let szamol = eval(string);
      eredmenyElem.innerHTML = szamol;
      szoveg = "";
      kifejezesElem.innerHTML = "";
    } catch (e) {
      eredmenyElem.innerHTML = "Hiba: " + e.message;
    }
  }
});
