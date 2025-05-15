export const isValidDomain = (domain: string) => {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

export const truncateName = (hostNames: string[]) => {
  if (hostNames.length === 0) return 'N/A';

  const fullText = hostNames.join(', ');
  return fullText.length > 25 ? `${fullText.slice(0, 25)}...` : fullText;
};
