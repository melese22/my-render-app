/*
  # Create tasks table for CRUD operations

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key) - Unique identifier for each task
      - `title` (text) - Task title
      - `description` (text) - Task description
      - `status` (text) - Task status (pending, in_progress, completed)
      - `priority` (text) - Task priority (low, medium, high)
      - `created_at` (timestamptz) - Task creation timestamp
      - `updated_at` (timestamptz) - Task last update timestamp
  
  2. Security
    - Enable RLS on `tasks` table
    - Add policies for public access (for demo purposes)
    - Anyone can read, create, update, and delete tasks
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  status text DEFAULT 'pending',
  priority text DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tasks"
  ON tasks FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create tasks"
  ON tasks FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update tasks"
  ON tasks FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete tasks"
  ON tasks FOR DELETE
  TO anon
  USING (true);