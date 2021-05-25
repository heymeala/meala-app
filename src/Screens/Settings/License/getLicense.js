function extractNameFromGithub(url: string): string | null {
  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    const name = components[5];
    if (name !== 'undefined' && name !== 'unknown' && typeof name !== 'undefined') {
      console.log(components);
      return name;
    } else {
      return null;
    }
  }
  return null;
}

export const formatLicenses = jsonData =>
  Object.entries(jsonData).map(([_key, value]) => {
    const { licenses, ...license } = value;
    const formatLicenses = typeof licenses != 'undefined' ? licenses : '';
    const key = _key.charAt(0) === '@' ? _key.substring(1) : _key; // remove @
    const [name, version] = key.split('@');
    let username = license.repository
      ? extractNameFromGithub(license.licenseUrl)
      : extractNameFromGithub(license.repository) ?? '';

    let userUrl;
    let image;

    if (username && typeof username !== 'undefined') {
      username = username.charAt(0).toUpperCase() + username.slice(1);
      image = `http://github.com/${username}.png`;
      userUrl = `http://github.com/${username}`;
    } else {
      image = null;
      userUrl = null;
      username = '';
    }

    return {
      key,
      name,
      image,
      userUrl,
      username,
      licenses: formatLicenses,
      version,
      ...license,
    };
  });
