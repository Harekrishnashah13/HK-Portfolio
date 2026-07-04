import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company').default('N/A'),
  topic: text('topic').notNull(),
  message: text('message').notNull(),
  timestamp: text('timestamp').notNull(),
  isDemo: boolean('is_demo').default(false),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const analyticsEvents = pgTable('analytics_events', {
  id: serial('id').primaryKey(),
  eventType: text('event_type').notNull(),
  metadata: text('metadata').default(''),
  timestamp: timestamp('timestamp').defaultNow(),
});

