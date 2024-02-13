import { useState } from 'react';
import './App.css';

const generatePassword = (length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) => {
  let allChars = '';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '1234567890';
  const specialChars = '~!@#$%^&*()_+-`{}[]';

  if (includeUppercase) allChars += uppercase;
  if (includeLowercase) allChars += lowercase;
  if (includeNumbers) allChars += numbers;
  if (includeSymbols) allChars += specialChars;

  if (!allChars) {
    console.error('No character set selected for password generation.');
    return '';
  }

  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
};

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const password = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    setGeneratedPassword(password);
  };
  const handleCopyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = generatedPassword;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('Password copied to clipboard!');
  };

  return (
    <div className="app-container">
      <h1>Password Generator</h1>

      <div className="options-container">
        <label>Password Length:</label>
        <input
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Math.max(1, parseInt(e.target.value, 10)))}
        />

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Include Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Include Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Include Symbols
          </label>
        </div>
      </div>

      <button onClick={handleGeneratePassword}>Generate Password</button>

      {generatedPassword && (
        <div className="result-container">
          <label>Generated Password:</label>
          <input type="text" value={generatedPassword} readOnly />
          <button onClick={handleCopyToClipboard}>Copy Password</button>
        </div>
      )}
    </div>
  );
}

export default App;
