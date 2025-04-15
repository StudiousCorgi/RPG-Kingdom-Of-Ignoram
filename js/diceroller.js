/* This script handles the dice rolling functionality for the Dice Roller application */
/* Assisted by InstructorSir */
window.addEventListener('DOMContentLoaded', function () {
  const diceSound = document.getElementById('dice-sound');
  const form = document.getElementById('diceForm');
  const resultsDiv = document.getElementById('results');
  const logList = document.getElementById('logList');

  // Load saved log
  const savedLog = JSON.parse(localStorage.getItem('diceRollLog')) || [];
  savedLog.forEach(entry => appendToLog(entry));

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const reason = document.getElementById('rollReason').value.trim() || 'No reason given';
    const skillName = document.getElementById('skillName').value.trim();
    const skillBonus = parseInt(document.getElementById('skillBonus').value) || 0;

    const diceTypes = [4, 6, 10, 12, 20];
    resultsDiv.innerHTML = '';
    let grandTotal = 0;
    const rollsSummary = [];

    if (!diceSound.paused) {
      diceSound.pause();
      diceSound.currentTime = 0;
    }
    diceSound.play();

    diceTypes.forEach(sides => {
      const count = parseInt(document.getElementById(`d${sides}`).value);
      if (count > 0) {
        const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
        const subtotal = rolls.reduce((a, b) => a + b, 0);
        grandTotal += subtotal;
        rollsSummary.push(`D${sides}: [${rolls.join(', ')}] = ${subtotal}`);

        const resultBlock = document.createElement('div');
        resultBlock.classList.add('dice-result');
        resultBlock.innerHTML = `
          <h5>D${sides} Rolls:</h5>
          <p>Rolls: [${rolls.join(', ')}]</p>
          <p><strong>Subtotal:</strong> ${subtotal}</p>
        `;
        resultsDiv.appendChild(resultBlock);
      }
    });

    // Add skill bonus to grand total
    grandTotal += skillBonus;

    const totalBlock = document.createElement('div');
    totalBlock.classList.add('dice-result', 'bg-success', 'text-white');
    totalBlock.innerHTML = `
      <h4 class="text-center">🎯 Grand Total: ${grandTotal}</h4>
      ${skillName ? `<p class="text-center"><strong>Skill Used:</strong> ${skillName} (+${skillBonus})</p>` : ''}
    `;
    resultsDiv.appendChild(totalBlock);

    // Log entry
    const logEntry = {
      timestamp: new Date().toLocaleString(),
      reason: reason,
      skillName: skillName,
      skillBonus: skillBonus,
      summary: rollsSummary,
      total: grandTotal
    };
    savedLog.push(logEntry);
    localStorage.setItem('diceRollLog', JSON.stringify(savedLog));
    appendToLog(logEntry);
  });

  function appendToLog(entry) {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
      <strong>${entry.timestamp}</strong><br>
      <em>${entry.reason}</em><br>
      ${entry.skillName ? `<strong>Skill:</strong> ${entry.skillName} (+${entry.skillBonus})<br>` : ''}
      ${entry.summary.join('<br>')}
      <br><strong>Total:</strong> ${entry.total}
    `;
    logList.prepend(li);
  }
});
