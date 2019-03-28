import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration('remoteTmux');

	let sshHost = config.get("sshHost");
	let tmuxSessionName = config.get("tmuxSessionName");

	console.log("Configured SSH host: " + sshHost);
	console.log("Configured tmux session name: " + tmuxSessionName);

	let disposable = vscode.commands.registerCommand('remoteTmux.getOrCreateTerminal', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
