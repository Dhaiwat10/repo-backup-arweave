# repo-backup-arweave

A GitHub action that backs up your repo's source code to Arweave.

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
