import { namespace, RequestNamepsace } from "../../../../utility/request";
import { id as mods_id } from "../../../../utility/mods";
import form from "../../form/beatmap/scores";

const request: RequestNamepsace = namespace('https://osu.ppy.sh/api/');

const _mode = [
  'osu',
  'taiko',
  'fruits',
  'mania',
];


export const description: any = {
  auth: 2,
  title: __filename,
  method: 'GET',
  description: 'Return scores from beatmap',
  params: [
    {
      type: 'number',
      name: 'id',
      optional: false,
      description: 'id of the beatmap',
    },
    {
      type: 'string',
      name: 'mode',
      optional: true,
      description: '\`\`\`osu\`\`\` or \`\`\`fruits\`\`\` or \`\`\`mania\`\`\` or \`\`\`taiko\`\`\`',
    },
    {
      type: 'string',
      name: 'converted',
      optional: true,
      description: '\`\`\`0\`\`\` or \`\`\`1\`\`\`',
    },
    {
      type: 'string',
      name: 'hash',
      optional: true,
      description: 'beatmap file hash',
    },
    {
      type: 'string',
      name: 'limit',
      optional: true,
      description: 'Maximum number of results',
    },
    {
      type: 'string/number',
      name: 'mods',
      optional: true,
      description: 'Name of the mods \`\`\`HDDT\`\`\` or mods number \`\`\`72\`\`\`',
    },
    {
      type: 'string',
      name: 'since',
      optional: true,
      description: 'Return all beatmaps ranked or loved since this date. Must be a MySQL date. In UTC',
    },
  ],
};

export interface types {
  (id: number, obj?: {
    user?: string | number, type?: 'u' | 'id',
    mode?: 'osu' | 'fruits' | 'mania' | 'taiko',
    mods?: string | number,
    limit?: number,
  }): Promise<response[]>;
};

export interface response {
  date: string;
  rank: string;
  user: {
    id: number;
    name: string;
  };
  score: {
    id: number;
    total: number;
  };
  combo: {
    max: number;
    full: number;
  };
  hits: number[];
  mods: {
    id: number;
    name: string;
  };
  accuracy: number;
  pp: number;
  replay: number;
}



const name: types = async (id, obj = {}) => {
  const params = {
    b: id,
    u: obj.user,
    m: _mode.indexOf(obj.mode),
    mods: mods_id(obj.mods),
    type: obj.type,
    limit: obj.limit,
  };

  const data = await request(`get_scores`, {
    method: 'GET',
    params: params,
  });

  if (data.length == 0) return null;

  const format = form(data, obj.mode);
  return format;
};


export default name;