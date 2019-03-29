# Remote tmux

[![Build Status](https://dev.azure.com/kennydo/vscode-remote-tmux/_apis/build/status/kennydo.vscode-remote-tmux?branchName=master)](https://dev.azure.com/kennydo/vscode-remote-tmux/_build/latest?definitionId=1&branchName=master)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version/KennyDo.remote-tmux.svg)](https://marketplace.visualstudio.com/items?itemName=KennyDo.remote-tmux)

This extension a command to quickly SSH to a remote host and create or attach to a tmux session.


## Example Configuration
Suppose you have a remote host named `devbox` that you want to SSH to and run `tmux` on.

You might have an entry like this in your `~/.ssh/config`:
```
Host devbox
    Hostname some-long-fully-qualified-domain-name.com
```

You'll want your `remoteTmux.sshHost` setting to be `devbox`.
