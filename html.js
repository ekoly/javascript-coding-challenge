// @ts-check

export function html(tmplArr, ...args) {
  const d = tmplArr.map((n, i) => args[i] == null ? n : `${n}${args[i]}`).join('');
  return `<!doctype html>${d}`;
}

export default html;