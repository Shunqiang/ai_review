import { mysqlTable, serial, text, varchar, timestamp, int, decimal } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  email: varchar('email', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projects = mysqlTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description'),
  ownerId: int('owner_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const reviews = mysqlTable('reviews', {
  id: serial('id').primaryKey(),
  projectId: int('project_id').references(() => projects.id),
  authorId: int('author_id').references(() => users.id),
  commitHash: varchar('commit_hash', { length: 40 }),
  linesChanged: int('lines_changed'),
  manDaysSaved: decimal('man_days_saved', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }), // e.g., 'completed', 'pending'
  createdAt: timestamp('created_at').defaultNow(),
});

export const issues = mysqlTable('issues', {
  id: serial('id').primaryKey(),
  reviewId: int('review_id').references(() => reviews.id),
  type: varchar('type', { length: 100 }), // e.g., 'security', 'performance', 'style'
  severity: varchar('severity', { length: 50 }), // e.g., 'error', 'warning', 'info'
  filePath: text('file_path'),
  description: text('description'),
  isAdopted: int('is_adopted').default(0), // 0: ignored, 1: adopted
  createdAt: timestamp('created_at').defaultNow(),
});

export const feedback = mysqlTable('feedback', {
  id: serial('id').primaryKey(),
  userId: int('user_id').references(() => users.id),
  reviewId: int('review_id').references(() => reviews.id),
  content: text('content'),
  rating: int('rating'), // e.g., 1-5
  createdAt: timestamp('created_at').defaultNow(),
});