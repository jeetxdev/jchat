#!/usr/bin/env node
/**
 * Seeds the jChat backend backlog into GitHub as issues, labels and milestones.
 *
 *   node seed-github.mjs              # dry run, prints what it would do
 *   node seed-github.mjs --execute    # actually creates everything
 *   node seed-github.mjs --execute --project   # also add them to the "jchat" Project
 *   node seed-github.mjs --execute --project --project-title "My Board"
 *
 * Safe to re-run: labels and milestones are upserted, and a ticket whose issue
 * already exists is skipped rather than duplicated.
 */

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const BOARD_URL = 'https://claude.ai/code/artifact/502d7431-2827-4892-afd7-b3bee26566ba';
const PROJECT_TITLE = 'jchat'; // override with --project-title "<exact title>"
const SIZE_NOTE = { S: 'one sitting', M: 'a session or two', L: 'several sessions' };

// Distinct hues per epic so the issue list is scannable at a glance.
const EPIC_COLOR = {
  FND: '0b84ff', DB: '0a6fd1', AUTH: 'd946ef', USR: '8b5cf6', CNV: '10b981',
  MSG: '059669', RT: 'f59e0b', ATT: 'ea580c', OPS: 'ef4444', SHIP: '64748b',
  WEB: '0891b2',
};
const SIZE_COLOR = { S: 'e2e8f0', M: 'cbd5e1', L: '94a3b8' };

const argv = process.argv;
const flagValue = (name, fallback) => {
  const i = argv.indexOf(name);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};

const execute = argv.includes('--execute');
const wantProject = argv.includes('--project');
const createProject = argv.includes('--create-project');
const projectTitle = flagValue('--project-title', PROJECT_TITLE);
const { epics, milestones, tickets } = JSON.parse(readFileSync(new URL('./tickets.json', import.meta.url)));

const epicById = Object.fromEntries(epics.map((e) => [e.id, e]));

function gh(args, { allowFail = false } = {}) {
  try {
    return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    if (allowFail) return null;
    const detail = (err.stderr || err.message || '').toString().trim();
    throw new Error(`gh ${args.slice(0, 3).join(' ')} failed:\n${detail}`);
  }
}

function plan(label, detail) {
  console.log(`${execute ? '  ' : '  [dry] '}${label}${detail ? ' ' + detail : ''}`);
}

function issueTitle(t) {
  return `${t.id}: ${t.title}`;
}

function issueBody(t, issueNumbers) {
  const dep = (id) => (issueNumbers && issueNumbers[id] ? `${id} (#${issueNumbers[id]})` : id);
  const lines = [
    t.what,
    '',
    `**Step ${t.step} of ${tickets.length}** · **${t.milestoneId}** ${t.milestoneName} · **${t.epicId}** ${epicById[t.epicId].name} · size **${t.size}** (${SIZE_NOTE[t.size]})`,
    '',
    '## Done when',
    ...t.criteria.map((c) => `- [ ] ${c}`),
    '',
    '## Touches',
    ...t.paths.map((p) => `- \`${p}\``),
    '',
    '## What this teaches',
    t.learn,
  ];
  if (t.deps.length) {
    lines.push('', '## Depends on', t.deps.map(dep).join(', '));
  }
  lines.push('', '---', `Ticket \`${t.id}\` from the [jChat backend build order](${BOARD_URL}).`);
  return lines.join('\n');
}

// ---------- sample: print one issue and exit, no gh needed ----------

if (process.argv.includes('--sample')) {
  const t = tickets.find((x) => x.id === (process.argv[process.argv.indexOf('--sample') + 1] || 'AUTH-3')) || tickets[0];
  console.log('TITLE: ' + issueTitle(t));
  console.log('LABELS: epic: ' + t.epicId + ', size: ' + t.size);
  console.log('MILESTONE: ' + t.milestoneId + ': ' + t.milestoneName);
  console.log('\n--- BODY ---\n');
  console.log(issueBody(t, { 'AUTH-2': 10, 'DB-3': 7, 'FND-3': 3, 'MSG-5': 27, 'RT-3': 32 }));
  process.exit(0);
}

// ---------- preflight ----------

console.log(execute ? '\nSEEDING GITHUB\n' : '\nDRY RUN, nothing will be created. Add --execute to apply.\n');

if (!gh(['--version'], { allowFail: true })) {
  console.error('The gh CLI is not installed. Run: brew install gh');
  process.exit(1);
}
if (gh(['auth', 'status'], { allowFail: true }) === null) {
  console.error('Not signed in. Run: gh auth login');
  process.exit(1);
}

const repo = gh(['repo', 'view', '--json', 'nameWithOwner', '-q', '.nameWithOwner']);
console.log(`Repository: ${repo}`);

const existing = JSON.parse(gh(['issue', 'list', '--state', 'all', '--limit', '400', '--json', 'number,title']));
const existingByTicket = {};
for (const issue of existing) {
  const m = issue.title.match(/^([A-Z]+-\d+):/);
  if (m) existingByTicket[m[1]] = issue.number;
}
const alreadyThere = Object.keys(existingByTicket).length;
console.log(`Existing issues: ${existing.length} (${alreadyThere} already map to a ticket id)\n`);

// ---------- labels ----------

console.log(`Labels (${epics.length} epic + 3 size)`);
for (const e of epics) {
  plan(`epic: ${e.id}`, `#${EPIC_COLOR[e.id]}`);
  if (execute) gh(['label', 'create', `epic: ${e.id}`, '--color', EPIC_COLOR[e.id], '--description', e.name.slice(0, 100), '--force']);
}
for (const s of ['S', 'M', 'L']) {
  plan(`size: ${s}`, SIZE_NOTE[s]);
  if (execute) gh(['label', 'create', `size: ${s}`, '--color', SIZE_COLOR[s], '--description', SIZE_NOTE[s], '--force']);
}

