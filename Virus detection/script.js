function scanFile() {
  const fileInput = document.getElementById('fileInput');
  const resultBox = document.getElementById('result');

  if (!fileInput.files.length) {
    resultBox.style.display = 'block';
    resultBox.className = 'result warning';
    resultBox.innerHTML = 'Please upload a file before starting the security scan.';
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

  const riskyExtensions = ['.exe', '.bat', '.cmd', '.vbs', '.scr', '.js', '.msi'];
  const suspiciousKeywords = ['virus', 'trojan', 'hack', 'malware', 'crack', 'keygen'];

  let isDangerous = false;
  let reason = '';

  for (let ext of riskyExtensions) {
    if (fileName.endsWith(ext)) {
      isDangerous = true;
      reason = 'Executable or script-based extension detected.';
      break;
    }
  }

  if (!isDangerous) {
    for (let word of suspiciousKeywords) {
      if (fileName.includes(word)) {
        isDangerous = true;
        reason = 'Suspicious keyword detected in file name.';
        break;
      }
    }
  }

  resultBox.style.display = 'block';

  if (isDangerous) {
    resultBox.className = 'result danger';
    resultBox.innerHTML = `
      <strong>⚠ Threat Alert: Potentially Unsafe File</strong><br><br>
      <strong>File Name:</strong> ${file.name}<br>
      <strong>File Size:</strong> ${fileSizeMB} MB<br>
      <strong>Detection Reason:</strong> ${reason}<br><br>
      Security Advice: Avoid opening this file unless it is verified from a trusted and secure source.
    `;
  } else {
    resultBox.className = 'result safe';
    resultBox.innerHTML = `
      <strong>✅ Scan Complete: File Appears Safe</strong><br><br>
      <strong>File Name:</strong> ${file.name}<br>
      <strong>File Size:</strong> ${fileSizeMB} MB<br><br>
      No suspicious patterns were identified during this demo security scan.
    `;
  }
}