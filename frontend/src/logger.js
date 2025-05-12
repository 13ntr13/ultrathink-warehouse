// logger.js
// Логгер для фронтенда: сохраняет ошибки в файл logs/errors.log (если возможно)
// В браузере пишем в localStorage и выводим в консоль, на сервере — в файл

export function logError(error) {
  const msg = `[${new Date().toISOString()}] ${error instanceof Error ? error.stack : error}`
  // В браузере — пишем в localStorage и консоль
  if (typeof window !== 'undefined') {
    let logs = []
    try {
      logs = JSON.parse(localStorage.getItem('app-logs') || '[]')
    } catch {}
    logs.push(msg)
    localStorage.setItem('app-logs', JSON.stringify(logs))
    // Также выводим в консоль
    // eslint-disable-next-line no-console
    console.error(msg)
  } else {
    // На сервере (Node.js) — пишем в файл logs/errors.log
    const fs = require('fs')
    const path = require('path')
    const logDir = path.join(__dirname, 'logs')
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)
    fs.appendFileSync(path.join(logDir, 'errors.log'), msg + '\n')
  }
}

// Глобальный перехват ошибок
if (typeof window !== 'undefined') {
  window.addEventListener('error', e => logError(e.error || e.message))
  window.addEventListener('unhandledrejection', e => logError(e.reason))
} 