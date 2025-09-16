const LEVEL = process.env.LOG_LEVEL || 'info';

function info(msg, meta) { console.log(`[INFO] ${msg}`, meta || ''); }
function error(msg, meta) { console.error(`[ERROR] ${msg}`, meta || ''); }
function debug(msg, meta) { if (LEVEL === 'debug') console.log(`[DEBUG] ${msg}`, meta || ''); }

export default { info, error, debug };
