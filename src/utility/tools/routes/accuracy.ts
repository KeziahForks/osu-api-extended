export const description: any = {
  auth: 4,
  title: __filename,
  method: 'GET',
  description: 'Return accuracy from hits object',
  params: [
    {
      type: 'string',
      name: '300',
      optional: false,
      description: 'Amount of 300',
    },
    {
      type: 'string',
      name: 'geki',
      optional: false,
      description: 'Amount of geki (300g)',
    },
    {
      type: 'string',
      name: '100',
      optional: false,
      description: 'Amount of 100',
    },
    {
      type: 'string',
      name: 'katu',
      optional: false,
      description: 'Amount of katu (100k)',
    },
    {
      type: 'string',
      name: '50',
      optional: false,
      description: 'Amount of 50',
    },
    {
      type: 'string',
      name: '0',
      optional: false,
      description: 'Amount of misses',
    },
    {
      type: 'string',
      name: 'mode',
      optional: false,
      description: '\`\`\`osu\`\`\` or \`\`\`fruits\`\`\` or \`\`\`mania\`\`\` or \`\`\`taiko\`\`\`',
    },
  ],
};

export interface types {
  (hits: {
    300: string,
    100: string,
    50: string,
    0: string,
    geki: string,
    katu: string
  }, mode: 'osu' | 'fruits' | 'taiko' | 'mania'): number;
};


const name: types = (hits, mode = 'osu') => {
  const h300 = parseInt(hits[300]);
  const h100 = parseInt(hits[100]);
  const h50 = parseInt(hits[50]);
  const h0 = parseInt(hits[0]);
  const geki = parseInt(hits.geki);
  const katu = parseInt(hits.katu);

  let acc = 0.0;

  switch (mode) {
    case 'osu': acc = (100.0 * (6 * h300 + 2 * h100 + h50)) / (6 * (h50 + h100 + h300 + h0)); break;
    case 'taiko': acc = (100.0 * (2 * h300 + h100)) / (2 * (h300 + h100 + h0)); break;
    case 'fruits': acc = (100.0 * (h300 + h100 + h50)) / (h300 + h100 + h50 + katu + h0); break;
    case 'mania': acc = (100.0 * (6 * geki + 6 * h300 + 4 * katu + 2 * h100 + h50)) / (6 * (h50 + h100 + h300 + h0 + geki + katu)); break;
  };

  return parseFloat(acc.toFixed(2));
};

export default name;