import * as core from '@actions/core';
import * as github from '@actions/github';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false
});

async function run(): Promise<void> {
  try {
    const key = core.getInput('arweaveWalletKey');
    core.setSecret(key);

    core.debug(`${key.length}`);

    const repoOwner = github.context.repo.owner;
    const repoName = github.context.repo.repo;

    const repoContents = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/zipball`
    );

    const repoBuffer = await repoContents.buffer();
    fs.writeFileSync('./repo.zip', repoBuffer);

    const base64string = fs.readFileSync(path.resolve('./repo.zip'), {
      encoding: 'base64'
    });

    const blob = Buffer.from(base64string, 'base64');

    const transaction = await arweave.createTransaction(
      {
        data: blob
      },
      // @ts-expect-error
      key
    );

    transaction.addTag('Content-Type', 'application/zip');
    transaction.addTag('App-Name', 'arweave-repo-backup');

    // @ts-expect-error
    await arweave.transactions.sign(transaction, key);

    await arweave.transactions.post(transaction);

    const txId = transaction.id;
    core.debug(`Transaction ID: ${txId}`);
    core.setOutput('txId', txId);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
