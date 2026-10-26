/**
 * User Profiles & Personalization Utility
 * Supports personalization across academic discipline, institution, daily goals, and focus techniques.
 */

export const PRESET_PROFILES = [
  {
    id: 'alex_cs',
    name: 'Alex Rivera',
    email: 'alex.rivera@berkeley.edu',
    password: 'password123',
    university: 'UC Berkeley',
    major: 'Computer Science & HCI',
    year: 'Junior (3rd Year)',
    dailyStudyGoalHours: 3.5,
    preferredStudyStyle: 'pomodoro', // 25 min work, 5 min break
    studyStyleLabel: 'Pomodoro (25/5 min)',
    avatarEmoji: '💻',
    bio: 'Balancing algorithms, database milestones, and human-computer interaction user testing.',
    courses: ['CS 340', 'CS 465', 'MATH 220', 'PSYC 101'],
  },
  {
    id: 'maya_bio',
    name: 'Maya Chen',
    email: 'maya.chen@jhu.edu',
    password: 'password123',
    university: 'Johns Hopkins University',
    major: 'Molecular Biology & Pre-Med',
    year: 'Sophomore (2nd Year)',
    dailyStudyGoalHours: 4.5,
    preferredStudyStyle: 'deepwork', // 50 min work, 10 min break
    studyStyleLabel: 'Deep Work (50/10 min)',
    avatarEmoji: '🧬',
    bio: 'Pre-med student focused on organic chemistry labs, cellular biology, and clinical shadowing.',
    courses: ['BIOL 201', 'CHEM 240', 'PHYS 102', 'STAT 211'],
  },
  {
    id: 'jordan_biz',
    name: 'Jordan Taylor',
    email: 'jordan.taylor@nyu.edu',
    password: 'password123',
    university: 'NYU Stern School of Business',
    major: 'Finance & Economic Theory',
    year: 'Senior (4th Year)',
    dailyStudyGoalHours: 2.5,
    preferredStudyStyle: 'sprint', // 45 min work, 15 min review
    studyStyleLabel: 'Sprint & Review (45/15 min)',
    avatarEmoji: '📈',
    bio: 'Analyzing corporate finance cases, macroeconomic forecasting, and investment thesis memos.',
    courses: ['FINC 301', 'ECON 250', 'MGMT 410', 'ACCT 320'],
  },
];

export const DEFAULT_USER = PRESET_PROFILES[0];

export const STUDY_STYLES = [
  {
    id: 'pomodoro',
    name: 'Pomodoro Technique',
    workMinutes: 25,
    breakMinutes: 5,
    tagline: 'Best for sustained energy & high task turnover',
    icon: 'Flame',
    description: '25 min focused sprint followed by 5 min neuro-recovery break. Proven to prevent cognitive burnout.',
  },
  {
    id: 'deepwork',
    name: 'Deep Work Immersion',
    workMinutes: 50,
    breakMinutes: 10,
    tagline: 'Best for complex problem-solving & long readings',
    icon: 'Brain',
    description: '50 min uninterrupted deep state followed by a 10 min break. Ideal for complex lab writeups & coding.',
  },
  {
    id: 'sprint',
    name: 'Sprint & Synthesis',
    workMinutes: 45,
    breakMinutes: 15,
    tagline: 'Best for case studies, memorization & review',
    icon: 'Sparkles',
    description: '45 min content deep-dive followed by 15 min active recall and self-testing notes.',
  },
];

export const UNIVERSITIES = [
  'UC Berkeley',
  'Stanford University',
  'MIT',
  'Johns Hopkins University',
  'NYU',
  'University of Washington',
  'UCLA',
  'University of Michigan',
  'Columbia University',
  'Georgia Tech',
  'Other Institution',
];

export const MAJORS = [
  'Computer Science & HCI',
  'Molecular & Cellular Biology',
  'Finance & Economics',
  'Mechanical Engineering',
  'Psychology & Neuroscience',
  'Electrical Engineering',
  'Nursing & Health Sciences',
  'Business Administration',
  'Mathematics & Statistics',
  'Arts & Humanities',
  'Other Major',
];
