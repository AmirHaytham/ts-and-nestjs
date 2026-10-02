// Calls every route once and prints what came back.
// Start the API first (npm run start:dev), then: npm run demo

const base = process.env.API_URL ?? 'http://localhost:3000';

async function call(method, path, body) {
  const res = await fetch(base + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = text;
  try {
    data = JSON.parse(text);
  } catch {}
  const short =
    typeof data === 'string'
      ? data
      : JSON.stringify(data, (key, value) =>
          ['createdAt', 'updatedAt', '__v'].includes(key) ? undefined : value,
        );
  console.log(`${method.padEnd(6)} ${path.padEnd(62)} ${res.status}`);
  console.log(`       ${short}\n`);
  return data;
}

const stamp = Date.now().toString().slice(-5);
const missing = '64b000000000000000000000';

try {
  await call('GET', '/');

  const course = await call('POST', '/courses', { title: 'Software Project I', code: `sp${stamp}`, credits: 8 });
  const student = await call('POST', '/student', { name: 'Hassan', email: `Hassan.${stamp}@GIU-uni.de`, age: 20 });

  await call('POST', '/student', { name: 'Someone else', email: `hassan.${stamp}@giu-uni.de` });
  await call('POST', '/student', { age: 12 });

  await call('POST', `/student/${student._id}/courses/${course._id}`);
  await call('GET', `/student/${student._id}`);
  await call('PATCH', `/student/${student._id}`, { age: 21 });

  await call('GET', '/student/abc');
  await call('GET', `/student/${missing}`);
  await call('POST', `/student/${student._id}/courses/${missing}`);

  await call('DELETE', `/student/${student._id}`);
  await call('DELETE', `/courses/${course._id}`);
} catch (error) {
  console.log(`Could not reach ${base}. Is the API running? (${error.cause?.code ?? error.message})`);
}
