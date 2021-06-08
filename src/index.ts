export default (input: string): string =>
  input
    .replace(/(-----BEGIN[ \S]+?-----)(\S)/, "\n$1\n$2")
    .replace(/(\S)(-----END[ \S]+?-----)/, "$1\n$2\n");
