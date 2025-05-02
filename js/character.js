// === Character Logic for Kingdom of Ignoram === //

let player = {
    name: "",
    role: "",
    level: 1,
    hp: 100,
    attack: 10,
    kp: 0,
    kpToLevel: 20,
    gold: 20,
    knownSpells: []
  };
  
  const classProfiles = {
    "Word Wielder": { hp: 100, attack: 8, kpToLevel: 20 },
    "Math Mage": { hp: 80, attack: 12, kpToLevel: 20 },
    "Tinker Thinker": { hp: 90, attack: 9, kpToLevel: 20 },
    "Artisan of Art": { hp: 85, attack: 10, kpToLevel: 20 },
    "Memory Monk": { hp: 95, attack: 7, kpToLevel: 20 }
  };
  
  // Populate class options dynamically
  window.onload = function () {
    const roleSelect = document.getElementById("role");
    Object.keys(classProfiles).forEach(role => {
      const option = document.createElement("option");
      option.value = role;
      option.textContent = role;
      roleSelect.appendChild(option);
    });
  
    roleSelect.addEventListener("change", function () {
      const stats = classProfiles[this.value];
      if (stats) {
        player.role = this.value;
        player.hp = stats.hp;
        player.attack = stats.attack;
        player.kpToLevel = stats.kpToLevel;
        updateKPBar();
      }
    });
  
    updateKPBar();
  };
  
  function gainKP(amount) {
    player.kp += amount;
    updateKPBar();
    checkLevelUp();
  }
  
  function updateKPBar() {
    const kpBar = document.getElementById("kpBar");
    const percent = Math.min((player.kp / player.kpToLevel) * 100, 100);
    kpBar.style.width = percent + "%";
    document.getElementById("kpValue").textContent = player.kp;
    document.getElementById("kpMax").textContent = player.kpToLevel;
  }
  
  function checkLevelUp() {
    if (player.kp >= player.kpToLevel) {
      player.level++;
      player.kp = 0;
      player.kpToLevel += 10;
      player.hp += 10;
      player.attack += 2;
  
      document.getElementById("newLevel").textContent = player.level;
      const modal = new bootstrap.Modal(document.getElementById("levelUpModal"));
      modal.show();
  
      updateKPBar();
    }
  }
  
  function saveCharacter() {
    const character = {
      name: document.getElementById("charName").value,
      role: document.getElementById("role").value,
      skill: document.getElementById("skill").value,
      magicItem: document.getElementById("magicItem").value,
      gear: document.getElementById("gear").value,
      knownSpells: player.knownSpells,
      notes: document.getElementById("notes").value,
      level: player.level,
      hp: player.hp,
      attack: player.attack,
      kp: player.kp,
      kpToLevel: player.kpToLevel,
      gold: player.gold
    };
  
    localStorage.setItem("characterData", JSON.stringify(character));
    alert("Character saved!");
  }
  
  function loadCharacter() {
    const data = JSON.parse(localStorage.getItem("characterData"));
    if (data) {
      document.getElementById("charName").value = data.name;
      document.getElementById("role").value = data.role;
      document.getElementById("skill").value = data.skill;
      document.getElementById("magicItem").value = data.magicItem;
      document.getElementById("gear").value = data.gear;
      document.getElementById("notes").value = data.notes;
  
      player.level = data.level;
      player.hp = data.hp;
      player.attack = data.attack;
      player.kp = data.kp;
      player.kpToLevel = data.kpToLevel;
      player.gold = data.gold;
      player.knownSpells = data.knownSpells || [];
  
      document.getElementById("knownSpells").value = player.knownSpells.join(", ");
  
      updateKPBar();
      alert("Character loaded!");
    } else {
      alert("No saved character found.");
    }
  }
  
  // Optional function to simulate gaining KP during play
  document.addEventListener("keydown", e => {
    if (e.key === "k") gainKP(5); // Press 'k' to simulate earning 5 KP
  });
  