import * as vscode from 'vscode';
import {isSafeSshHost, isSafeTmuxSessionName} from './stringUtils';

export function activate(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration('remoteTmux');

	let sshHost = config.get("sshHost", "devbox");
	let tmuxSessionName = config.get("tmuxSessionName", "vscode");

	console.log("Configured SSH host: " + sshHost);
	console.log("Configured tmux session name: " + tmuxSessionName);

	let disposable = vscode.commands.registerCommand('remoteTmux.getOrCreateTerminal', () => {
		if (!isSafeSshHost(sshHost)){
			vscode.window.showErrorMessage(`SSH host '${sshHost}' looked dangerous or invalid, so aborting remote tmux invocation`);
			return;
		}

		if (!isSafeTmuxSessionName(tmuxSessionName)){
			vscode.window.showErrorMessage(`Tmux session name '${tmuxSessionName}' looked dangerous or invalid, so aborting remote tmux invocation`);
			return;
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
