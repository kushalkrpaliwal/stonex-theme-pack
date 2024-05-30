type Value = string | number | boolean | Record<string, unknown>;

type Token = {
  type: string;
  value: Value;
  path: string[];
  name: string;
};

type Tokens = Token[];

export type NestedValue = string | Record<string, unknown>;

export type NestedObject = {
  [key: string]: NestedValue;
};

function filterTokensByType(type: string, tokens: Tokens): NestedObject {
  if (!tokens?.length) {
    return {};
  }

  const obj = tokens.reduce((acc: NestedObject, cur: Token) => {
    if (cur.type === type) {
      if (typeof cur.value === 'object' && cur.value !== null && cur.path.length === 1) {
        for (const key in cur.value as Record<string, unknown>) {
          acc[`${cur.path[0]}-${key}`] = `var(--${cur.name}-${key}, ${(cur.value as Record<string, unknown>)[key]})`;
        }
      } else {
        acc[cur.path.join('.')] = `var(--${cur.name}, ${cur.value})`;
      }
    }
    return acc;
  }, {});

  return transformFlatObjectToNested(obj);
}

function transformFlatObjectToNested(flatObject: NestedObject): NestedObject {
  const nestedObject: NestedObject = {};

  for (const key in flatObject) {
    const keyParts = key.split('.');
    const category = keyParts.shift();

    if (category) {
      const finalKey = keyParts.join('-');

      if (!nestedObject[category]) {
        nestedObject[category] = {};
      }

      if (typeof nestedObject[category] === 'object' && nestedObject[category] !== null) {
        (nestedObject[category] as Record<string, unknown>)[finalKey] = flatObject[key];
      }
    }
  }

  return nestedObject;
}
export { filterTokensByType };
