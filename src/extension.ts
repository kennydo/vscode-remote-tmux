import * as vscode from 'vscode';
import {isSafeSshHost, isSafeTmuxSessionName} from './stringUtils';

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('remoteTmux');

	// We keep track of the tmux terminal that we've created so that we can bring it up whenever the command is run.
	// There isn't a point to having multiple terminals open to the same tmux session.
	let existingTerminal: vscode.Terminal | null = null;

	let disposable = vscode.commands.registerCommand('remoteTmux.getOrCreateTerminal', () => {
		const sshHost = config.get("sshHost", "devbox");
		const tmuxSessionName = config.get("tmuxSessionName", "vscode");

		console.log("Configured SSH host: " + sshHost);
		console.log("Configured tmux session name: " + tmuxSessionName);

		if (!isSafeSshHost(sshHost)){
			vscode.window.showErrorMessage(`SSH host '${sshHost}' looked dangerous or invalid, so aborting remote tmux invocation`);
			return;
		}

		if (!isSafeTmuxSessionName(tmuxSessionName)){
			vscode.window.showErrorMessage(`Tmux session name '${tmuxSessionName}' looked dangerous or invalid, so aborting remote tmux invocation`);
			return;
		}

		if (existingTerminal !== null) {
			console.log("Focusing on existing terminal");
			existingTerminal.show(false);
		} else {
			const terminal = vscode.window.createTerminal({
				'name': `tmux on ${sshHost}`,
				'shellPath': '/bin/bash',
				'shellArgs': [
					'-c',
					`ssh -t ${sshHost} "tmux new-session -A -s ${tmuxSessionName}"`,
				],
			});
			terminal.show(false);
			existingTerminal = terminal;
		}
	});

	context.subscriptions.push(disposable);

	vscode.window.onDidCloseTerminal((terminal) => {
		if (terminal === existingTerminal){
			console.log(`Detected closing of the tmux terminal: ${existingTerminal.name}`);

			existingTerminal = null;
		}
	});
}

export function deactivate() {}
