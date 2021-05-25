function extractNameFromGithub(url: string): string | null {
  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}

export const formatLicenses = jsonData =>
  Object.entries(jsonData).map(([_key, value]) => {
    const { licenses, ...license } = value;

    const key = _key.charAt(0) === '@' ? _key.substring(1) : _key; // remove @
    const [name, version] = key.split('@');

    let username =
      (license.repository == null
        ? extractNameFromGithub(license.licenseUrl)
        : extractNameFromGithub(license.repository)) ?? '';

    let userUrl;
    let image;

    if (username) {
      username = username.charAt(0).toUpperCase() + username.slice(1);
      image = `http://github.com/${username}.png`;
      userUrl = `http://github.com/${username}`;
    }

    return {
      key,
      name,
      image,
      userUrl,
      username,
      licenses,
      version,
      ...license,
    };
  });
