const safeSshHostRegex = new RegExp("^([a-zA-Z0-9\.:\-])+$");

const bannedTmuxSessionNameRegex = new RegExp("(:\.)");
const safeTmuxSessionNameRegex = new RegExp("^([a-zA-Z0-9\-\_]+)$");

export function isSafeSshHost(host: string) {
    return safeSshHostRegex.test(host);
}

export function isSafeTmuxSessionName(name: string) {
    // Tmux is very permission in what it allows for session names:
    // https://github.com/tmux/tmux/blob/4cbf596dc5828274b92d783aaa1da996fa481ca8/session.c#L254
    // So we are stricter than we need to be.
    if (name.length === 0){
        return false;
    }

    if (bannedTmuxSessionNameRegex.test(name)) {
        return false;
    }

    return safeTmuxSessionNameRegex.test(name);
}
