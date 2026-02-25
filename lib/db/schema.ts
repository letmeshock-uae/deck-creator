import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const settings = sqliteTable('settings', {
    id: text('id').primaryKey(),
    logoUrl: text('logo_url'),
    adminPasswordHash: text('admin_password_hash'),
    updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const slides = sqliteTable('slides', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    contentMarkdown: text('content_markdown').notNull(),
    backgroundImageUrl: text('background_image_url'),
    backgroundColor: text('background_color'),
    orderIndex: integer('order_index').notNull().default(0),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
    createdAt: integer('created_at', { mode: 'timestamp' }),
});
