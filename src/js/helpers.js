import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${s} second`, {
          cause: 'TIMEOUT',
        })
      );
    }, s * 1000);
  });
};

export const sendJSON = async function(url,uploadData) {
  const res = await Promise.race([fetch(url,{
    method:'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body:JSON.stringify(uploadData),
  }), timeout(TIMEOUT_SEC)]);

  const data = await res.json();

  if (!res.ok)
    throw new Error(`${data.message} ${res.status}`, { cause: 'NOT_FOUND' });

  return data;
}

export const getJSON = async function (url) {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok)
    throw new Error(`${data.message} ${res.status}`, { cause: 'NOT_FOUND' });

  return data;
};