// ---------- milestones ----------

console.log(`\nMilestones (${milestones.length})`);
const milestoneNumbers = {};
const liveMilestones = execute || true
  ? JSON.parse(gh(['api', `repos/${repo}/milestones?state=all&per_page=100`], { allowFail: true }) || '[]')
  : [];
for (const m of milestones) {
  const title = `${m.id}: ${m.name}`;
  const found = liveMilestones.find((x) => x.title === title);
  if (found) {
    milestoneNumbers[m.id] = found.number;
    plan(title, `already exists (#${found.number})`);
    continue;
  }
  plan(title, `${m.count} tickets`);
  if (execute) {
    const created = JSON.parse(gh(['api', `repos/${repo}/milestones`, '-f', `title=${title}`, '-f', `description=${m.outcome}`]));
    milestoneNumbers[m.id] = created.number;
  }
}

// ---------- issues ----------

console.log(`\nIssues (${tickets.length}, created in build order so issue numbers track steps)`);
const issueNumbers = { ...existingByTicket };
let created = 0, skipped = 0;

for (const t of tickets) {
  if (issueNumbers[t.id]) { skipped++; plan(issueTitle(t), `skipped, already #${issueNumbers[t.id]}`); continue; }
  plan(`${String(t.step).padStart(2)} ${issueTitle(t)}`);
  if (execute) {
    const args = ['issue', 'create', '--title', issueTitle(t), '--body', issueBody(t),
      '--label', `epic: ${t.epicId}`, '--label', `size: ${t.size}`];
    if (milestoneNumbers[t.milestoneId]) args.push('--milestone', `${t.milestoneId}: ${t.milestoneName}`);
    const url = gh(args);
    issueNumbers[t.id] = Number(url.trim().split('/').pop());
    created++;
  }
}
console.log(`\n${execute ? `Created ${created}, skipped ${skipped}.` : `Would create ${tickets.length - skipped}.`}`);

// ---------- second pass: turn dependency ticket ids into real issue links ----------

if (execute) {
  const withDeps = tickets.filter((t) => t.deps.length);
  console.log(`\nLinking dependencies on ${withDeps.length} issues`);
  for (const t of withDeps) {
    const n = issueNumbers[t.id];
    if (!n) continue;
    gh(['issue', 'edit', String(n), '--body', issueBody(t, issueNumbers)]);
  }
  console.log('Dependencies now cross-link as #N.');
}

// ---------- optional project board ----------
//
// Issues live in the REPOSITORY. A Project is a separate view layered on top of
// them, so creating an issue does not put it on a board. This step adds the
// issues to an EXISTING project; it never creates one unless --create-project.

if (wantProject) {
  console.log('\nProject board');
  const owner = repo.split('/')[0];
  const listProjects = () => JSON.parse(gh(['project', 'list', '--owner', owner, '--format', 'json'], { allowFail: true }) || '{}').projects || [];

  let projects = listProjects();
  let project = projects.find((p) => p.title.toLowerCase() === projectTitle.toLowerCase());

  if (!project && createProject) {
    plan(`create project "${projectTitle}"`);
    if (execute) {
      gh(['project', 'create', '--owner', owner, '--title', projectTitle]);
      project = listProjects().find((p) => p.title.toLowerCase() === projectTitle.toLowerCase());
      console.log(`  created project #${project.number}`);
    }
  }

  if (!project) {
    console.error(`\n  No project titled "${projectTitle}" under ${owner}.`);
    if (projects.length) {
      console.error('  Projects that do exist:');
      for (const p of projects) console.error(`    #${p.number}  ${p.title}`);
    } else {
      console.error('  None found. If the project is owned by an org rather than your user,');
      console.error('  pass --owner-override <org>, or check: gh auth refresh -s project');
    }
    console.error(`  Re-run with --project-title "<exact title>", or --create-project to make one.`);
    if (execute) {
      console.error('  The issues were created; only this board step was skipped.\n');
      process.exit(1);
    }
  } else {
    console.log(`  using project #${project.number} "${project.title}"`);
    plan(`add ${tickets.length} issues and set a Step field on each`);

    if (execute) {
      const fieldList = () => JSON.parse(gh(['project', 'field-list', String(project.number), '--owner', owner, '--format', 'json'])).fields;
      let stepField = fieldList().find((f) => f.name === 'Step');
      if (!stepField) {
        gh(['project', 'field-create', String(project.number), '--owner', owner, '--name', 'Step', '--data-type', 'NUMBER']);
        stepField = fieldList().find((f) => f.name === 'Step');
        console.log('  created the Step field');
      }

      let added = 0;
      for (const t of tickets) {
        const n = issueNumbers[t.id];
        if (!n) continue;
        const res = gh(['project', 'item-add', String(project.number), '--owner', owner,
          '--url', `https://github.com/${repo}/issues/${n}`], { allowFail: true });
        if (res !== null) added++;
      }

      const items = JSON.parse(gh(['project', 'item-list', String(project.number), '--owner', owner, '--format', 'json', '--limit', '400'])).items;
      let numbered = 0;
      for (const t of tickets) {
        const item = items.find((i) => i.content && i.content.title === issueTitle(t));
        if (!item) continue;
        const res = gh(['project', 'item-edit', '--id', item.id, '--project-id', project.id,
          '--field-id', stepField.id, '--number', String(t.step)], { allowFail: true });
        if (res !== null) numbered++;
      }

      console.log(`  added ${added} items, set Step on ${numbered}`);
      console.log('  sort the board by Step to see it in build order');
    }
  }
}

console.log(execute ? '\nDone.\n' : '\nDry run complete. Re-run with --execute to apply.\n');
