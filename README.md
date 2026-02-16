# Chainstats

Chainstats is a React + Vite app that visualizes Chainstack blockchain node storage sizes by protocol, network, node type, and client.

Production URL: [https://chainstats.org](https://chainstats.org)

## Data Source

- API endpoint: `https://console.chainstack.com/api/core/v1/calc/`
- Source path: `Enterprise.protocols`
- Inclusion rule in UI:
  - Use only `dedicated` entries
  - Include only nodes where `type === "public"`
  - Skip entries without `node_info.storage.size_required`

## Features

- Protocol/network/client table with sorting and filtering.
- Search by protocol slug and friendly display aliases.
- Full and archive node-type rows.
- Multi-client visibility per network/type.
- Protocol icons with fallback badges for unmapped protocols.
- Light/dark theme support.

## Stack

- React 19
- Vite 7
- Ant Design 6
- Sass
- Axios

## Local Development

### Prerequisites

- Node.js 24+
- npm 9+

### Install

```bash
npm install
```

### Start dev server

```bash
npm start
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm start`: run Vite dev server.
- `npm run build`: create production build in `dist/`.
- `npm run preview`: preview built app locally.
- `npm run test`: run Vitest (`--passWithNoTests`).
- `npm run check:protocol-icons`: compare visible API protocols to icon map coverage.
- `npm run deploy`: publish `dist/` to GitHub Pages.

## CI

Workflow: `.github/workflows/ci.yml`

Runs:
1. `npm ci`
2. `npm run check:protocol-icons`
3. `npm run build`

## Protocol Metadata

Shared protocol formatting lives in:

- `src/helpers/protocolMetadata.json`
- `src/helpers/protocolDisplay.js`

Use these helpers for protocol naming and network formatting in UI components.

## Deployment

1. Run checks:
   - `npm run check:protocol-icons`
   - `npm run build`
2. Deploy:
   - `npm run deploy`
3. Verify:
   - [https://chainstats.org](https://chainstats.org)
