# AtlasPress X - Operations Runbook

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server (localhost:3000) |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E smoke tests |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript checks |

## Development Workflow

### 1. Local Development Setup

```bash
# Clone and setup
git clone <repo-url>
cd blog-engine
pnpm install

# Environment setup
cp .env.example apps/web/.env.local
# Edit .env.local with your credentials

# Start development
pnpm dev
```

### 2. Database Operations

```bash
# Generate Prisma client
pnpm --filter @atlaspress/database db:generate

# Push schema changes (dev)
pnpm --filter @atlaspress/database db:push

# Run migrations (production)
pnpm --filter @atlaspress/database db:migrate

# Seed database
pnpm --filter @atlaspress/database db:seed

# Open database studio
pnpm --filter @atlaspress/database db:studio

# Check database health
pnpm --filter @atlaspress/database db:health
```

## Deployment

### Production Build

```bash
# Build all packages
pnpm build

# Or build web only
pnpm --filter @atlaspress/web build
```

### Environment Variables (Production)

Required:
- `AUTH_SECRET` - Random 32-byte string (openssl rand -base64 32)
- `AUTH_URL` - Production domain
- `DATABASE_URL` - PostgreSQL connection string
- `GITHUB_CLIENT_ID` - GitHub App client ID
- `GITHUB_CLIENT_SECRET` - GitHub App secret
- `NEXT_PUBLIC_APP_URL` - Public app URL

Optional:
- `SENTRY_DSN` - Error tracking
- `SENTRY_AUTH_TOKEN` - Source maps upload

## Troubleshooting

### Build Failures

**TypeScript errors:**
```bash
pnpm typecheck
# Fix errors, then rebuild
```

**Lint errors:**
```bash
pnpm lint
# Fix errors, then rebuild
```

### Runtime Issues

**Auth secret missing:**
- Error: "MissingSecret: Please define a secret"
- Fix: Set AUTH_SECRET in environment

**Database connection failed:**
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check network connectivity

**404 on /content route:**
- Route doesn't exist yet (placeholder in sidebar)
- Create the route file or remove from navigation

### CI/CD Failures

**E2E tests failing:**
- Check dev server starts correctly
- Verify Playwright browsers installed
- Check test environment variables

**Cache issues:**
```bash
# Clear all caches
pnpm clean
rm -rf node_modules apps/web/.next
pnpm install
```

## Monitoring

### Health Checks

```bash
# Application health
curl http://localhost:3000/api/health

# Expected: {"status":"healthy","timestamp":"..."}
```

### Logs

Development:
```bash
# View dev server logs
pnpm dev
```

Production:
```bash
# View production logs
pnpm --filter @atlaspress/web start
```

## Incident Response

### Severity Levels

**P0 - Critical:**
- Application down
- Data loss
- Security breach

**P1 - High:**
- Major feature broken
- Performance degradation

**P2 - Medium:**
- Minor feature issues
- UI glitches

### Escalation Path

1. Detect issue via health checks or monitoring
2. Assess severity and impact
3. Apply quick fix if available
4. Rollback if necessary
5. Document in incident log

---

**Last Updated:** 2024-02-11
