# repo-backup-arweave

A GitHub action that backs up your repo's source code to Arweave.

## How to use

Create a workflow file in your repository at `.github/workflows/repo-backup.yml` with the following contents:

```yaml
name: 'repo-backup'
on:
  push:
    branches:
      - main

jobs:
  repo-backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: repo-backup-arweave
        uses: Dhaiwat10/repo-backup-arweave@v0.3
        with:
          arweave-key: ${{ secrets.ARWEAVE_WALLET_KEY }}
```

Make sure you add your Arweave wallet key as a repository secret in your repository's settings. The name of the secret should be `ARWEAVE_WALLET_KEY`. You can generate a wallet key from [here](https://tokens.arweave.org/). Make sure you have some AR in your wallet. You can get some AR from [here](https://faucet.arweave.net/). You need AR to pay for the transaction fees.

## Running locally

1. Install dependencies

```bash
npm install
```

2. Install [`act`](https://github.com/nektos/act) to run GitHub actions locally

```bash
brew install act
```

3. Make sure you have a Docker daemon running locally

4. Create a `my.secrets` file at the root of the project:

```bash
cp my.secrets.example my.secrets
```

Make sure the file looks like this:

```
ARWEAVE_WALLET_KEY=<your_arweave_wallets_private_key>
```

You need to supply an Arweave wallet's private key because you need to pay for the transaction to upload the data to Arweave.

5. Run the action locally

```bash
npm run dev && npm run action
```
