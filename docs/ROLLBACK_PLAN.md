# AtlasPress X - Rollback Plan

## Rollback Triggers

### Immediate Rollback Required
- Application error rate > 5%
- Complete authentication failure
- Database connection pool exhaustion
- Security incident confirmed
- Data corruption detected

### Standard Rollback (Within 1 Hour)
- Performance degradation (p95 latency > 5s)
- Feature functionality broken for > 50% users
- Critical UI/UX breakage in auth flows

## Rollback Commands

### Method 1: Git Revert (Fastest)
```bash
# Identify last known good commit
git log --oneline -10

# Revert to previous stable commit
git revert HEAD --no-edit

# Or hard reset to known good commit
git reset --hard <stable-commit-hash>

# Rebuild and restart
pnpm --filter @atlaspress/web build
pnpm --filter @atlaspress/web start
```

### Method 2: Previous Deployment (If Using Vercel/Platform)
```bash
# Vercel CLI example
vercel --version

# List deployments
vercel ls

# Promote previous deployment
vercel promote <previous-deployment-url>
```

### Method 3: Docker/Container Rollback
```bash
# If using containerized deployment
docker pull <repo>/atlaspress:<previous-tag>
docker stop atlaspress-current
docker run -d --name atlaspress-rollback <env-vars> <repo>/atlaspress:<previous-tag>
```

## Database Rollback Considerations

### Safe Rollback Checklist
- [ ] Database migrations are backward compatible OR
- [ ] Database has not been modified since deploy OR
- [ ] Down migration script is available and tested

### Emergency Database Reset (DEV/TEST ONLY)
```bash
# NEVER in production without backup
pnpm --filter @atlaspress/database db:migrate:reset
```

## Communication During Rollback

### Internal (Engineering)
1. Alert on-call engineer via PagerDuty/Slack
2. Post in #incidents channel
3. Update status page if external impact

### External (Users)
1. Update status page: "Investigating issues"
2. Post to Twitter/support channels if extended
3. Send incident report to affected users post-resolution

## Rollback Verification

### Post-Rollback Checks
```bash
# 1. Health check
curl https://your-domain.com/api/health

# 2. Auth check
curl https://your-domain.com/api/auth/session

# 3. Key page loads
curl -I https://your-domain.com/
curl -I https://your-domain.com/login

# 4. Error rate check (via monitoring)
# Verify error rate returns to baseline < 0.5%
```

## Rollback Completion Criteria

- [ ] Application serving traffic without errors
- [ ] Authentication flows functional
- [ ] Database connectivity stable
- [ ] Error rate < 0.5% for 10 minutes
- [ ] Key user journeys verified

## Post-Rollback Actions

1. **Secure the failed deployment**
   - Tag the failed commit: `git tag failed-deploy-$(date +%Y%m%d-%H%M%S)`
   - Document failure symptoms in incident log

2. **Root cause analysis**
   - Review logs and metrics
   - Identify contributing factors
   - Schedule post-mortem within 24 hours

3. **Prepare fix-forward plan**
   - Create tickets for identified issues
   - Estimate time to safe redeploy
   - Communicate timeline to stakeholders

---

**Last Updated:** 2024-02-11
**Rollback Tested:** No (schedule dry run before production)
**Owner:** Engineering On-Call
