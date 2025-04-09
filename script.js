// These functions are ready to connect to your backend via API later (assisted by InstructorSir)

function getCharacterData() {
    return {
      charName: document.getElementById("charName").value,
      role: document.getElementById("role").value,
      skill: document.getElementById("skill").value,
      magicItem: document.getElementById("magicItem").value,
      kp: document.getElementById("kp").value,
      gear: document.getElementById("gear").value,
      knownSpells: document.getElementById("knownSpells").value,
      notes: document.getElementById("notes").value
    };
  }

  function setCharacterData(data) {
    document.getElementById("charName").value = data.charName || "";
    document.getElementById("role").value = data.role || "";
    document.getElementById("skill").value = data.skill || "";
    document.getElementById("magicItem").value = data.magicItem || "";
    document.getElementById("kp").value = data.kp || 0;
    document.getElementById("gear").value = data.gear || "";
    document.getElementById("knownSpells").value = data.knownSpells || "";
    document.getElementById("notes").value = data.notes || "";
  }

  function saveCharacter() {
    const character = getCharacterData();
    localStorage.setItem("koicharacter", JSON.stringify(character));
    alert("Character saved!");
  }

  function loadCharacter() {
    const data = JSON.parse(localStorage.getItem("koicharacter"));
    if (data) {
      setCharacterData(data);
      alert("Character loaded!");
    } else {
      alert("No saved character found.");
    }
  }