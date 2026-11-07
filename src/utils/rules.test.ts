import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRegistration, calculateTimeRemaining } from './rules';

test('validateRegistration accepts valid registration payload', () => {
  const result = validateRegistration({
    teamName: 'CyberNovas',
    leadName: 'Alex Rivera',
    leadEmail: 'alex@example.com',
    leadPhone: '+91 9876543210',
    college: 'Apex Tech University',
    trackId: 'ai-intelligence',
    memberCount: 4,
    projectSynopsis: 'Building autonomous swarm satellites using edge AI.',
    agreedToTerms: true,
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateRegistration catches invalid team size and missing required fields', () => {
  const result = validateRegistration({
    teamName: 'X',
    leadName: '',
    leadEmail: 'not-an-email',
    leadPhone: '12',
    college: '',
    trackId: '',
    memberCount: 5, // Invalid: exceeds 4
    projectSynopsis: 'Too short',
    agreedToTerms: false,
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.teamName);
  assert.ok(result.errors.leadName);
  assert.ok(result.errors.leadEmail);
  assert.ok(result.errors.memberCount);
  assert.ok(result.errors.agreedToTerms);
});

test('calculateTimeRemaining returns correct positive breakdown', () => {
  const base = 1700000000000;
  const oneDayLater = new Date(base + 1000 * 60 * 60 * 26 + 1000 * 60 * 15 + 1000 * 30).toISOString();
  const time = calculateTimeRemaining(oneDayLater, base);

  assert.equal(time.isExpired, false);
  assert.equal(time.days, 1);
  assert.equal(time.hours, 2);
  assert.equal(time.minutes, 15);
  assert.equal(time.seconds, 30);
});

test('calculateTimeRemaining flags expired targets', () => {
  const past = new Date(Date.now() - 10000).toISOString();
  const time = calculateTimeRemaining(past);
  assert.equal(time.isExpired, true);
  assert.equal(time.days, 0);
  assert.equal(time.hours, 0);
});
