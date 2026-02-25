import { pgTable, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const settings = pgTable('settings', {
    id: text('id').primaryKey(),
    logoUrl: text('logo_url'),
    adminPasswordHash: text('admin_password_hash'),
    updatedAt: timestamp('updated_at'),
});

export const slides = pgTable('slides', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    contentMarkdown: text('content_markdown').notNull(),
    backgroundImageUrl: text('background_image_url'),
    backgroundColor: text('background_color'),
    orderIndex: integer('order_index').notNull().default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});
