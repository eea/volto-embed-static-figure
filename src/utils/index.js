import { v4 as uuid } from 'uuid';
export function getFigureMetadata(block, metadata) {
  const { title, description } = metadata || {};
  const id = `figure-metadata-${block}`;
  const metadataEl = document.getElementById(id);
  if (metadataEl || (!title && !description)) return;

  const data = {
    blocks: {},
    blocks_layout: { items: [] },
  };

  function getBlock(type, plaintext) {
    const block = uuid();
    return [
      block,
      {
        '@type': 'slate',
        value: [
          {
            type,
            children: [
              {
                text: plaintext,
              },
            ],
          },
        ],
        plaintext,
      },
    ];
  }
  const blocks = [
    ...(title ? [getBlock('h4', `Figure 1. ${title}`)] : []),
    ...(description ? [getBlock('p', description)] : []),
  ];

  blocks.forEach((block) => {
    if (!block) return;
    data.blocks[block[0]] = block[1];
    data.blocks_layout.items.push(block[0]);
  });

  return {
    '@type': 'group',
    className: 'figure-metadata',
    id,
    data,
  };
}