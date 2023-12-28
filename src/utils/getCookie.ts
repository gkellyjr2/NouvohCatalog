function getCookieReact(key: string): string {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((cookie) => cookie.includes(key));
  if (cookie) {
    const cookieValue = cookie.split('=')[1];
    return cookieValue;
  }
  return '';
}

function getCookieJS(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

export { getCookieReact, getCookieJS };