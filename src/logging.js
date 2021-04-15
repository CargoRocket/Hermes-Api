import fs from 'fs';

// Setup Logger
export const writeAccess = (user, url) => {
  if (fs.existsSync('./logs/access.log')) {
    fs.appendFileSync('./logs/access.log', `[${Date.now()}][${user}] ${url}\n`, {}, () => {});
  } else {
    fs.writeFileSync('./logs/access.log', `[${Date.now()}][${user}] ${url}\n`, {}, () => {});
  } 
}

export const writeError = (user, status, url, message) => {
  if (fs.existsSync('./logs/error.log')) {
    fs.appendFileSync('./logs/error.log', `[${Date.now()}][${user}][${status}] ${url} ${message}\n`, {}, () => {});
  } else {
    fs.writeFileSync('./logs/error.log', `[${Date.now()}][${user}][${status}] ${url} ${message}\n`, {}, () => {});
  } 
}
