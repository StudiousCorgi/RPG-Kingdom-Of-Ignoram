// Flint the Owl - Enhanced Guide with Math Support

let flintOpen = false;
function toggleFlint() {
  flintOpen = !flintOpen;
  document.getElementById("askFlintCard").style.display = flintOpen ? "block" : "none";
}

const flintResponseMemory = [];

const fuzzyKeywords = {
  level: ["level", "leveling up", "gain xp", "knowledge point"],
  gold: ["gold", "money", "coins", "currency"],
  spell: ["spell", "magic attack", "learn spell", "cast spell"],
  character: ["character", "stats", "character sheet", "gear"],
  adventure: ["adventure", "quest", "mission", "journey"],
  bestiary: ["bestiary", "creature", "monster", "enemy"],
  diceroller: ["dice", "roll", "chance", "random"],
  system: ["system", "rules", "core", "mechanics"],
  magic: ["magic", "power", "mana", "element"],
  puzzles: ["puzzle", "riddle", "challenge", "brain teaser"],
  knowledge: ["knowledge", "learn", "smart", "study"],
  lore: ["lore", "history", "past", "origin"],
  librarian: ["librarian", "libravore", "library monster"],
  prophecy: ["prophecy", "chosen one", "scrolls", "quill"]
};

const flintKnowledgeBase = {
  level: [
    "To level up, earn Knowledge Points by completing puzzles and battles!",
    "The more KP you earn, the closer you are to unlocking your next level."
  ],
  gold: [
    "Gold is earned by solving riddles, completing adventures, and defeating enemies!",
    "Some spells and gear cost gold, so spend wisely."
  ],
  spell: [
    "Spells can be learned at the Spellbook. Some unlock as you level up!",
    "Custom spells cost 500 gold and are a true mark of mastery."
  ],
  character: [
    "Your character sheet holds your stats, items, and progress. Update it often!",
    "Everything from your role to your spells lives on your character sheet."
  ],
  adventure: [
    "Adventure prompts guide you through quests to gain KP and gold!",
    "Check the Adventures tab when you’re ready for your next journey."
  ],
  bestiary: [
    "The Bestiary is your guide to all known creatures in Ignoram.",
    "Each entry holds tips and weaknesses—read before battle!"
  ],
  diceroller: [
    "Dice determine your fate—roll for skill checks, attacks, and events!",
    "Use the Dice Roller any time chance decides the outcome."
  ],
  system: [
    "The System Core holds the rules of the world, simplified for young adventurers.",
    "Understanding the system gives you power over every encounter."
  ],
  magic: [
    "Magic comes from learning—word, math, memory, and creative energy!",
    "Harnessing magic takes wit and imagination."
  ],
  puzzles: [
    "Puzzles challenge your logic and grant KP and gold upon solving.",
    "Try everything—from Quillscript decoding to riddle-solving."
  ],
  knowledge: [
    "Knowledge is your greatest weapon against King Ignoramous.",
    "The more you know, the more you grow."
  ],
  lore: [
    "Ignoram was once Lumenaria, a bright realm of scholars and song.",
    "The rise of King Ignoramous brought a great dimming, and now you must restore the light."
  ],
  librarian: [
    "The Libravore sleeps beneath the ruins of Academica. It guards forgotten books.",
    "It once protected stories, but now hungers for unwritten tales."
  ],
  prophecy: [
    "The Prophecy of the Quill speaks of two souls who awaken the Wand and Sword.",
    "When scrolls unroll in silence, and spring returns, they shall lead the way."
  ],
  math: [
    "Logic and numbers, my favorite feathers!",
    "Let me compute that with my mechanical beak...",
    "Mathematics: the true magic of the universe!"
  ],
  default: [
    "That's an interesting question! Try asking me about spells, puzzles, or the kingdom!",
    "I’m still learning too! Ask again with a keyword like 'magic', 'lore', or 'quests'."
  ]
};

function askFlint() {
  const input = document.getElementById("flintInput").value.toLowerCase();
  const responseBox = document.getElementById("flintResponse");
  const journal = document.getElementById("flintJournal");

  // First, check for a math expression
  if (typeof math !== "undefined" && input.match(/[0-9x+\-*/^=()]/) && !input.includes("?")) {
    try {
      const result = math.evaluate(input);
      const mathReply = flintKnowledgeBase["math"][Math.floor(Math.random() * flintKnowledgeBase["math"].length)];
      const fullResponse = `${mathReply} 🧮 The answer is: ${result}`;
      respondAsFlint(input, fullResponse);
      return;
    } catch (e) {
      const errorResponse = "Hmm... that doesn't look like a valid math problem.";
      respondAsFlint(input, errorResponse);
      return;
    }
  }

  // Fuzzy keyword category matching
  let category = "default";
  for (const key in fuzzyKeywords) {
    if (fuzzyKeywords[key].some(kw => input.includes(kw))) {
      category = key;
      break;
    }
  }

  const messages = flintKnowledgeBase[category];
  const reply = messages[Math.floor(Math.random() * messages.length)];
  respondAsFlint(input, reply);
}

function respondAsFlint(input, reply) {
  const responseBox = document.getElementById("flintResponse");
  const journal = document.getElementById("flintJournal");

  responseBox.innerHTML = `<span class='emoji'>🗨️</span> <em>Thinking...</em>`;
  setTimeout(() => {
    responseBox.innerHTML = `<span class='emoji'>💡</span> ${reply}`;
    const entry = document.createElement("li");
    entry.textContent = `Q: ${input} → A: ${reply}`;
    journal.prepend(entry);
    flintResponseMemory.push({ input, reply });
  }, 1000);
}

function flintSayAnimated(text) {
  const box = document.getElementById("flintMessage");
  box.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    box.textContent += text.charAt(i);
    i++;
    if (i > text.length) clearInterval(interval);
  }, 40);
}

window.addEventListener("load", () => {
  const msgBox = document.getElementById("flintMessage");
  if (msgBox) {
    flintSayAnimated("Welcome, brave learner! Ask me anything about this world.");
  }
});
