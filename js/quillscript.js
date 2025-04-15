// This script handles the encoding and decoding of messages using a custom codex.
    const codex = {
      A: '✧', B: '⧫', C: '☽', D: '⚑', E: '❂', F: '✦', G: '⌖', H: '♒', I: '◉',
      J: '⚚', K: '⚙', L: '♖', M: '☀', N: '❈', O: '✪', P: '⚔', Q: '♁', R: '☘',
      S: '✿', T: '⏃', U: '⚵', V: '⚶', W: '⚘', X: '⚒', Y: '☊', Z: '☍'
    };

    const reverseCodex = Object.fromEntries(Object.entries(codex).map(([k, v]) => [v, k]));

    function encodeMessage() {
      const input = document.getElementById('plainText').value.toUpperCase();
      const encoded = input.split('').map(char => codex[char] || char).join('');
      document.getElementById('encodedText').innerText = encoded;
    }

    function decodeMessage() {
      const input = document.getElementById('quillText').value;
      const decoded = input.split('').map(char => reverseCodex[char] || char).join('');
      document.getElementById('decodedText').innerText = decoded;
    }
