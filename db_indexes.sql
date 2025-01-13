-- Category

CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name");

-- Status

CREATE UNIQUE INDEX IF NOT EXISTS "Status_name_key" ON "Status"("name");

-- Feedback

CREATE INDEX IF NOT EXISTS "Feedback_categoryId_idx" ON "Feedback"("categoryId");
CREATE INDEX IF NOT EXISTS "Feedback_statusId_idx" ON "Feedback"("statusId");
CREATE INDEX IF NOT EXISTS "Feedback_authorId_idx" ON "Feedback"("authorId");
CREATE INDEX IF NOT EXISTS "Feedback_created_at_idx" ON "Feedback"("created_at");
CREATE INDEX IF NOT EXISTS "Feedback_updated_at_idx" ON "Feedback"("updated_at");

-- Upvote

CREATE UNIQUE INDEX IF NOT EXISTS "Upvote_feedbackId_userId_key" ON "Upvote"("feedbackId", "userId");
CREATE INDEX IF NOT EXISTS "Upvote_feedbackId_idx" ON "Upvote"("feedbackId");
CREATE INDEX IF NOT EXISTS "Upvote_userId_idx" ON "Upvote"("userId");
CREATE INDEX IF NOT EXISTS "Upvote_createdAt_idx" ON "Upvote"("createdAt");
