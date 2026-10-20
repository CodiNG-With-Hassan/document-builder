import { Document } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { plainToHtml } from '@Shared/utils/rich-text';
import { SBP_ORGANIZATIONAL_DESIGN_GUIDE } from './seeds/sbp-organizational-design-guide.seed';

/** Hardcoded starting data of the in-memory backend; every reload starts from here again. */
export const DOCUMENT_SEED: readonly Document[] = [
  {
    id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e01',
    title: 'Quarterly Update',
    updatedAt: '2026-10-15T09:30:00.000Z',
    sections: [
      {
        id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e11',
        title: 'Highlights',
        numbered: true,
        widgets: [
          {
            id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e21',
            type: WidgetType.Header,
            value: {
              content: { text: 'A strong third quarter' },
              config: { level: 1, numbered: true },
            },
          },
          {
            id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e22',
            type: WidgetType.Text,
            value: {
              content: {
                html: plainToHtml(
                  'We shipped the new onboarding flow two weeks ahead of plan.\nActivation of new accounts rose noticeably in the first month.',
                ),
              },
            },
          },
          {
            id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e23',
            type: WidgetType.Text,
            value: {
              content: {
                html: plainToHtml(
                  'Support response times went down while ticket volume stayed flat, thanks to the revised help centre.',
                ),
              },
            },
          },
        ],
        layout: [
          { id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e21', x: 0, y: 0, w: 12, h: 3 },
          { id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e22', x: 0, y: 3, w: 6, h: 6 },
          { id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e23', x: 6, y: 3, w: 6, h: 6 },
        ],
      },
      {
        id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e12',
        title: 'Numbers in words',
        numbered: true,
        widgets: [
          {
            id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e24',
            type: WidgetType.Header,
            value: { content: { text: 'Revenue and costs' }, config: { level: 1, numbered: true } },
          },
          {
            id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e25',
            type: WidgetType.Text,
            value: {
              content: {
                html: plainToHtml(
                  [
                    'Revenue grew for the third quarter in a row, driven mostly by renewals in the mid-market segment.',
                    '',
                    'New business was slightly below target in September, which we attribute to the delayed launch of the partner programme.',
                    '',
                    'Operating costs stayed within budget. Hosting costs went up after the migration but are expected to fall again once the old cluster is decommissioned.',
                    '',
                    'Headcount grew by four people, all in engineering and support.',
                    '',
                    'Cash position remains healthy, with more than eighteen months of runway at the current burn rate.',
                  ].join('\n'),
                ),
              },
            },
          },
        ],
        layout: [
          { id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e24', x: 0, y: 0, w: 6, h: 3 },
          { id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e25', x: 0, y: 3, w: 8, h: 8 },
        ],
      },
      {
        id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e13',
        title: 'Next steps',
        numbered: true,
        widgets: [
          {
            id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e26',
            type: WidgetType.Header,
            value: { content: { text: 'Focus for Q4' }, config: { level: 1, numbered: true } },
          },
          {
            id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e27',
            type: WidgetType.Text,
            value: {
              content: {
                html: plainToHtml(
                  'Launch the partner programme.\nFinish the cluster migration.\nHire two more support engineers.',
                ),
              },
            },
          },
        ],
        layout: [
          { id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e26', x: 0, y: 0, w: 4, h: 3 },
          { id: 'b6f1c7a2-6a54-4d0e-9f3c-1a2b3c4d5e27', x: 4, y: 0, w: 8, h: 6 },
        ],
      },
    ],
  },
  {
    id: 'c7a2b6f1-4d0e-6a54-3c9f-5e011a2b3c4d',
    title: 'Meeting Notes',
    updatedAt: '2026-10-12T14:00:00.000Z',
    sections: [
      {
        id: 'c7a2b6f1-4d0e-6a54-3c9f-5e111a2b3c4d',
        title: 'Notes',
        numbered: false,
        widgets: [
          {
            id: 'c7a2b6f1-4d0e-6a54-3c9f-5e211a2b3c4d',
            type: WidgetType.Header,
            value: { content: { text: 'Weekly sync' }, config: { level: 1, numbered: true } },
          },
          {
            id: 'c7a2b6f1-4d0e-6a54-3c9f-5e221a2b3c4d',
            type: WidgetType.Text,
            value: {
              content: {
                html: plainToHtml(
                  'Agreed to move the design review to Thursday.\nEveryone updates their tickets before Friday noon.',
                ),
              },
            },
          },
        ],
        layout: [
          { id: 'c7a2b6f1-4d0e-6a54-3c9f-5e211a2b3c4d', x: 0, y: 0, w: 12, h: 3 },
          { id: 'c7a2b6f1-4d0e-6a54-3c9f-5e221a2b3c4d', x: 0, y: 3, w: 6, h: 6 },
        ],
      },
    ],
  },
  SBP_ORGANIZATIONAL_DESIGN_GUIDE,
];
