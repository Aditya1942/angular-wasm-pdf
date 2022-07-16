/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const doc = {
  title: 'Example Document',
  template: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
  stationary: [
    {
      obj_type: 'PageNumber',
      params: {
        font_size: 12,
        font_name: 'Helvetica',
        x: 297.5,
        y: 30,
        align: 'center',
      },
    },
  ],
  contents: [
    {
      obj_type: 'Table',
      params: {
        style: {
          grid: {
            width: 0.25,
            color: [0.6, 0.6, 0.6],
          },
          padding: {
            left: 5.0,
            right: 5.0,
            top: 5.0,
            bottom: 5.0,
          },
          align: {
            vertical: 'middle',
          },
        },
        rows: [
          {
            obj_type: 'Row',
            params: {
              cells: [
                {
                  obj_type: 'Cell',
                  params: {
                    contents: [
                      {
                        obj_type: 'Paragraph',
                        params: {
                          text: '3',
                          align: 'center',
                          font_name: 'Courier-Oblique',
                          font_size: 10,
                          padding: {
                            bottom: 5,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
